# Valeriya Ritz — Portfolio 2026

A one-page, black-and-white editorial portfolio. Showreel first, explanation
second: watch the work → meet the person → read the manifest → explore the
projects → get your sign to say hi.

Structural reference: Hero Studios (showreel opening, project list with hover
previews). Narrative pacing reference: YEQQ (manifesto feeling, personal
storytelling). Neither copied — both used as direction.

## Stack

- **Next.js 13.5** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for scroll reveals, word-by-word text motion and the
  crossfading work previews

> Pinned to Next 13.5 because the local Node is 18.14. Once you're on Node ≥ 18.17
> you can bump to Next 14/15 (`npm i next@latest`) with no code changes.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Sections

1. **Showreel** (`#showreel`) — full-screen video module, minimal interface
2. **Intro** (`#intro`) — "I design systems. I direct stories."
3. **Context** (`#context`) — narrative about, timeline, contradictions block
4. **Manifest** (`#manifest`) — horizontal slider, one statement per slide
5. **Selected Work** (`#work`) — project list + hover preview (7 projects)
6. **Contact** (`#contact`) — THIS IS YOUR SIGN

## Where to replace things

Everything editable lives in **`lib/content.ts`** — copy, project data, links,
phone numbers, media paths. Components never hard-code content.

| What | Where | How |
|---|---|---|
| **Fonts (Nyght + Aeonik)** | `public/fonts/` | Drop the `.woff2` files in — see `public/fonts/README.txt` for exact filenames. Fallbacks (Instrument Serif + Inter Tight) load until then. |
| **Showreel video** | `public/media/showreel.mp4` | Then set `showreel.videoSrc` in `lib/content.ts` |
| **Project images** | `public/media/` | Change each project's `image` in `lib/content.ts` from `placeholder(...)` to `"/media/yourfile.jpg"` |
| **LinkedIn URL** | `lib/content.ts` → `contact.linkedin.href` | Currently a placeholder |
| **Project detail pages** | `lib/content.ts` → each project's `href` | Currently anchor placeholders |

All image placeholders are grayscale seeded photos from picsum.photos, so the
site stays black-and-white until real assets arrive.

## Components

| Component | Role |
|---|---|
| `Nav` | Fixed minimal nav, inverts via `mix-blend-difference` |
| `Showreel` | Full-screen opening reel (designed placeholder until video exists) |
| `Intro` | Positioning statement with scroll-driven word fade |
| `About` | Sticky heading + timeline + contradictions block |
| `Manifest` | Horizontal scroll-snap slider with counter + arrows |
| `Work` | Project list with sticky crossfading hover preview (stacked cards on mobile) |
| `Contact` | The sign, contact channels, footer |
| `ui` | Shared: `Reveal`, `ScrollWords`, `Em` (serif-italic voice), `SectionHead` |
