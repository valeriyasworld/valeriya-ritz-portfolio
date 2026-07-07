import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

/**
 * /work/[id] — PROJECT DETAIL PAGE
 * Layout copied from herostudios.tv/work/mcdonalds:
 *   1. Title left — tagline + big serif intro right
 *   2. Full-width case video (placeholder frame until Valeriya adds it)
 *   3. Sections: micro label on top, big serif paragraph; one image sits
 *      beside the text, several images form a grid below it
 *   4. Prev/next projects, mini footer
 */

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return {};
  return {
    title: `${project.title} — Valeriya Ritz`,
    description: project.description,
  };
}

/** .mp4 renders as a muted loop, everything else as an image */
function Media({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith(".mp4")) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full bg-black"
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className="w-full bg-black" />;
}

/**
 * Section media layouts — every subpage arranges its images differently.
 * "ph" entries render as quiet placeholder slots until real assets land.
 */
const LAYOUTS: Record<
  string,
  { wrap: string; tile: string; aspect: string }
> = {
  full: { wrap: "grid-cols-1", tile: "", aspect: "aspect-video" },
  wide: { wrap: "grid-cols-1", tile: "", aspect: "aspect-[21/9]" },
  grid3: { wrap: "grid-cols-2 sm:grid-cols-3", tile: "", aspect: "aspect-square" },
  duo: { wrap: "grid-cols-2", tile: "", aspect: "aspect-[3/4]" },
  "duo-landscape": { wrap: "grid-cols-2", tile: "", aspect: "aspect-[16/10]" },
  asym: {
    wrap: "md:grid-cols-3",
    tile: "first:md:col-span-2",
    aspect: "aspect-[4/3]",
  },
  "portrait-center": {
    wrap: "grid-cols-1 justify-items-center",
    tile: "w-full max-w-md",
    aspect: "aspect-[3/4]",
  },
};

function Tile({
  src,
  alt,
  aspect,
  className,
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
}) {
  if (src === "ph") {
    return (
      <div
        className={`flex ${aspect} items-center justify-center border border-line bg-[#F4F4F4] ${className ?? ""}`}
      >
        <span className="micro text-grey">( image )</span>
      </div>
    );
  }
  return (
    <div className={`${aspect} overflow-hidden bg-black ${className ?? ""}`}>
      {src.endsWith(".mp4") ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      )}
    </div>
  );
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const index = projects.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();

  const project = projects[index];
  const { detail } = project;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-6 md:px-10">
      {/* minimal header: signature = back home */}
      <header className="flex items-center justify-between">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo.png"
            alt="Valeriya Ritz"
            className="h-11 w-auto md:h-12"
          />
        </Link>
      </header>

      <article className="mt-16 md:mt-24">
        <Link href="/#work" className="micro link-line">
          ← Work
        </Link>

        {/* 1 — title left, tagline + big serif intro right (Hero layout) */}
        <div className="mt-6 grid gap-10 md:mt-8 md:grid-cols-2 md:gap-16">
          <h1 className="statement !text-[clamp(2.8rem,6.5vw,6.5rem)]">
            {project.title}
          </h1>
          <div>
            <p className="micro text-grey">{detail.tagline}</p>
            <p className="mt-6 font-display text-2xl leading-[1.12] tracking-tight md:text-4xl">
              {detail.intro}
            </p>
          </div>
        </div>

        {/* 2 — full-width case video */}
        <div className="mt-16 md:mt-24">
          {detail.caseVideo ? (
            <video
              src={detail.caseVideo}
              controls
              playsInline
              preload="metadata"
              className="w-full bg-black"
            />
          ) : (
            /* >>> placeholder until the case video lands in /media/projects/ */
            <div className="flex aspect-video w-full items-center justify-center border border-line bg-black">
              <span className="micro text-white/60">
                Case video — coming soon
              </span>
            </div>
          )}
        </div>

        {/* 3 — sections: label on top, big serif text, media beside/below.
               Single-image sections alternate sides: even = image right,
               odd = image left (Hero does the same for variety). */}
        {detail.sections.map((section, i) => {
          const media = section.media ?? [];
          const layout = section.layout ? LAYOUTS[section.layout] : null;
          const beside = !layout && media.length === 1;
          const imageLeft = beside && i % 2 === 1;
          return (
            <section key={section.heading} className="mt-20 md:mt-28">
              <div
                className={
                  beside ? "grid gap-10 md:grid-cols-2 md:gap-16" : ""
                }
              >
                {imageLeft && (
                  <Media
                    src={media[0]}
                    alt={`${project.title} — ${section.heading}`}
                  />
                )}
                <div>
                  <span className="micro text-grey">{section.heading}</span>
                  <p className="mt-6 max-w-2xl font-display text-2xl leading-[1.12] tracking-tight md:text-4xl">
                    {section.body}
                  </p>
                </div>
                {beside && !imageLeft && (
                  <Media
                    src={media[0]}
                    alt={`${project.title} — ${section.heading}`}
                  />
                )}
              </div>
              {/* layout-driven media arrangement — different on every page */}
              {layout && media.length > 0 && (
                <div
                  className={`mt-12 grid gap-4 md:gap-6 ${layout.wrap}`}
                >
                  {media.map((src, j) => (
                    <Tile
                      key={`${section.heading}-${j}`}
                      src={src}
                      alt={`${project.title} — ${section.heading}`}
                      aspect={layout.aspect}
                      className={layout.tile}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* 4 — prev / next projects, Hero-style: hairlines above and below,
               small preview thumbnail next to each big serif name */}
        <nav
          aria-label="More projects"
          className="mt-24 grid gap-2 border-y border-line py-10 md:mt-36 md:grid-cols-2 md:gap-10 md:py-14"
        >
          {[prev, next].map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`group flex items-center gap-6 ${
                i === 1 ? "md:justify-end" : ""
              }`}
            >
              {/* thumbnail only when a real asset exists */}
              {p.image.startsWith("/media") && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt=""
                  aria-hidden
                  className="h-16 w-24 shrink-0 object-cover md:h-20 md:w-32"
                />
              )}
              <span className="min-w-0">
                <span className="micro block text-grey">
                  {i === 0 ? "← Previous" : "Next →"}
                </span>
                <span className="link-line mt-1 inline-block font-display text-2xl leading-tight tracking-tight md:text-4xl">
                  {p.title}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </article>

      {/* mini footer */}
      <footer className="mt-24 flex items-baseline justify-between md:mt-32">
        <span className="micro text-grey">
          Designed &amp; built by Valeriya Ritz © 2026
        </span>
        <Link href="/#contact" className="micro link-line">
          Say hi
        </Link>
      </footer>
    </main>
  );
}
