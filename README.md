# Solar Shop — Home page with the redesigned hero

A faithful, self-contained build of the **Solar Shop** (solarshop.co.nz) home page.
Every block — navigation, ticker, cards, products, brand wall, FAQ and footer — is the
live site's own design; **only the hero section is new**.

> **Message:** *Reliable solar solutions from a trusted brand.*
> **Tagline:** *Powered by Trilect*

---

## The hero

| | |
|---|---|
| **Layout** | One message on the left, a full-bleed photograph behind it, and a single white card holding the supplied brand assets. |
| **Photograph** | A 5-image crossfade slider of the client's own team photos (auto-advance 5.2 s, arrows, dots, swipe, ← / → keys, pause on hover/focus, `prefers-reduced-motion` aware). No filters, no colour grading, no overlay on the photo. |
| **Gradient** | A cream (`#F4F8F0` — the site's own hero colour) left-to-right gradient keeps the copy legible and clears to 0 % at 66 % so the photo keeps its natural colour. On phones/tablets the same gradient runs vertically. |
| **Supplied assets** | Solar Shop logo, *Solar Shop — Powered by Trilect* lockup, accreditation strip (Master Electricians, SEANZ, Mastercraft, IMPAC Prequal, Site Safe, EWRB) — used exactly as supplied. |
| **Height** | `0.8` of the site's previous hero → 720 px @1440×900, 768 px @1920×1080. One number controls it. |
| **Responsive** | 320 → 1920 px tested; photo band + stacked copy below 1100 px. |

---

## Preview

![Solar Shop home page — hero](screenshots/hero-desktop.jpg)

Desktop hero (1440 px) · [full page](screenshots/home-full-page.jpg) ·
[mobile hero](screenshots/hero-mobile.jpg)

---

## Run it locally

Any static server works — there is no build step:

```bash
# option 1 — Python
python3 -m http.server 8000

# option 2 — Node
npx serve .
```

Then open <http://localhost:8000>.

> Opening `index.html` directly from disk mostly works, but a local server is
> recommended so the web fonts and the slider load exactly as they do in production.

---

## Deploy

**GitHub Pages** — push this repository, then *Settings ▸ Pages ▸ Branch: `main` / root*.
The included `.nojekyll` file makes Pages serve the folders as-is.

**Netlify / Vercel / Cloudflare Pages** — no configuration needed; it is a static site.

---

## Project structure

```
index.html                     the home page (hero = new, everything else = live site)
assets/
  tokens.css                   design tokens: colours, gradient, type, spacing, hero height
  hero.css                     hero layout + slider + responsive rules
  hero.js                      slider behaviour + a small demo-link notice
  site.css, site.js            the live site's own styles/scripts (unchanged)
  fonts.css, fonts/            self-hosted Plus Jakarta Sans + Fraunces Italic
  photos/hero-01…05.webp       the five hero photographs, optimised for the web
  supplied/                    client-supplied lockup + accreditation strip
  *.webp, *.png                the rest of the site's images
screenshots/                   preview images used by this README
```

Everything is web-optimised: **the whole repo is about 4 MB**, every file is far below
GitHub's 25 MB / 100 MB limits, and there is no build step.

> The layered SVG artboards, the export slices and the full-resolution source images
> live in the **full design package** (`solarshop-home-github.zip`), not in this
> light repository — keep them out of Git so the repo stays fast to clone and deploy.

---

## Editing the hero

Everything visual is driven by **`assets/tokens.css`**:

```css
--hv2-hero-part: 0.8;      /* hero height as a share of the old 900px hero  */
--hv2-wash-left: linear-gradient(90deg, #F4F8F0 0%, … transparent 66%);
--hv2-fs-h1: clamp(30px, calc(var(--hv2-h) * 0.076), 56px);
```

Change a value there and the whole hero — type, buttons, spacing, gradient — follows.
Copy lives in `index.html`; slide captions are the `data-cap` attributes on `.hv2-slide`;
the slider timing is `delay` in `assets/hero.js`.

---

## Notes

* Contact links (`contact.html#quote`, sub-page navigation) point at pages that are not
  part of this single-page build; the demo shows a small notice instead of a dead end.
* Fonts are self-hosted, so the page renders identically offline.
* All client-supplied artwork is used unmodified (verified byte-identical to the originals).
* Photography in `assets/photos/` is optimised WebP of the client's originals
  (the full-resolution PNGs are kept in the full design package).

---

## Quick start (copy-paste)

```bash
git init
git add .
git commit -m "Solar Shop home page — new hero with team-photo slider"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

GitHub Pages: **Settings ▸ Pages ▸ Source: Deploy from a branch ▸ `main` / `/ (root)`**.
Update the placeholder URL in `sitemap.xml` and `robots.txt` to your final address.

## License / usage

The Solar Shop and Trilect logos, the supplied photography and the accreditation artwork
belong to Solar Shop / Trilect and are included only as part of this design submission.
The page code (`assets/tokens.css`, `assets/hero.css`, `assets/hero.js`, `index.html` hero
markup) may be reused by Solar Shop for their site.
