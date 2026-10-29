# Syed Abdul Kadar P — Portfolio

A dark, terminal-inspired portfolio for cybersecurity and application security work. Built with
React and Vite, with GSAP scroll animation, Lenis smooth scrolling and selected React Bits
components.

**Live site:** https://abdulkadar-coder.github.io/abdul/

## Stack

- **React 19 + Vite 8** — component-driven UI and a static production build
- **GSAP 3** — hero timeline, scroll-triggered reveals, SplitText and dialog transitions
- **Lenis** — smooth scrolling, integrated with GSAP ScrollTrigger and the anchor navigation
- **Motion** — powers the React Bits ScrollVelocity, CountUp and DecryptedText effects
- **React Bits** — SplitText, CountUp, DecryptedText, ScrollVelocity, Magnet and SpotlightCard

## Features

- Responsive layout for desktop, tablet and mobile
- Terminal-style hero with animated counters, decrypted text, a pointer-tracked panel and
  letter-by-letter SplitText headings
- Scroll-velocity marquee that reacts to scroll speed and supports drag / hover pause
- Spotlight cards for the About card, project grid and contact panel
- Filterable project grid with animated card entrances
- Three expandable vulnerability case studies (methodology, PoC, impact, remediation)
- GSAP scroll reveals, scroll-spy navigation and a reading-progress bar
- Accessible native `<dialog>` with focus return, Esc / backdrop close and sticky close control
- Copy-email button with clipboard fallback
- `prefers-reduced-motion` support, no-JS fallback and print styles
- SEO meta tags, Open Graph / Twitter cards and Person JSON-LD

## Structure

```text
.
├── index.html                     # Vite HTML entry, meta tags and no-JS fallback
├── public/
│   └── assets/
│       ├── og-cover.png           # 1200×630 social preview image
│       └── resume/
│           └── Syed-Abdul-Kadar-Resume.pdf
├── src/
│   ├── main.jsx                   # React root
│   ├── App.jsx                    # Page composition
│   ├── components/                # Header, footer, dialog, icons, shared UI
│   ├── data/
│   │   ├── content.js             # Profile, projects, skills, experience, credentials
│   │   └── caseStudies.jsx        # Full vulnerability case-study content
│   ├── hooks/
│   │   ├── useSmoothScroll.js     # Lenis + ScrollTrigger integration
│   │   └── useReveal.js           # GSAP scroll reveal system
│   ├── reactbits/                 # Adapted React Bits component sources
│   ├── sections/                  # Page sections
│   └── styles/global.css          # Design system, layout and animation overrides
├── .github/workflows/deploy.yml   # GitHub Pages build and deployment
└── THIRD_PARTY_NOTICES.md         # React Bits license text
```

## Run locally

Requires Node 20.19+ or 22.12+ (Node 22 LTS recommended).

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

```bash
npm run build     # Production build in dist/
npm run preview   # Preview the production build locally
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site with `npm ci && npm run build`
and publishes `dist/` whenever `main` is updated.

1. In the repository, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

`vite.config.js` uses `base: "./"`, so the build also works from the `/abdul/` project subpath.
If the repository name changes, update the absolute `og:url`, `og:image` and `twitter:image`
URLs in `index.html`.

## Editing content

- **Profile, stats, skills, projects, research summaries, experience, credentials:**
  `src/data/content.js`
- **Case-study dialogs:** `src/data/caseStudies.jsx`
- **Section layout and copy:** `src/sections/`
- **Colors, spacing, typography and motion overrides:** `src/styles/global.css`
- **Resume:** replace `public/assets/resume/Syed-Abdul-Kadar-Resume.pdf` and keep the filename,
  or update `profile.resume` in `src/data/content.js`
- **Social preview:** replace `public/assets/og-cover.png`

## Accessibility and motion

The site respects `prefers-reduced-motion`: Lenis, GSAP reveals, SplitText, CountUp and
DecryptedText all fall back to their final state. The case-study modal uses the native dialog
element, returns focus to the trigger, and can be closed with Esc or a backdrop click.

## Third-party licenses

- **React Bits** components are distributed under the MIT + Commons Clause license. The license
  text is included in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md). This portfolio uses the
  components as part of a website, which the license permits; the components themselves are not
  sold or redistributed as a standalone product.
- **GSAP** is used under its standard "no charge" license for this personal portfolio.
- **Lenis**, **Motion** and **React** are used under their respective MIT licenses.

## Notes

All vulnerability write-ups are redacted: no personal data, credentials or target identifiers
that were not already public in the original disclosure. Keep it that way when updating.
