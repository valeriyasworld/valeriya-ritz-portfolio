"use client";

/**
 * 03 — ABOUT ME (homepage)
 * Short and personal: heading, two narrative paragraphs and a pointer to
 * the /about subpage that carries the full experience & education timeline.
 */

import Link from "next/link";
import { about } from "@/lib/content";
import { Em, Reveal } from "./ui";

export default function About() {
  return (
    <section id="about" className="bg-white px-5 pb-32 md:px-10 md:pb-48">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="statement !text-[clamp(2.2rem,5.5vw,5rem)]">
              <Em text={about.heading} />
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.1} className="space-y-5">
            {about.personal.map((p, i) => (
              <p key={i} className="text-base leading-relaxed md:text-lg">
                {p}
              </p>
            ))}
          </Reveal>

          {/* pointer to the full career/education page */}
          <Reveal delay={0.2} className="mt-12">
            <Link
              href="/about"
              className="group inline-flex items-baseline gap-3 font-display text-2xl tracking-tight md:text-3xl"
            >
              <span className="link-line">
                Experience <em className="serif">&amp;</em> Education
              </span>
              <span
                aria-hidden
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
