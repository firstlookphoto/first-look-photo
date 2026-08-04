// Vercel serverless function: syncs a website lead to Brevo.
//
// Keeps the Brevo API key server-side, out of the browser. Runs
// alongside the existing Formspree submission (js/main.js), never
// replaces it: Formspree stays the source of truth for notifying
// Brian, this only keeps the "First Look Photo - Playbook Leads"
// list in sync. A failure here is logged and swallowed, it must
// never surface as an error to the visitor.
//
// Required env vars (set in Vercel: Project Settings -> Environment
// Variables, not committed to the repo):
//   BREVO_API_KEY             Brevo v3 API key (SMTP & API -> API Keys)
//   BREVO_PLAYBOOK_LIST_ID    Numeric ID of the "First Look Photo -
//                             Playbook Leads" list (open the list in
//                             Brevo, the ID is in the URL)

const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_PLAYBOOK_LIST_ID;

  if (!apiKey || !listId) {
    console.error(
      "Brevo lead sync skipped: missing BREVO_API_KEY or BREVO_PLAYBOOK_LIST_ID env var."
    );
    res.status(500).json({ error: "Brevo is not configured" });
    return;
  }

  const body = req.body || {};
  const email = String(body.email || "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const attributes = {};
  if (body.name) attributes.FIRSTNAME = String(body.name).slice(0, 200);
  if (body.listing) attributes.LISTING_URL = String(body.listing).slice(0, 500);
  if (body.lead_source) attributes.LEAD_SOURCE = String(body.lead_source).slice(0, 100);
  if (body.lead_intent) attributes.LEAD_INTENT = String(body.lead_intent).slice(0, 100);
  if (body.package) attributes.PACKAGE_INTEREST = String(body.package).slice(0, 200);
  if (body.timing) attributes.PREFERRED_DATE = String(body.timing).slice(0, 100);
  if (body.message) attributes.MESSAGE = String(body.message).slice(0, 2000);

  try {
    const brevoRes = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        email: email,
        attributes: attributes,
        listIds: [Number(listId)],
        updateEnabled: true
      })
    });

    if (!brevoRes.ok) {
      const detail = await brevoRes.text();
      console.error("Brevo contact sync failed:", brevoRes.status, detail);
      res.status(502).json({ error: "Brevo sync failed" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Brevo contact sync error:", err);
    res.status(502).json({ error: "Brevo sync error" });
  }
};
