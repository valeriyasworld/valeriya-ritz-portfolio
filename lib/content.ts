/**
 * ============================================================================
 * CENTRAL CONTENT FILE — every word and every media path on the site lives
 * here. Edit copy, swap placeholders, reorder projects: all in one place.
 *
 * MEDIA PLACEHOLDERS:
 * All images currently come from picsum.photos (grayscale, seeded). To use
 * real assets, drop files into /public/media/ and change the `src` values to
 * e.g. "/media/beehelp-cover.jpg". Components never hard-code URLs.
 * ============================================================================
 */

/** Grayscale seeded placeholder. >>> REPLACE ME with "/media/your-file.jpg" */
export function placeholder(seed: string, w = 1200, h = 800): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}?grayscale`;
}

/* ------------------------------------------------------------------ NAV -- */

export const nav = [
  { label: "Showreel", href: "#showreel" },
  { label: "About me", href: "#about" },
  { label: "Manifest", href: "#manifest" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------- SHOWREEL -- */

export const showreel = {
  /**
   * The real showreel. ✓ live
   * (Optionally add a poster frame as /public/media/showreel-poster.jpg
   * and set posterSrc to "/media/showreel-poster.jpg".)
   */
  videoSrc: "/media/showreel.mp4" as string | null,
  posterSrc: null as string | null, // e.g. "/media/showreel-poster.jpg"
  edition: "Portfolio 2026",
  roleLine: "Digital design → creative direction & film",
};

/* ---------------------------------------------------------------- INTRO -- */

export const intro = {
  // The big two-line positioning statement. *asterisks* mark serif-italic words.
  statementA: "I design *systems.*",
  statementB: "I direct *stories.*",
  sub: "Digital products, visual systems, motion and films — connected by one question: what should this make people feel?",
  tagline:
    "A portfolio of digital products, visual systems, motion, films and small personal contradictions.",
};

/* -------------------------------------------------------------- CONTEXT -- */

export const about = {
  heading: "How I got *here*",
  personal: [
    "I'm Valeriya — a designer from Ukraine, currently thinking, making and slightly overthinking in Germany.",
    "Systems, stories, interfaces, films — I like when things start talking to each other. Three years in an agency made me fast and versatile. University made me structured. Filmmaking made me honest. Now I'm putting all of it in one room and letting it argue.",
  ],
  currently:
    "Currently moving from digital design into creative direction and filmmaking.",
  timeline: [
    {
      period: "3 years",
      title: "Jr Human Experience Designer",
      org: { label: "@PERFORMANCE ONE", href: "https://performance.one/" },
      dates: "aug 2023 – sep 2026",
      what: "Digital design, brand, social, campaigns, websites, real client work.",
      changed:
        "Working at agency made me an allrounder — and taught me how design survives contact with reality: deadlines, feedback, budgets, people.",
      // Hover slideshow with memories from this place — cycles every second.
      // >>> REPLACE ME: drop real photos into /public/media/memories/ and
      // swap these for e.g. "/media/memories/performance-one-1.jpg"
      memories: [
        placeholder("performance-one-1", 600, 800),
        placeholder("performance-one-2", 600, 800),
        placeholder("performance-one-3", 600, 800),
      ],
    },
    {
      period: "3 years",
      title: "B.A. Media Design",
      org: {
        label: "@DHBW Ravensburg",
        href: "https://www.mediendesign-ravensburg.de/",
      },
      dates: "oct 2023 – sep 2026",
      what: "Digital products, interaction design, visual systems, experimentation.",
      changed:
        "It gave my range a spine. I stopped just making things and started building systems that could carry ideas.",
      // >>> REPLACE ME: real DHBW memories, e.g. "/media/memories/dhbw-1.jpg"
      memories: [
        placeholder("dhbw-1", 600, 800),
        placeholder("dhbw-2", 600, 800),
        placeholder("dhbw-3", 600, 800),
      ],
    },
    {
      period: "1,5 years",
      title: "M.A. Creative Direction",
      org: {
        label: "@Design PF",
        href: "https://designpf.hs-pforzheim.de/macd",
      },
      dates: "expected oct 2026 – mar 2028",
      what: "Direction, concept, narrative, visual strategy.",
      changed:
        "Where everything converges. Systems and stories, strategy and intuition — finally in one job description.",
      // no memories yet — the future hasn't happened :)
      memories: [] as string[],
    },
  ],
};

/* ------------------------------------------------------------- MANIFEST -- */

// *asterisks* mark serif-italic words inside each statement.
export const manifest = [
  "I don't want to make things look better. I want to make them *matter.*",
  "Good design is not decoration. It is *direction.*",
  "I believe in systems. But not in *soulless* ones.",
  "A project should have a *reason* to exist.",
  "Emotion is not the opposite of *strategy.*",
  "I care about pixels. And about the *feeling* they leave behind.",
  "I like structure. Until it limits *curiosity.*",
  "I take design seriously. *Not myself.*",
];

/* ----------------------------------------------------------------- WORK -- */

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  /** >>> REPLACE ME: swap for "/media/<project>.jpg" once real assets exist */
  image: string;
  /** Later this can point to a detail page, e.g. "/work/beehelp" */
  href: string;
};

export const projects: Project[] = [
  {
    id: "beehelp",
    title: "Beehelp",
    category: "Digital Product / Interaction Design",
    year: "2024",
    description:
      "A neighborhood help app with a playful visual language and social purpose.",
    image: placeholder("beehelp"),
    href: "#work", // >>> later: "/work/beehelp"
  },
  {
    id: "femira",
    title: "Femira",
    category: "Brand / Digital / Campaign",
    year: "2024",
    description:
      "A sensitive and strategic design project around women's health and communication.",
    image: placeholder("femira"),
    href: "#work",
  },
  {
    id: "human",
    title: "You Know That You're a Human?",
    category: "Poetic Short Film / Visual Essay",
    year: "2025",
    description:
      "A small cinematic piece based on poetry, humanity and the feeling of being seen.",
    image: placeholder("human-film"),
    href: "#work",
  },
  {
    id: "kerasilk",
    title: "Kerasilk",
    category: "Website Redesign / Digital Design",
    year: "2024",
    description:
      "Website redesign focused on digital experience, structure and visual refinement.",
    image: placeholder("kerasilk"),
    href: "#work",
  },
  {
    id: "morphosis",
    title: "Morphosis",
    category: "Design System / Werkschau",
    year: "2025",
    description:
      "A visual system for a design exhibition, built around transformation and identity.",
    image: placeholder("morphosis"),
    href: "#work",
  },
  {
    id: "jardin",
    title: "Jardin de la Crimée",
    category: "Concept Website / Personal Project",
    year: "2025",
    description:
      "A fictional website for a Crimean winery. A personal promise: if Crimea returns to Ukraine, I will design a real website for a winery there — for free.",
    image: placeholder("jardin-crimee"),
    href: "#work",
  },
  {
    id: "next-stop",
    title: "Next Stop",
    category: "Short Film / Experimental Video",
    year: "2025",
    description:
      "A film about metro systems in Ukraine and Germany, with a drone-like, observational aesthetic.",
    image: placeholder("next-stop"),
    href: "#work",
  },
];

/* -------------------------------------------------------------- CONTACT -- */

export const contact = {
  signLines: ["This is", "your sign"],
  sub: ["To say hi.", "To finally start that project.", "Or whatever you needed a sign for. <3"],
  email: "valeriyaritz@gmail.com",
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/", // >>> REPLACE ME with your LinkedIn profile URL
  },
  instagram: {
    label: "Instagram",
    href: "https://instagram.com/valeriyacreates",
  },
  telegram: {
    label: "Telegram",
    href: "#", // >>> REPLACE ME: Valeriya sends the Telegram link later
  },
  phones: [
    { label: "+49 179 461 97 65", href: "tel:+491794619765" },
    { label: "+380 99 364 06 81", href: "tel:+380993640681" },
  ],
  location: "Germany / available remote",
};
