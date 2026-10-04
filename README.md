# Shubhi Singh — interactive resume

A resume you can poke at. React, TypeScript, Vite, Tailwind CSS and Motion.
No backend, no database, no environment variables, no network requests: fonts and every
illustration are bundled locally.

## Run it

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

`npm run build` typechecks and writes a static copy to `dist/`; `npm run preview` serves it.

## Where things live

| Path | What |
|---|---|
| `src/data/resume.ts` | Every fact on the page: skills, timeline, achievements, education, certifications, languages, the "more things" list. Edit here first. |
| `src/sections/` | One file per section, in page order (see `src/App.tsx`). |
| `src/sections/Projects.tsx` | The six project spreads and their copy. |
| `src/minis/` | The working miniature for each project (code editor, seller form, map, registry, satellite tiles, living room). |
| `src/components/Cursor.tsx` | The custom cursor. Add `data-cursor="LABEL"` to any element to change it, `data-tone="coral"` to recolour it inside a section. |
| `src/components/Motion.tsx` | `Headline` (word reveal), `Reveal`, `Magnetic`, `Tilt`. |
| `src/components/Doodles.tsx` | Stars, arrows, scribbles and other hand-drawn SVG bits. |
| `src/index.css` | Colour tokens, fonts and the type classes. |

## Notes

- Touch devices get a simpler composition: no custom cursor, no tilt, no parallax, fewer stickers.
- With "reduce motion" switched on in the OS, animations are cut back to near nothing and the layout stays the same.
- The numbers inside the miniatures (XP, leaderboard, map shading) are demo data and are labelled as such on the page.
- The Indian-language strings in the Sakhi and Abhay miniatures were written for this page and have not been checked by native speakers.
