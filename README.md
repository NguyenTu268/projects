# WordPress Project Portfolio

A static portfolio site (plain HTML/CSS/JS, no build tools) showcasing WordPress websites, grouped by niche, with light/dark theming and English/Vietnamese localization.

**Live demo:** https://nguyentu268.github.io/projects/

## Features

- **Niche-based sections**: Lifestyle Review Sites, Finance Review Sites, Casino Review Sites (currently hidden), plus a **Flagship Projects** section pinning the 3 most important projects at the top.
- **Scroll-driven accordion**: whichever section you scroll to expands automatically while the others collapse, so you don't have to scroll through everything at once. Sections can also be opened directly via their header or the quick-nav pills.
- **Light/dark theme** (orange + white / orange + black), persisted in `localStorage`.
- **English/Vietnamese language toggle** that swaps all page content instantly, no reload.
- Each card shows the project's screenshot/logo, name, and a short description on hover; the card background (black/white) is chosen automatically based on the logo's color so it always stays legible.
- 3D tilt and cursor-tracking glow on hover, plus a scroll-triggered entrance animation.

## File structure

```
index.html      Page shell, header markup, and mount points the JS renders into
style.css       All styling: theming, accordion, cards, animations
projects.js     Data: project list, section labels, descriptions — edit content here
script.js       Logic: section/card rendering, accordion, theme toggle, language toggle
images/         Per-project screenshots/logos, organized by niche (fresh/finance/casino)
favicon.ico, images/favicon.svg, images/apple-touch-icon.png   Site icons
```

## Adding, editing, or removing projects

Open [projects.js](projects.js):

- Each niche's projects live in `RAW_PROJECTS`, as tuples: `[Display name, image filename, card background ("light"/"dark"), project URL]`.
- Card background: use `"dark"` when the logo is white/light (needs a dark backdrop to stand out), `"light"` when the logo is black/dark (needs a light backdrop).
- To feature a project in the "Flagship Projects" section, add an entry to `FEATURED_OVERRIDES` with a name matching its display name exactly, and set `featured: true`.
- To temporarily hide an entire niche (as done with Casino), comment out its entry in `SECTIONS_META`, `FOLDER_DEFAULTS`, and its array in `RAW_PROJECTS` — the data stays intact and can be restored by uncommenting.
- `description`, `title`, and `subtitle` fields accept either a plain string (Vietnamese only) or `{ vi: "...", en: "..." }` for a dedicated English translation.

## Running locally

This is a static site — any static file server works, e.g.:

```
npx serve .
```

then open the printed URL. Avoid opening `index.html` directly via `file://`, as some browsers restrict script loading under that protocol.

## Deployment

The site is hosted on **GitHub Pages**, built from the `main` branch root. Every push to `main` triggers a rebuild (usually done within 30-60 seconds).
