# Aryaman Tandon — Engineering Portfolio

A static portfolio website (HTML + CSS + JS, no build step).

## Structure
```
index.html        Page structure (nav, hero, about, projects, skills, contact)
css/styles.css    All styling + scroll-reveal + responsive rules
js/projects.js    ← EDIT THIS to add/change projects (data only)
js/main.js        Rendering + interactions (nav, mobile menu, scroll reveal)
assets/projects/  Put project images here
```

## Add a project
Open `js/projects.js` and add an entry to the `PROJECTS` array:
```js
{
  title: "My Cool Robot Arm",
  tag: "Robotics",
  desc: "A 5-DOF arm I designed and built. Cut cycle time by 40%.",
  image: "assets/projects/robot-arm.jpg",   // or "" for a placeholder
  tags: ["SolidWorks", "FEA", "Arduino"],
  links: [{ label: "Case Study", url: "https://..." }]
}
```

## Preview locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000

## Publish (free options)
- **GitHub Pages:** push to a repo → Settings → Pages → deploy from `main`.
- **Netlify / Vercel:** drag the folder onto their dashboard.

## Animations (in `js/main.js` + `css/styles.css`)
- Scroll progress bar (top of page)
- Staggered + directional scroll-reveal (`class="reveal"`, optional `data-reveal="left|right|scale"`)
- Animated stat counters (`data-count`, `data-suffix`, `data-decimals`)
- Hero parallax (fades + drifts on scroll)
- Active-section nav highlighting (scroll spy)
- All animations respect `prefers-reduced-motion`

## Next steps
- Add a high-res image for the Autev internship card (currently placeholder).
- Embed the BatNAV demo video (upload to YouTube, then drop the link in).
- Optional: a "pinned/scrubbed" showcase section for the featured project.
