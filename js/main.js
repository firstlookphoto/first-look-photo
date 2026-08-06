(function () {
  "use strict";

  /* ---------------------------------------------
     Before/After compare slider
     Only interactive at the "desktop" breakpoint
     (matches the CSS breakpoint at 700px). Below
     that, the CSS shows a stacked before/after
     layout and this code simply does nothing.
  --------------------------------------------- */
  var DESKTOP_QUERY = "(min-width: 700px)";

  function initCompare(el) {
    var mq = window.matchMedia(DESKTOP_QUERY);
    var handle = el.querySelector(".ba-handle");
    if (!handle) return;

    var dragging = false;

    function setPosition(percent) {
      var clamped = Math.min(100, Math.max(0, percent));
      el.style.setProperty("--ba-pos", clamped + "%");
      handle.setAttribute("aria-valuenow", Math.round(clamped));
    }

    function percentFromClientX(clientX) {
      var rect = el.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onPointerMove(e) {
      if (!dragging || !mq.matches) return;
      setPosition(percentFromClientX(e.clientX));
    }

    function onPointerUp() {
      dragging = false;
    }

    function onPointerDown(e) {
      if (!mq.matches) return;
      dragging = true;
      setPosition(percentFromClientX(e.clientX));
      e.preventDefault();
    }

    handle.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    handle.addEventListener("keydown", function (e) {
      if (!mq.matches) return;
      var current = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") {
        setPosition(current - 5);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setPosition(current + 5);
        e.preventDefault();
      }
    });

    var start = parseFloat(el.getAttribute("data-ba-start")) || 50;
    setPosition(start);
  }

  document.querySelectorAll("[data-ba-compare]").forEach(initCompare);

  /* ---------------------------------------------
     Before/After carousel
     One comparison visible at a time, with arrow
     buttons, dot navigation, swipe and keyboard
     support. Guards against the inner compare
     handle's own drag so dragging it doesn't also
     advance the carousel.
  --------------------------------------------- */
  function initBaCarousel(root) {
    var track = root.querySelector(".ba-track");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".ba-slide"));
    var prevBtn = root.querySelector(".ba-carousel__arrow--prev");
    var nextBtn = root.querySelector(".ba-carousel__arrow--next");
    var dots = Array.prototype.slice.call(root.querySelectorAll(".ba-carousel__dot"));
    var index = 0;
    var startX = null;

    function update() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
    }

    function goTo(i) {
      index = Math.min(slides.length - 1, Math.max(0, i));
      update();
    }

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
      });
    });

    track.addEventListener("pointerdown", function (e) {
      startX = e.target.closest(".ba-handle") ? null : e.clientX;
    });
    track.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var delta = e.clientX - startX;
      startX = null;
      if (Math.abs(delta) > 40) {
        goTo(delta < 0 ? index + 1 : index - 1);
      }
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    update();
  }

  document.querySelectorAll("[data-ba-carousel]").forEach(initBaCarousel);

  /* ---------------------------------------------
     Brevo lead sync
     Fire-and-forget: adds/updates the contact in the
     "First Look Photo - Playbook Leads" list via a Vercel
     serverless function that holds the Brevo API key
     server-side (api/brevo-lead.js). Runs alongside the
     existing Formspree submission in each form handler
     below and never blocks it or surfaces an error to the
     visitor — losing a Brevo sync is invisible to them,
     losing the Formspree notification is not. Same
     one-retry pattern as the popup's own lead submit.
  --------------------------------------------- */
  var BREVO_ENDPOINT = "/api/brevo-lead";

  function syncToBrevo(fields, attempt) {
    attempt = attempt || 0;
    fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Brevo sync failed");
      })
      .catch(function (err) {
        if (attempt < 1) {
          setTimeout(function () {
            syncToBrevo(fields, attempt + 1);
          }, 1500);
        } else {
          console.error("Brevo lead sync failed after retry.", err);
        }
      });
  }

  /* ---------------------------------------------
     FAQ accordion
     Only one question stays open at a time, so the
     FAQ list stays compact on mobile. Native
     <details> handles the collapse/expand itself;
     this just closes any sibling that was open.
  --------------------------------------------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------------------------------------------
     Contact form
     One form, two paths. Everyone leaves contact
     details and a listing link, then picks between
     a free review and booking a session. The
     booking path adds a package and a date, and
     changes the button and the success message to
     match. Submits to Formspree; WhatsApp is only
     offered as a separate, manual contact option.
  --------------------------------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var LABELS = {
      "Ready to book": {
        button: "Request my photo session",
        success: "Thanks. I'll check availability for your preferred timing and get back to you shortly to confirm the photo session, package and next steps."
      },
      "Review first": {
        button: "Request my free photo review",
        success: "I'll review your listing and get back to you within 48 hours."
      }
    };

    var confirmation = form.querySelector("[data-form-confirmation]");
    var submitBtn = form.querySelector("[data-submit-label]");
    var intentPanels = Array.prototype.slice.call(
      form.querySelectorAll("[data-intent-panel]")
    );
    var packageSelect = document.getElementById("field-package");
    var timingSelect = document.getElementById("field-timing");

    function showError(key, message) {
      var errorEl = form.querySelector('[data-error-for="' + key + '"]');
      if (!errorEl) return;
      var wrapper = errorEl.closest(".form-field, .form-fieldset");
      if (wrapper) wrapper.classList.add("has-error");
      errorEl.textContent = message;
    }

    function clearError(key) {
      var errorEl = form.querySelector('[data-error-for="' + key + '"]');
      if (!errorEl) return;
      var wrapper = errorEl.closest(".form-field, .form-fieldset");
      if (wrapper) wrapper.classList.remove("has-error");
      errorEl.textContent = "";
    }

    function currentIntent() {
      var checked = form.querySelector('input[name="intent"]:checked');
      return checked ? checked.value : "";
    }

    function isEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isPhone(value) {
      return /^[+()\d][\d\s()+-]{6,}$/.test(value);
    }

    /* ---- Conditional UI ---- */

    /* Booking path reveals package + date and relabels the button. */
    function syncIntent() {
      var intent = currentIntent();

      intentPanels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-intent-panel") !== intent;
      });

      if (submitBtn) {
        submitBtn.textContent = LABELS[intent]
          ? LABELS[intent].button
          : LABELS["Review first"].button;
      }

      if (intent !== "Ready to book") {
        clearError("field-package");
        clearError("field-timing");
      }
    }

    form.querySelectorAll('input[name="intent"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        clearError("intent");
        syncIntent();
      });
    });

    /* ---- Validation ---- */
    function validate() {
      var ok = true;

      var name = document.getElementById("field-name");
      var email = document.getElementById("field-email");
      var phone = document.getElementById("field-phone");
      var listing = document.getElementById("field-listing");
      var privacy = document.getElementById("field-privacy");

      if (name.value.trim() === "") {
        showError("field-name", "This field is required.");
        ok = false;
      } else {
        clearError("field-name");
      }

      if (email.value.trim() === "") {
        showError("field-email", "This field is required.");
        ok = false;
      } else if (!isEmail(email.value.trim())) {
        showError("field-email", "Enter a valid email address.");
        ok = false;
      } else {
        clearError("field-email");
      }

      /* Phone is optional, but check the format when one is given. */
      if (phone.value.trim() !== "" && !isPhone(phone.value.trim())) {
        showError("field-phone", "Enter a valid phone number.");
        ok = false;
      } else {
        clearError("field-phone");
      }

      if (listing.value.trim() === "") {
        showError("field-listing", "This field is required.");
        ok = false;
      } else {
        clearError("field-listing");
      }

      var intent = currentIntent();
      if (intent === "") {
        showError("intent", "Please choose an option.");
        ok = false;
      } else {
        clearError("intent");
      }

      if (intent === "Ready to book") {
        if (!packageSelect.value) {
          showError("field-package", "Please choose a package.");
          ok = false;
        } else {
          clearError("field-package");
        }

        if (!timingSelect.value) {
          showError("field-timing", "Please choose a preferred timing.");
          ok = false;
        } else {
          clearError("field-timing");
        }
      }

      if (!privacy.checked) {
        showError("field-privacy", "Please tick this box so I can reply to you.");
        ok = false;
      } else {
        clearError("field-privacy");
      }

      return ok;
    }

    form
      .querySelectorAll("#field-name, #field-email, #field-phone, #field-listing")
      .forEach(function (field) {
        field.addEventListener("blur", function () {
          if (field.value.trim() !== "") validate();
        });
      });

    /* ---- Submit: post to Formspree, no WhatsApp redirect ---- */
    function showConfirmation(text, isError) {
      if (!confirmation) return;
      confirmation.classList.toggle("contact-form__confirmation--error", !!isError);
      confirmation.textContent = text;
      confirmation.hidden = false;
      confirmation.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validate()) {
        var firstError = form.querySelector(
          ".has-error input, .has-error select, .has-error textarea"
        );
        if (firstError) firstError.focus();
        return;
      }

      var intent = currentIntent();
      var formData = new FormData(form);

      syncToBrevo({
        name: formData.get("name"),
        email: formData.get("email"),
        listing: formData.get("listing"),
        message: formData.get("message"),
        lead_source: "contact_form",
        lead_intent: intent === "Ready to book" ? "booking_request" : "free_photo_review",
        package: intent === "Ready to book" ? formData.get("package") : "",
        timing: intent === "Ready to book" ? formData.get("timing") : ""
      });

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Form submission failed");

          form.reset();
          syncIntent();
          showConfirmation(
            LABELS[intent] ? LABELS[intent].success : LABELS["Review first"].success,
            false
          );
        })
        .catch(function () {
          showConfirmation(
            "Sorry, something went wrong. Please try again or message me directly on WhatsApp.",
            true
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          syncIntent();
        });
    });

    /* ---------------------------------------------
       Preselecting the booking path
       Pricing cards carry a data-package label that
       matches an option in the dropdown; the other
       booking CTAs just switch the form to the
       booking path and leave the choice open.
    --------------------------------------------- */
    function selectBookingPath() {
      var bookRadio = form.querySelector('input[name="intent"][value="Ready to book"]');
      if (bookRadio) bookRadio.checked = true;
      syncIntent();
    }

    document.querySelectorAll("[data-package]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (packageSelect) packageSelect.value = btn.getAttribute("data-package");
        selectBookingPath();
      });
    });

    document.querySelectorAll("[data-intent-preselect]").forEach(function (btn) {
      btn.addEventListener("click", selectBookingPath);
    });

    syncIntent();
  }

  /* ---------------------------------------------
     Host Playbook waitlist
     Small standalone form: email only, posts to the
     same Formspree endpoint as the main form but
     tagged via hidden fields so submissions are easy
     to tell apart in the inbox.
  --------------------------------------------- */
  var playbookForm = document.getElementById("playbook-form");
  if (playbookForm) {
    var playbookEmail = document.getElementById("playbook-email");
    var playbookSubmit = playbookForm.querySelector("[data-playbook-submit]");
    var playbookConfirmation = playbookForm.querySelector("[data-playbook-confirmation]");
    var playbookSubmitLabel = playbookSubmit.textContent;

    function isPlaybookEmailValid(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function showPlaybookConfirmation(text, isError) {
      if (!playbookConfirmation) return;
      playbookConfirmation.classList.toggle("playbook-form__confirmation--error", !!isError);
      playbookConfirmation.textContent = text;
      playbookConfirmation.hidden = false;
    }

    playbookForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var value = playbookEmail.value.trim();
      var errorEl = playbookForm.querySelector('[data-error-for="playbook-email"]');
      var fieldWrapper = playbookEmail.closest(".form-field");

      if (!isPlaybookEmailValid(value)) {
        if (errorEl) errorEl.textContent = "Enter a valid email address.";
        if (fieldWrapper) fieldWrapper.classList.add("has-error");
        playbookEmail.focus();
        return;
      }
      if (errorEl) errorEl.textContent = "";
      if (fieldWrapper) fieldWrapper.classList.remove("has-error");

      syncToBrevo({
        email: value,
        lead_source: "free_host_playbook",
        lead_intent: "playbook_download"
      });

      var formData = new FormData(playbookForm);

      playbookSubmit.disabled = true;
      playbookSubmit.textContent = "Sending…";

      fetch(playbookForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Playbook form submission failed");
          playbookForm.reset();
          showPlaybookConfirmation("Thanks. I'll email you the Host Playbook shortly.", false);
        })
        .catch(function () {
          showPlaybookConfirmation("Sorry, something went wrong. Please try again later.", true);
        })
        .finally(function () {
          playbookSubmit.disabled = false;
          playbookSubmit.textContent = playbookSubmitLabel;
        });
    });
  }

  /* ---------------------------------------------
     Host Playbook capture popup
     Mobile: opens after 45s on the page OR 65% scroll
     depth, whichever comes first. Desktop: exit-intent,
     armed after the same 45s delay. Stays out of the way
     of the main conversion path — it never opens while
     the contact form is on screen, or once the visitor
     has clicked a free-review CTA (Get/Start a free photo
     review, Check availability), even if that click
     happens before the scroll/time threshold is reached.
     Fires at most once per visitor: the localStorage
     flag is set the moment the popup is shown, not
     when the visitor submits, so closing it without
     entering an email doesn't bring it back later.
     The PDF downloads before the Formspree POST is
     even sent, and a failed POST is retried once
     silently — the visitor already has the file, so
     nothing about the request is ever surfaced as an
     error to them.
  --------------------------------------------- */
  var popupOverlay = document.getElementById("lp-popup-overlay");
  if (popupOverlay) {
    var POPUP_STORAGE_KEY = "flp_guide_popup_v1";
    var POPUP_MIN_DELAY_MS = 45000;
    var POPUP_SCROLL_THRESHOLD = 0.65;
    /* Phrases (lowercased, substring match) that identify a free-review
       CTA. Clicking one of these means the visitor is already moving
       down the main conversion path, so the popup should stay out of
       the way for the rest of the session. */
    var REVIEW_CTA_PHRASES = ["free photo review", "check availability", "request a photo review"];
    var PDF_URL = "/First_Look_Host_Playbook.pdf";
    /* Using the main Formspree form for now; the "source" field below
       tags these leads. Swap in a dedicated Formspree endpoint for the
       popup once one exists, so ebook leads stop mixing with review
       and booking requests in the same inbox view. */
    var POPUP_FORM_ENDPOINT = "https://formspree.io/f/mojgopoa";

    var popupFormState = popupOverlay.querySelector("[data-lp-popup-form-state]");
    var popupSuccessState = popupOverlay.querySelector("[data-lp-popup-success]");
    var popupForm = document.getElementById("lp-popup-form");
    var popupNameInput = document.getElementById("lp-popup-name");
    var popupEmailInput = document.getElementById("lp-popup-email");
    var popupSubmitBtn = popupForm.querySelector("[data-lp-popup-submit]");
    var popupErrorEl = popupForm.querySelector("[data-lp-popup-error]");
    var popupCloseBtn = document.getElementById("lp-popup-close");
    var contactFormEl = document.getElementById("contact-form");

    var armed = false;
    var shown = false;
    var scrollHandler = null;
    var reviewCtaClicked = false;

    function popupAlreadySeen() {
      try {
        return localStorage.getItem(POPUP_STORAGE_KEY) === "1";
      } catch (err) {
        return false;
      }
    }

    function markPopupSeen() {
      try {
        localStorage.setItem(POPUP_STORAGE_KEY, "1");
      } catch (err) {
        /* localStorage unavailable (private mode, etc.) — fail open. */
      }
    }

    function contactFormOnScreen() {
      if (!contactFormEl) return false;
      var rect = contactFormEl.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function detachPopupTriggers() {
      document.removeEventListener("mouseout", onPopupMouseOut);
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    }

    function openPopup() {
      if (shown || popupAlreadySeen() || contactFormOnScreen() || reviewCtaClicked) return;
      shown = true;
      markPopupSeen();
      detachPopupTriggers();
      popupOverlay.hidden = false;
      if (popupNameInput) popupNameInput.focus();
    }

    function closePopup() {
      popupOverlay.hidden = true;
    }

    function onPopupMouseOut(e) {
      if (!armed || e.relatedTarget || e.clientY > 0) return;
      openPopup();
    }

    function onPopupScroll() {
      /* Independent of the timer below — either condition alone is
         enough to trigger the popup on mobile. */
      var doc = document.documentElement;
      var depth = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (depth > POPUP_SCROLL_THRESHOLD) openPopup();
    }

    if (!popupAlreadySeen()) {
      var isCoarsePointer =
        window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

      if (isCoarsePointer) {
        /* Mobile: 45s on the page OR 65% scroll depth, whichever
           happens first. */
        window.addEventListener("load", function () {
          setTimeout(openPopup, POPUP_MIN_DELAY_MS);
        });
        scrollHandler = onPopupScroll;
        window.addEventListener("scroll", scrollHandler, { passive: true });
      } else {
        /* Desktop: exit-intent only, armed after the same minimum
           delay so it can't fire the moment the page loads. */
        window.addEventListener("load", function () {
          setTimeout(function () {
            armed = true;
          }, POPUP_MIN_DELAY_MS);
        });
        document.addEventListener("mouseout", onPopupMouseOut);
      }

      document.addEventListener("click", function (e) {
        var el = e.target.closest("a, button");
        if (!el) return;
        var txt = (el.textContent || "").trim().toLowerCase();
        for (var i = 0; i < REVIEW_CTA_PHRASES.length; i++) {
          if (txt.indexOf(REVIEW_CTA_PHRASES[i]) !== -1) {
            reviewCtaClicked = true;
            detachPopupTriggers();
            break;
          }
        }
      });
    }

    popupCloseBtn.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", function (e) {
      if (e.target === popupOverlay) closePopup();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !popupOverlay.hidden) closePopup();
    });

    function isValidPopupEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function downloadPlaybook() {
      var link = document.createElement("a");
      link.href = PDF_URL;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function submitPopupLead(formData, attempt) {
      fetch(POPUP_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Popup form submission failed");
        })
        .catch(function (err) {
          if (attempt < 1) {
            setTimeout(function () {
              submitPopupLead(formData, attempt + 1);
            }, 1500);
          } else {
            console.error("Host Playbook popup: submission failed after retry.", err);
          }
        });
    }

    popupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = popupNameInput.value.trim();
      var email = popupEmailInput.value.trim();

      if (!name || !isValidPopupEmail(email)) {
        if (popupErrorEl) {
          popupErrorEl.textContent = "Please enter your name and a valid email.";
          popupErrorEl.hidden = false;
        }
        return;
      }
      if (popupErrorEl) popupErrorEl.hidden = true;

      syncToBrevo({
        name: name,
        email: email,
        lead_source: "free_host_playbook",
        lead_intent: "playbook_download"
      });

      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("source", "Host Playbook popup");

      popupSubmitBtn.disabled = true;

      /* Download first: the visitor keeps the guide even if the
         network request below never completes. */
      downloadPlaybook();
      submitPopupLead(formData, 0);

      if (popupFormState) popupFormState.hidden = true;
      if (popupSuccessState) popupSuccessState.hidden = false;
    });
  }
})();
