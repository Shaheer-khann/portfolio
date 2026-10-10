# Shaheer Khan — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4, with Framer Motion and Lenis.

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What it is |
|---|---|
| `content.md` | Source of truth for all copy |
| `lib/content.ts` | The same copy as typed data. Edit `content.md` first, then mirror it here |
| `design.md` | Design spec: colors, type, layout, motion |
| `reference-preview.html` | The approved look the build matches |
| `app/globals.css` | Design tokens and shared utilities |
| `app/page.tsx` | Homepage, one component per section in `components/sections/` |
| `app/papers/[slug]/page.tsx` | Paper pages, laid out as journal articles |
| `public/papers/<slug>/` | Project screenshots |

## Adding a screenshot to a paper

1. Put the image in `public/papers/<slug>/`.
2. Import it at the top of `lib/content.ts` and add `{ src, caption }` to that paper's `figures`,
   using the caption from the paper's **Figures** line in `content.md`.

## Motion

All motion respects `prefers-reduced-motion`: scroll scrub, parallax, the marquee and cursor
effects switch off, and simple fades remain. Elements animated by Framer Motion carry a
`data-motion` attribute that the reduced-motion rules in `app/globals.css` target.
