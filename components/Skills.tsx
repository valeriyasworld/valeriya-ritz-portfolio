"use client";

/**
 * SKILLS MARQUEE — big Nyght tool names gliding slowly to the left,
 * "( Soft & Hard Skills )" label above (reference: Hero's clients strip).
 * The track holds the list twice, the CSS animation moves it by exactly
 * half its width, so the loop is seamless. Speed lives in globals.css
 * (.marquee-track, currently 32s per loop).
 */

import { skills, skillsLabel } from "@/lib/content";
import { Reveal } from "./ui";

function Row() {
  return (
    <>
      {skills.map((skill) => (
        <span key={skill} className="flex shrink-0 items-center">
          <span className="font-display text-5xl tracking-tight md:text-7xl">
            {skill}
          </span>
          <span
            aria-hidden
            className="mx-8 text-2xl text-grey md:mx-14 md:text-3xl"
          >
            ·
          </span>
        </span>
      ))}
    </>
  );
}

export default function Skills() {
  return (
    <section className="bg-white pb-32 md:pb-48">
      <Reveal className="mb-12 text-center md:mb-16">
        <span className="micro text-grey">{skillsLabel}</span>
      </Reveal>

      <div className="overflow-hidden">
        <div className="marquee-track flex w-max">
          {/* two copies = seamless loop */}
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
