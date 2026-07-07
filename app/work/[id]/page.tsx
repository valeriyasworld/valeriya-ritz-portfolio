import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

/**
 * /work/[id] — PROJECT DETAIL PAGE
 * Structural reference: herostudios.tv/work/mcdonalds —
 * title + tagline, intro paragraph, themed sections with large media
 * in between, prev/next project navigation, mini footer.
 * All content comes from each project's `detail` block in lib/content.ts.
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
  const [heroMedia, ...restMedia] = detail.media;

  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-6 md:px-10">
      {/* minimal header: signature = back home, direct way back to the list */}
      <header className="flex items-center justify-between">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo.png"
            alt="Valeriya Ritz"
            className="h-11 w-auto md:h-12"
          />
        </Link>
        <Link href="/#work" className="micro link-line">
          ← Work
        </Link>
      </header>

      <article className="mx-auto mt-16 max-w-5xl md:mt-24">
        {/* title + tagline (Hero-style) */}
        <h1 className="statement !text-[clamp(2.8rem,8vw,7.5rem)]">
          {project.title}
        </h1>
        <p className="micro mt-4 text-grey">{detail.tagline}</p>

        {/* intro */}
        <p className="mt-12 max-w-3xl text-lg leading-relaxed md:mt-16 md:text-2xl">
          {detail.intro}
        </p>

        {/* hero media */}
        <div className="mt-14 md:mt-20">
          <Media src={heroMedia} alt={`${project.title} — cover`} />
        </div>

        {/* themed sections, large media woven in between */}
        {detail.sections.map((section, i) => (
          <section key={section.heading} className="mt-16 md:mt-24">
            <div className="grid gap-6 md:grid-cols-12">
              <h2 className="font-display text-3xl tracking-tight md:col-span-4 md:text-4xl">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-grey md:col-span-7 md:col-start-6 md:text-lg">
                {section.body}
              </p>
            </div>
            {restMedia[i] && (
              <div className="mt-14 md:mt-20">
                <Media
                  src={restMedia[i]}
                  alt={`${project.title} — ${section.heading}`}
                />
              </div>
            )}
          </section>
        ))}

        {/* prev / next projects */}
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
