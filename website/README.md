# Aryaman Tandon — Engineering Portfolio

A static portfolio website (HTML + CSS + JS, no build step).

## Structure
```
index.html        All page content: nav, hero, about, BatNAV showcase,
                  Selected Work showcase, skills, contact
css/styles.css    All styling + animations + responsive rules
js/main.js        Interactions (nav, mobile menu, scroll animations)
assets/projects/  Project images
```

> The **BatNAV teaser video** is a separate project and lives entirely in
> `batnav-video/` (Remotion render + the rendered `batnav-teaser.mp4`, the
> standalone `hero.html` 3D experiment, and `reference/` keyframes). It is
> not part of this website's deploy.

## Projects
Projects live directly in `index.html` as two showcase sections:
- **`#showcase`** — the featured BatNAV scroll-scrubbed section.
- **`#work`** ("Selected Work") — a sticky image + scrolling story for the
  other projects. To add one, copy a `.work__panel` (in the story column)
  and a matching `.work__img` (in `.work__frame`), keeping their
  `data-work` indices in sync.

## Preview locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000

## Hosting
Deployed on **Vercel**, connected to GitHub (`AryamanTandon/Revenoid`).
Push to `main` → Vercel auto-deploys in ~1 min.

## Animations (in `js/main.js` + `css/styles.css`)
- Scroll progress bar (top of page)
- Staggered + directional scroll-reveal (`class="reveal"`, optional `data-reveal="left|right|scale"`)
- Animated stat counters (`data-count`, `data-suffix`, `data-decimals`)
- Hero parallax (fades + drifts on scroll)
- Active-section nav highlighting (scroll spy)
- All animations respect `prefers-reduced-motion`

## Next steps
- Embed the BatNAV demo video (upload to YouTube, then drop the link in).
- Make project content SEO-visible (it currently lives in static HTML — done).
