"use client";

/**
 * 02 — INTRO / POSITIONING
 * Hero-style editorial statement: sentence-case Nyght, left-aligned with a
 * generous margin, words fading in one by one while scrolling.
 */

import { intro } from "@/lib/content";
import { Reveal, ScrollWords } from "./ui";

export default function Intro() {
  return (
    <section id="intro" className="bg-white px-5 py-32 md:px-10 md:py-48">
      <div className="max-w-5xl md:ml-[10vw]">
        <ScrollWords
          text={`${intro.statementA} ${intro.statementB}`}
          className="statement !text-[clamp(2.3rem,5vw,5.2rem)] !leading-[1.12]"
        />

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="text-base leading-relaxed text-black md:text-lg">
              {intro.sub}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="micro leading-loose text-grey">{intro.tagline}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
