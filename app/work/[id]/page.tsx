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

        {/* 3 — sections: label on top, big serif text, media beside/below */}
        {detail.sections.map((section) => {
          const media = section.media ?? [];
          const single = media.length === 1;
          return (
            <section key={section.heading} className="mt-20 md:mt-28">
              <span className="micro text-grey">{section.heading}</span>
              <div
                className={`mt-6 ${
                  single ? "grid gap-10 md:grid-cols-2 md:gap-16" : ""
                }`}
              >
                <p className="max-w-2xl font-display text-2xl leading-[1.12] tracking-tight md:text-4xl">
                  {section.body}
                </p>
                {single && (
                  <Media
                    src={media[0]}
                    alt={`${project.title} — ${section.heading}`}
                  />
                )}
              </div>
              {media.length > 1 && (
                <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                  {media.map((src) => (
                    <Media
                      key={src}
                      src={src}
                      alt={`${project.title} — ${section.heading}`}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* 4 — prev / next projects */}
        <nav
          aria-label="More projects"
          className="mt-24 flex items-baseline justify-between gap-6 md:mt-36"
        >
          <Link href={prev.href} className="group max-w-[45%]">
            <span className="micro block text-grey">← Previous</span>
            <span className="link-line mt-2 inline-block font-display text-2xl tracking-tight md:text-4xl">
              {prev.title}
            </span>
          </Link>
          <Link href={next.href} className="group max-w-[45%] text-right">
            <span className="micro block text-grey">Next →</span>
            <span className="link-line mt-2 inline-block font-display text-2xl tracking-tight md:text-4xl">
              {next.title}
            </span>
          </Link>
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
