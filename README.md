# Syed Abdul Kadar P — Portfolio

A fast, dependency-free personal portfolio for cybersecurity / application security work.
Built as static HTML, CSS and vanilla JavaScript — no build step, no framework, ready for GitHub Pages.

## Structure

```
.
├── index.html                          # Single-page site
├── assets/
│   ├── css/style.css                   # Design system + layouts + responsive rules
│   ├── js/main.js                      # Nav, scroll reveal, filters, case-study dialogs
│   ├── og-cover.png                    # 1200×630 social preview image
│   └── resume/
│       └── Syed-Abdul-Kadar-Resume.pdf # Downloadable resume
└── README.md
```

## Features

- Responsive single-page layout (desktop, tablet, mobile)
- Terminal-style hero with animated stats
- Filterable project grid
- Three expandable vulnerability case studies (methodology, PoC, impact, remediation)
- Scroll reveal animations, scroll-spy navigation, active-section highlighting
- Accessible dialog (`<dialog>`, focus return, Esc / backdrop close)
- Copy-email button with clipboard fallback
- `prefers-reduced-motion`, no-JS fallback and print styles
- SEO meta tags, Open Graph / Twitter cards, Person JSON-LD

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this folder to a repository, e.g. `abdulkadar-tech`.
2. In **Settings → Pages**, set **Source** to `Deploy from a branch`.
3. Choose the `main` branch and `/ (root)` folder, then save.
4. The site publishes at `https://<username>.github.io/<repo>/`.

All asset paths are relative, so the site works from a project subpath as well as a custom domain.

> If you deploy somewhere other than `abdulkadar-coder.github.io/abdulkadar-tech/`, update the four absolute `og:image` / `twitter:image` / `og:url` URLs in the `<head>` of `index.html`.

## Editing content

- **Text, sections, projects, credentials:** `index.html`
- **Case studies:** the `<template id="case-...">` blocks at the bottom of `index.html`
- **Colors, spacing, typography:** CSS custom properties at the top of `assets/css/style.css`
- **Resume:** replace `assets/resume/Syed-Abdul-Kadar-Resume.pdf` (keep the filename) or update the two links pointing to it.

## Notes

All vulnerability write-ups are redacted: no personal data, credentials or target identifiers that were not already public in the original disclosure. Keep it that way when updating.
