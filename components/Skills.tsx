"use client";

/**
 * SKILLS MARQUEES — "( Soft & Hard Skills )" label, then two rows of big
 * Nyght names: hard skills (tools) glide left, soft skills glide right at
 * the same speed, in italic — direction and voice tell them apart.
 * Each track holds its list twice and the CSS animation moves it by exactly
 * half its width, so the loops are seamless. Speed lives in globals.css
 * (.marquee-track / .marquee-track-reverse, currently 32s per loop).
 */

import { hardSkills, skillsLabel, softSkills } from "@/lib/content";
import { Reveal } from "./ui";

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((skill) => (
        <span key={skill} className="flex shrink-0 items-center">
          {/* generous leading so Nyght descenders (g, y, p) never get clipped */}
          <span className="font-display text-5xl leading-[1.35] tracking-tight md:text-7xl">
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

      {/* hard skills → left */}
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max">
          <Row items={hardSkills} />
          <Row items={hardSkills} />
        </div>
      </div>

      {/* soft skills → right, same type as row one */}
      <div className="mt-4 overflow-hidden md:mt-6">
        <div className="marquee-track-reverse flex w-max">
          <Row items={softSkills} />
          <Row items={softSkills} />
        </div>
      </div>
    </section>
  );
}
