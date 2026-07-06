"use client";

/**
 * 02 — INTRO / POSITIONING
 * The moment the viewer understands the person behind the showreel.
 * The statement words fade in one by one while scrolling (ScrollWords).
 */

import { intro } from "@/lib/content";
import { Reveal, ScrollWords, SectionHead } from "./ui";

export default function Intro() {
  return (
    <section id="intro" className="bg-white px-5 pb-32 pt-24 md:px-10 md:pb-48 md:pt-32">
      <SectionHead index="01" label="Positioning" />

      <div className="mx-auto max-w-6xl">
        <ScrollWords text={intro.statementA} className="statement" />
        <ScrollWords
          text={intro.statementB}
          className="statement md:text-right"
        />

        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-2">
            <p className="text-base leading-relaxed text-black md:text-lg">
              {intro.sub}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-8">
            <p className="micro leading-loose text-grey">{intro.tagline}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
