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
  /**
   * One big Hero-style flowing statement. *asterisks* mark serif-italic
   * words. [1] [2] [3] mark inline photo slots — each renders the matching
   * entry from `inlineImages` as a small picture inside the text flow.
   * Slots without an image are simply skipped.
   */
  statement:
    "Hey, I'm Valeriya. [1] A media designer working across digital design, visual systems and *film,* [2] connected by one question: What should this make people *feel?* [3]",
  // .mp4 entries render as tiny muted video loops inside the text
  inlineImages: [
    "/media/intro/intro-1.jpg",
    "/media/intro/intro-2.mp4",
    "/media/intro/intro-3.jpg",
  ] as string[],
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
      period: "1,5 years",
      title: "B.A. Media Conception & Production",
      org: {
        label: "@HFU Furtwangen",
        href: "https://www.hs-furtwangen.de/en/study/programmes/media-design-bachelor",
      },
      // >>> check the years — assumed from "3 semesters before DHBW"
      dates: "2021 – 2023 · discontinued",
      what: "First steps in filmmaking, UX/UI and audio/video production — too technical for me, but the perfect foundation.",
      memories: [] as string[],
    },
    {
      period: "3 years",
      title: "Jr Human Experience Designer",
      org: { label: "@PERFORMANCE ONE", href: "https://performance.one/" },
      dates: "aug 2023 – sep 2026",
      what: "Digital design, brand, social and real client work — the allrounder years, where design met deadlines, budgets and people.",
      // Hover slideshow with memories from this place — cycles every second.
      memories: [
        "/media/memories/p_one_1.jpg",
        "/media/memories/p_one_2.jpg",
        "/media/memories/p_one_3.jpg",
        "/media/memories/p_one_4.jpg",
        "/media/memories/p_one_5.jpg",
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
      what: "Digital products, interaction design and visual systems — where making things turned into building systems.",
      // >>> REPLACE ME: real DHBW memories, e.g. "/media/memories/dhbw-1.jpg"
      memories: [
        placeholder("dhbw-1", 600, 800),
        placeholder("dhbw-2", 600, 800),
        placeholder("dhbw-3", 600, 800),
      ],
    },
    {
      period: "1 year",
      title: "Tutor",
      org: {
        label: "@Center for Immersive Media",
        href: "https://cim-lab.de/valeriya-ritz/",
      },
      dates: "jul 2025 – present",
      what: "Immersive media, studio equipment and student support — bridging creative ideas with technical setups.",
      memories: [] as string[],
    },
    {
      period: "1,5 years",
      title: "M.A. Creative Direction",
      org: {
        label: "@Design PF",
        href: "https://designpf.hs-pforzheim.de/en/macd",
      },
      dates: "expected oct 2026 – mar 2028",
      what: "Direction, concept, narrative and visual strategy — systems and stories, finally in one job description.",
      // no memories yet — the future hasn't happened :)
      memories: [] as string[],
    },
  ],
};

/* --------------------------------------------------------------- SKILLS -- */

// Two marquees under About: hard skills glide left, soft skills glide
// right at the same speed — direction tells them apart.
export const skillsLabel = "( Soft & Hard Skills )";
export const hardSkills = [
  "Figma",
  "DaVinci Resolve",
  "Adobe Ai",
  "Adobe Ps",
  "Adobe InD",
  "Adobe Pr",
];
export const softSkills = [
  "Empathy & Self-Reflection",
  "Curiosity",
  "Intercultural Awareness",
  "Problem-Solving",
  "Accountability",
];

/* ------------------------------------------------------------- MANIFEST -- */

// *asterisks* mark serif-italic words inside each statement.
export const manifest = [
  "I don't want to make things look better. I want to make them *matter.*",
  "Strategy gives direction. Emotion gives it *meaning.*",
  "I care about pixels. And about the *feeling* they leave behind.",
  "The best ideas begin with *questions.*",
  "Create more. Consume *less.*",
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
  /** Optional: a video preview (muted loop) used instead of the image */
  video?: string;
  /** Detail page route, e.g. "/work/beehelp" */
  href: string;
  /**
   * Detail page content (reference: herostudios.tv/work/mcdonalds):
   * tagline under the title, intro paragraph, themed sections, and a
   * media list rendered between sections (.mp4 -> video loop).
   * >>> All copy below is a DRAFT for Valeriya to rewrite.
   * >>> Replace placeholder() media with real assets in /media/projects/.
   */
  detail: {
    tagline: string;
    intro: string;
    /** Full-width case video under the intro. >>> Valeriya drops the file
     *  into /media/projects/ and sets the path; null shows a placeholder. */
    caseVideo: string | null;
    /**
     * Optional media under a section: 1 image = beside the text,
     * several = grid below it. "ph" entries render as designed
     * placeholder slots (>>> swap for real paths when images arrive).
     * `layout` picks the arrangement: full | wide | grid3 | duo |
     * duo-landscape | asym | portrait-center
     */
    sections: {
      heading: string;
      body: string;
      media?: string[];
      layout?: string;
    }[];
  };
};

