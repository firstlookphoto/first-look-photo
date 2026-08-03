# First Look Photo — Visual Brand Guide

Purpose: give any designer or AI tool everything needed to keep the **First Look Host Playbook**, future ebooks, and social content visually consistent with [firstlook-photo.com](https://first-look-photo.vercel.app). This is a **visual-only** reference — colors, type, spacing, imagery and UI style. It intentionally does not cover copywriting, tone of voice or messaging.

---

## 1. Color palette

| Role | Hex | Usage |
|---|---|---|
| Accent (primary brand color) | `#FF5A5F` (coral) | CTAs, links, icon mark, small highlights, numbered badges |
| Accent — dark | `#E00007` | Hover/pressed states on accent elements |
| Accent — light | `#FFE7E4` | Soft tinted backgrounds behind highlighted text/callouts |
| Text — primary | `#222222` | Headings, body copy |
| Text — secondary | `#6A6A6A` | Supporting copy, captions, fine print |
| Background — main | `#FFFFFF` | Page background |
| Background — alt | `#F7F7F7` | Card backgrounds, secondary/muted sections |
| Border / divider | `#EBEBEB` | Hairline borders, dividers |
| Warning bg / border / text *(rare, cautionary use only)* | `#FFF7E6` / `#F0C36D` / `#8A6116` | Not part of the core identity — avoid unless flagging something cautionary |

**Rule of thumb:** the palette is neutral (white / off-white / charcoal grey) with coral used *sparingly* as the one accent — never as a full-bleed background, never diluted into pastel tints beyond the "accent-light" shade above. Don't introduce new brand colors. If a chart, diagram or icon set needs a secondary color, reach for warm neutrals (sand, wood-brown, soft sage) that sit naturally next to real-estate photography — not saturated hues that compete with the coral.

---

## 2. Typography

**Font:** [Poppins](https://fonts.google.com/specimen/Poppins) (Google Font). Fallback stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

If Poppins isn't available in a tool, use a similar geometric/rounded humanist sans (e.g. Inter, Nunito Sans, Circular) — never a serif, script/handwritten, or condensed/techy typeface.

| Style | Weight | Size (desktop / mobile) | Notes |
|---|---|---|---|
| H1 / hero headline | Bold (700) | 2.75rem / 1.75rem | Line-height 1.15, letter-spacing −0.02em |
| H2 / section title | Bold (700) | 1.75rem | Letter-spacing −0.01em |
| Lead / intro paragraph | Medium (500) | 1.05rem | Secondary text color |
| Body copy | Regular (400) | 1–1.02rem | Line-height 1.55 |
| Small print / disclaimers | Regular (400) | 0.82–0.9rem | Secondary text color |
| Buttons / labels | SemiBold (600) | 0.92–1rem | |

Headings are always dark charcoal, never coral (coral is reserved for the "Photo" half of the wordmark, accents and CTAs).

---

## 3. Logo & icon mark

- **Icon:** two concentric circles (aperture/target-like mark), coral `#FF5A5F` stroke on transparent background.
- **Wordmark:** "First Look" in dark charcoal `#222222` + "**Photo**" in coral `#FF5A5F`, both Poppins Bold.
- Ready-to-use exports live in this same `brand/` folder: `icon-transparent.png`, `icon-white-bg.png`, `icon-coral-bg.png` (inverted, white icon on coral — for dark backgrounds), `logo-transparent.png`, `logo-white-bg.png`.
- Keep clear space around the icon roughly equal to its own radius. Never recolor it outside this palette, and never add drop shadows, outlines or bevels to it.

---

## 4. Spacing, shape & elevation

- **Spacing scale:** 0.5rem / 1rem / 1.5rem / 2.5rem / 4rem / 6rem — whitespace is generous; sections breathe rather than feeling cramped.
- **Corner radius:** small UI elements 8px, cards 12px, large photo containers/hero images 20px. Buttons are fully pill-shaped (999px radius).
- **Shadows:** soft and low-opacity only — `0 2px 16px rgba(0,0,0,.08)` for resting cards, slightly deeper on hover. No hard drop shadows, no skeuomorphic effects.
- **Layout:** centered content column, max-width ~1120px (or ~760px for narrow text-focused sections). Mobile-first, single column, generous margins.

---

## 5. Buttons & small UI accents

- **Primary CTA:** solid coral pill, white bold text.
- **Secondary CTA:** transparent pill with coral border + coral text; tints to accent-light on hover.
- **Ghost CTA** (used on top of photos, e.g. hero): translucent white pill (`rgba(255,255,255,.12)`) with a white border and light blur behind it — for buttons sitting directly on an image.
- **Numbered step badges** (e.g. "how it works" steps): solid coral circle, ~32px, white bold number centered inside.
- **List markers:** coral checkmark (✓) for benefit/checklists, coral em-dash (—) for credential/authority lists — never default black bullets.

---

## 6. Photography & imagery style

This is the look every photo in the Playbook, social posts, or any other brand material should match:

- **Light:** bright, naturally lit interiors — soft daylight, minimal harsh shadow, true-to-life color grading (not over-saturated, not HDR-looking).
- **Palette within the photos themselves:** neutral — whites, warm wood tones, soft greys/beiges — with the occasional natural accent (greenery, a single warm cushion, brass fixture). The coral brand color does not need to appear inside the photography itself.
- **Framing:** wide but realistic, level horizons, no fisheye distortion, tidy/uncluttered staging.
- **Subject matter:** short-term rental interiors and exteriors — living rooms, bedrooms, kitchens, bathrooms, decks/outdoor areas — frequently featuring a view (lake, mountains, sea, garden).
- **Aspect ratios used on-site:** 4:3 for grid/gallery tiles (portfolio, before/after comparisons), a wide ~2:1 crop for hero banners.
- **Editing style:** natural and honest — brightness, white balance, clarity and composition correction. Any AI-assisted enhancement should stay photo-realistic; avoid heavy filters, unrealistic retouching, or anything that misrepresents the space.

For a Playbook cover or social templates: prefer real, warm, naturally-lit interior photography (the site's own portfolio images are the best reference) over illustration-heavy design or generic stock photography. If an illustrated or iconographic element is ever needed, keep it minimal line-art in coral or charcoal, matching the logo's line weight — not a different illustration style.

---

## 7. Overall aesthetic in one line

Clean, warm, uncluttered, editorial-but-approachable — Airbnb-inspired in structure and rhythm without copying Airbnb's own branding — mobile-first, generous whitespace, one accent color used sparingly, calm and trustworthy rather than loud or salesy.

---

## 8. Quick do / don't

**Do**
- Use coral only as an accent, never as a background wash
- Keep typography to Poppins (or the documented fallback)
- Keep corners rounded — pill buttons, soft card radii
- Use real, bright, naturally-lit property photography
- Leave generous whitespace between elements

**Don't**
- Introduce new brand colors beyond the palette in section 1
- Use serif, script, or condensed/techy fonts
- Add heavy drop shadows, unrelated gradients, or skeuomorphic effects
- Use over-saturated, HDR, or heavily filtered photos
- Crowd a layout — keep one clear focal point per screen/page

---

*Reference the live site for real, current examples of every element above in context: https://first-look-photo.vercel.app*
