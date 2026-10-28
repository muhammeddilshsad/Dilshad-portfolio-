# Muhammed Dilshad Tk — Portfolio

Personal portfolio for **Muhammed Dilshad Tk, React Developer**. Frontend only, built with React + Vite, Tailwind CSS v4, Framer Motion and Lucide icons.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Before you deploy — fill in the placeholders

| What | Where |
| --- | --- |
| CV PDF | Already in `public/Muhammed-Dilshad-Tk-CV.pdf` — replace that file to update it |
| Project live demo / GitHub links | `src/data/projects.js` → `links.live`, `links.github` |

Until they're filled in, placeholder links render as "coming soon" buttons that show a short notice. They never open a broken page. The Download CV buttons check that the PDF exists before downloading it.

## Project structure

```
src/
├── data/                # All content: profile, skills, experience, projects, services, nav
├── components/
│   ├── layout/          # Navbar, Footer, Loader, SideRails, Background + StarField
│   ├── sections/        # Hero, About, Skills, Experience, Projects, Services, Contact
│   ├── hero/            # Interactive code-editor visual
│   ├── contact/         # Interactive 3D dotted globe (canvas)
│   ├── projects/        # Project links and the project detail modal
│   └── ui/              # Shared building blocks: Button, Section, Eyebrow, TagList, CheckMark, Modal…
├── hooks/               # useTheme, useActiveSection, useMediaQuery
├── lib/                 # utils, cv (download), scroll (Lenis + scroll lock), motion presets
├── pages/Home.jsx       # Composes the sections
└── index.css            # Design tokens (dark/light), utilities, keyframes
```

To change the copy, edit the files in `src/data/`. To change the colors, edit the tokens at the top of `src/index.css`.

## Contact form

The site has no backend. The form validates its fields in the browser, then opens the visitor's email app with the message pre-filled (a `mailto:` link to `diludilshazz42@gmail.com`). The form says this next to the submit button.

## Deploy

- **Vercel:** import the repo; Vite is detected automatically (build `npm run build`, output `dist`).
- **Netlify:** import the repo; `netlify.toml` already sets the build command and publish directory.

## Interactions

- **Intro loader:** scrolling role names and a percentage pill, then a curtain reveal. It plays once per browser session.
- **Smooth scrolling:** inertia scrolling with [Lenis](https://github.com/darkroomengineering/lenis). Anchor links account for the fixed navbar.
- **Side rails:** magnetic social icons on the left and a vertical résumé link on the right, on wide screens.
- **Projects:** full-detail cards with every highlight from the CV. "Focus view" opens an accessible modal (focus trap, Escape, scroll lock).
- **What I Do:** an accordion. Hovering or tapping expands a service, framed with bracket corners.
- **Experience:** the timeline line grows as you scroll, with a glowing dot at its tip.

## Accessibility & motion

- Semantic landmarks, a skip link, labelled controls and visible focus states.
- Keyboard-friendly mobile menu (Escape closes it).
- If the visitor's system has "reduce motion" turned on, the site turns off its animations.
- Light/dark theme toggle. The choice is saved in the browser.