export const projects: Project[] = [
  {
    id: "beehelp",
    title: "Beehelp",
    category: "Digital Product / Interaction Design",
    year: "2025",
    description:
      "A neighborhood help app with a playful visual language and social purpose.",
    image: "/media/projects/beehelp.png",
    href: "/work/beehelp",
    detail: {
      tagline: "ASK • HELP • CONNECT",
      caseVideo: "https://www.youtube.com/watch?v=ubCjt1czuHE&t=3s",
      intro:
        "A neighborhood help app that makes asking for help as easy as offering it — a digital product with a playful visual language and a social purpose at its core.",
      sections: [
        {
          heading: "The Idea",
          body: "Asking for help is hard — harder than offering it. Beehelp lowers that barrier: neighbors post small requests, others pick them up, and a neighborhood quietly becomes a network.",
          media: ["/media/projects/beehelp.png"],
        },
        {
          heading: "The System",
          body: "A friendly, rounded interface language with expressive icons and warm micro-interactions. Every screen is built from one system, so the app feels like one hand drew it.",
          layout: "grid3",
          media: ["ph", "ph", "ph"],
        },
        {
          heading: "The Feeling",
          body: "Helping should feel light, not bureaucratic. The tone, motion and illustration keep it human — closer to a favor between neighbors than a service transaction.",
          layout: "full",
          media: ["ph"],
        },
      ],
    },
  },
  {
    id: "femira",
    title: "Femira",
    category: "Brand / Digital / Campaign",
    year: "2026",
    description:
      "A sensitive and strategic design project around women's health and communication.",
    image: "/media/projects/femira.png",
    href: "/work/femira",
    detail: {
      tagline: "HEALTH • DIGNITY • VOICE",
      caseVideo: "https://www.youtube.com/watch?v=dsNnbbcwZ4I",
      intro:
        "A sensitive and strategic design project around women's health — building a brand and campaign that speaks clearly about things people usually whisper about.",
      sections: [
        {
          heading: "The Challenge",
          body: "Women's health communication is either clinical or coy. Femira needed a voice that is direct without being cold, and warm without being cute.",
          media: ["/media/projects/femira.png"],
        },
        {
          heading: "The Identity",
          body: "A calm, confident visual system: honest typography, a grounded palette and imagery that treats its audience as adults.",
          layout: "duo",
          media: ["ph", "ph"],
        },
        {
          heading: "The Campaign",
          body: "Digital-first storytelling that meets people where they are — social formats that inform, normalize and invite conversation.",
          layout: "wide",
          media: ["ph"],
        },
      ],
    },
  },
  {
    id: "human",
    title: "You Know That You're a Human?",
    category: "Poetic Short Film / Visual Essay",
    year: "2026",
    description:
      "A small cinematic piece based on poetry, humanity and the feeling of being seen.",
    image: placeholder("human-film"),
    video: "/media/showreel.mp4",
    href: "/work/human",
    detail: {
      tagline: "POETRY • FILM • BEING SEEN",
      caseVideo: "/media/showreel.mp4",
      intro:
        "A small cinematic piece based on poetry, humanity and the feeling of being seen — a visual essay about what it means to notice and be noticed.",
      sections: [
        {
          heading: "The Poem",
          body: "The film grows out of a text about being human among humans — the words set the rhythm, the images answer them.",
        },
      ],
    },
  },
  {
    id: "kerasilk",
    title: "Kerasilk",
    category: "Website Redesign / Digital Design",
    year: "2024",
    description:
      "Website redesign focused on digital experience, structure and visual refinement.",
    image: "/media/projects/kerasilk.png",
    href: "/work/kerasilk",
    detail: {
      tagline: "STRUCTURE • REFINEMENT • FLOW",
      caseVideo: null,
      intro:
        "A website redesign focused on digital experience, structure and visual refinement — bringing a premium haircare brand's digital presence up to the standard of its products.",
      sections: [
        {
          heading: "The Status Quo",
          body: "A strong brand with a website that undersold it: unclear structure, inconsistent visuals, friction where there should be flow.",
          media: ["/media/projects/kerasilk.png"],
        },
        {
          heading: "The Redesign",
          body: "A clear information architecture, a calmer grid and typography that gives the products room to feel premium.",
          layout: "asym",
          media: ["ph", "ph"],
        },
        {
          heading: "The Details",
          body: "Micro-interactions, image treatment and spacing tuned until browsing feels as smooth as the brand promises.",
          layout: "full",
          media: ["ph"],
        },
      ],
    },
  },
  {
    id: "morphosis",
    title: "Morphosis",
    category: "Design Conception / Werkschau",
    year: "2026",
    description:
      "A visual system for a design exhibition, built around transformation and identity.",
    image: placeholder("morphosis"),
    video: "/media/projects/morphosis.mp4",
    href: "/work/morphosis",
    detail: {
      tagline: "TRANSFORMATION • IDENTITY • SYSTEM",
      caseVideo: "/media/projects/morphosis.mp4",
      intro:
        "A visual system for a design exhibition, built around transformation and identity — one identity that keeps changing shape without losing itself.",
      sections: [
        {
          heading: "The Concept",
          body: "Morphosis treats identity as a process, not a logo: the system is defined by how it transforms, not how it stays the same.",
        },
        {
          heading: "The System",
          body: "Type, grid and motion rules that bend across formats — poster, screen, space — while staying recognizably one thing.",
          layout: "grid3",
          media: ["ph", "ph", "ph"],
        },
        {
          heading: "The Exhibition",
          body: "Applied across the Werkschau: signage, screens and printed matter that turn the venue into part of the identity.",
          layout: "duo",
          media: ["ph", "ph"],
        },
      ],
    },
  },
  {
    id: "jardin",
    title: "Jardin de la Crimée",
    category: "Concept Website / Personal Project",
    year: "2025",
    description:
      "A fictional website for a Crimean winery. A personal promise: if Crimea returns to Ukraine, I will design a real website for a winery there — for free.",
    image: "/media/projects/jardin.jpg",
    href: "/work/jardin",
    detail: {
      tagline: "WINE • MEMORY • PROMISE",
      caseVideo: null,
      intro:
        "A fictional website for a Crimean winery — and a personal promise: if Crimea returns to Ukraine, I will design a real website for a winery there, for free.",
      sections: [
        {
          heading: "The Promise",
          body: "Some projects are briefs, this one is a vow. Jardin de la Crimee imagines the digital presence of a winery that exists in memory and in the future at once.",
          media: ["/media/projects/jardin.jpg"],
        },
        {
          heading: "The Concept",
          body: "Elegance with an ache: golden type on darkness, tastings by invitation, a place described so precisely you can almost visit it.",
          layout: "portrait-center",
          media: ["ph"],
        },
        {
          heading: "The Design",
          body: "Editorial layouts, warm materials and restrained motion — luxury that behaves like patience.",
          layout: "duo-landscape",
          media: ["ph", "ph"],
        },
      ],
    },
  },
  {
    id: "next-stop",
    title: "Next Stop",
    category: "Short Film / Experimental Video",
    year: "2025",
    description:
      "A film about metro systems in Ukraine and Germany, with a drone-like, observational aesthetic.",
    image: placeholder("next-stop"),
    video: "/media/projects/next-stop.mp4",
    href: "/work/next-stop",
    detail: {
      tagline: "METRO • UKRAINE • GERMANY",
      caseVideo: "/media/projects/next-stop.mp4",
      intro:
        "A film about metro systems in Ukraine and Germany — a drone-like, observational study of two countries seen through the spaces where everyone is just passing through.",
      sections: [
        {
          heading: "The Observation",
          body: "No interviews, no narration. The camera watches stations, trains and people the way a commuter does — half-awake, all-seeing.",
        },
        {
          heading: "Two Systems",
          body: "Kyiv's palatial depths against German functionalism: two infrastructures, two histories, one shared choreography of waiting and moving.",
          layout: "wide",
          media: ["ph"],
        },
        {
          heading: "The Aesthetic",
          body: "Steady frames, long takes, ambient sound. The film trusts the places to speak — and they do.",
          layout: "grid3",
          media: ["ph", "ph", "ph"],
        },
      ],
    },
  },
];

/* -------------------------------------------------------------- CONTACT -- */

/**
 * Mouse-trail slideshow in the contact section: images spawn behind the
 * cursor and dissolve like a trace. More images? Drop them into
 * /public/media/trail/ and add them here.
 */
export const trailImages = [
  "/media/trail/trail-1.webp",
  "/media/trail/trail-2.webp",
  "/media/trail/trail-3.webp",
  "/media/trail/trail-4.webp",
  "/media/trail/trail-5.webp",
  "/media/trail/trail-6.webp",
  "/media/trail/trail-7.webp",
];

export const contact = {
  signLines: ["This is", "your sign"],
  sub: ["To say hi.", "To finally start that project.", "Or whatever you needed a sign for. <3"],
  email: "valeriyaritz@gmail.com",
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/valeriya-ritz-919bba200/",
  },
  instagram: {
    label: "Instagram",
    href: "https://instagram.com/valeriyacreates",
  },
  telegram: {
    label: "Telegram",
    href: "https://t.me/valeriyasmood",
  },
  phones: [{ label: "+49 179 461 97 65", href: "tel:+491794619765" }],
};
