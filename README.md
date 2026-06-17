# Valeriya Ritz — Portfolio

An experimental, typography-first portfolio. The whole homepage is built around
huge editorial statements, each containing the signature `*( … )` element as an
interactive media container.

## Stack

- **Next.js 13.5** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for scroll reveals, parallax and the expanding media slots
- Font: **Inter Tight** (via `next/font`)

> Pinned to Next 13.5 because the local Node is 18.14. Once you're on Node ≥ 18.17
> you can bump to Next 14/15 (`npm i next@latest`) with no code changes.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Sections

1. **Hero** — `I AM *() VALERIYA` · portrait + intro card
2. **Creation** — `I CREATE *() EXPERIENCES` · process collage
3. **Stories** — `I TELL *() STORIES` · rotating project previews → modal
4. **Philosophy** — `I MAKE *() PEOPLE FEEL` · scroll-revealed feeling words
5. **Contact** — `LET'S CREATE *() TOGETHER` · slideshow + details + CTA

## Components

| Component | Role |
|---|---|
| `TypographicSection` | Full-height type stage with scroll reveal + parallax |
| `InteractiveMediaSlot` | The `*( … )` element — single / collage / rotating / slideshow |
| `ProjectModal` | Project detail overlay (Esc / backdrop to close) |
| `FloatingLabel` | Small editorial captions placed around the type |
| `ContactSection` | Final section with details + CTA |
| `FeelingWords` | Words that light up as they scroll through the viewport |

## Replacing the placeholders

All content + media lives in **`lib/data.ts`** — components never hard-code URLs.

1. Drop your assets into `public/media/`.
2. In `lib/data.ts`, replace the `placeholder(...)` calls with your paths, e.g.

   ```ts
   export const heroPortrait = { src: "/media/portrait.jpg", alt: "Valeriya Ritz" };
   ```

3. For video slots, set the `video` field on a `MediaItem`
   (e.g. `philosophyMedia`): `{ src: "/poster.jpg", video: "/media/clip.mp4", alt: "…" }`.
4. Edit the `projects` array to change titles, descriptions, tags and years.

Contact details, social links and copy are all in the `contact` object at the
bottom of `lib/data.ts`.
