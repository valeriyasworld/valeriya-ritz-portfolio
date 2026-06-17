/**
 * Central content + media registry.
 *
 * Everything visual on the site is keyed off this file. To use your own
 * assets later, just swap the `src` strings below (drop files into /public
 * and reference them as e.g. "/media/portrait.jpg") or replace the
 * `placeholder()` calls. The components never hard-code image URLs.
 */

/** Seeded placeholder image. Replace return value with your own asset paths. */
export function placeholder(seed: string, w = 800, h = 1000): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

export type MediaItem = {
  /** Swap this for "/media/your-file.jpg" once you have real assets. */
  src: string;
  alt: string;
  /** Optional video source — when set the slot renders a looping muted video. */
  video?: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
  media: MediaItem;
};

/* ---------------------------------------------------------------- HERO -- */

export const heroPortrait: MediaItem = {
  src: placeholder("valeriya-portrait", 900, 1100),
  alt: "Portrait of Valeriya Ritz",
};

/* ------------------------------------------------------------ PROCESS -- */

export const processMedia: MediaItem[] = [
  { src: placeholder("sketches", 800, 800), alt: "Sketches" },
  { src: placeholder("moodboard", 800, 800), alt: "Moodboard" },
  { src: placeholder("wireframes", 800, 800), alt: "Wireframes" },
  { src: placeholder("behind-the-scenes", 800, 800), alt: "Behind the scenes" },
  { src: placeholder("visual-experiments", 800, 800), alt: "Visual experiments" },
  { src: placeholder("type-study", 800, 800), alt: "Type study" },
];

/* ------------------------------------------------------------ PROJECTS -- */

export const projects: Project[] = [
  {
    id: "beehelp",
    title: "BeeHelp",
    year: "2025",
    category: "Brand · Product",
    description:
      "A warm support platform that connects people who need help with those who can give it. Identity, product UI and a soft, human motion language.",
    tags: ["Branding", "Product Design", "Motion"],
    media: { src: placeholder("beehelp", 1200, 800), alt: "BeeHelp project" },
  },
  {
    id: "femira",
    title: "Femira",
    year: "2025",
    category: "Identity · Editorial",
    description:
      "An editorial identity for a women's health label — confident typography, tactile colour and a system that feels intimate rather than clinical.",
    tags: ["Identity", "Editorial", "Art Direction"],
    media: { src: placeholder("femira", 1200, 800), alt: "Femira project" },
  },
  {
    id: "next-stop",
    title: "Next Stop",
    year: "2024",
    category: "Film · Title Design",
    description:
      "Title sequence and motion identity for a short documentary about transit and belonging. Type that moves like a city at night.",
    tags: ["Film", "Title Design", "Sound"],
    media: { src: placeholder("next-stop", 1200, 800), alt: "Next Stop project" },
  },
  {
    id: "living-haus",
    title: "Living Haus",
    year: "2024",
    category: "Spatial · Web",
    description:
      "Digital experience for a modular housing studio. Architectural grid, generous whitespace and a configurator that feels like building, not browsing.",
    tags: ["Web", "Interaction", "3D"],
    media: { src: placeholder("living-haus", 1200, 800), alt: "Living Haus project" },
  },
  {
    id: "teora",
    title: "Téora",
    year: "2026",
    category: "Brand · Packaging",
    description:
      "A botanical tea house brand built around ritual and slowness. Hand-set wordmark, muted palette and packaging you want to keep.",
    tags: ["Branding", "Packaging", "Illustration"],
    media: { src: placeholder("teora", 1200, 800), alt: "Téora project" },
  },
];

/* ------------------------------------------------------------ SHOWREEL -- */

export type ReelFrame = {
  media: MediaItem;
  title: string;
  meta: string;
};

/**
 * The scroll-scrubbed showreel between Hero and Creation. Opens on the hero
 * portrait, then runs through every work. Reorder / extend freely — the
 * section sizes itself to the number of frames.
 */
export const showreelFrames: ReelFrame[] = [
  { media: heroPortrait, title: "Showreel", meta: "Selected works · 2026" },
  ...projects.map((p) => ({
    media: p.media,
    title: p.title,
    meta: `${p.category} · ${p.year}`,
  })),
];

/* --------------------------------------------------------- PHILOSOPHY -- */

export const feelingWords = [
  "curiosity",
  "empathy",
  "wonder",
  "belonging",
  "tension",
  "softness",
];

export const philosophyMedia: MediaItem = {
  src: placeholder("emotion-abstract", 1000, 1000),
  alt: "Abstract emotional texture",
  // video: "/media/emotion.mp4", // drop a file here to make this slot a video
};

/* ------------------------------------------------------------ CONTACT -- */

export const contactCollage: MediaItem[] = [
  heroPortrait,
  ...projects.map((p) => p.media),
  ...processMedia.slice(0, 3),
];

export const contact = {
  name: "Valeriya Ritz",
  role: "Media Designer",
  location: "Ravensburg / Germany",
  email: "valeriyaritz@gmail.com",
  instagram: { label: "@valeriyaritz", href: "https://instagram.com/valeriyaritz" },
  linkedin: { label: "LinkedIn", href: "#" }, // placeholder
};
