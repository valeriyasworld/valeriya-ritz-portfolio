"use client";

/**
 * 02 — INTRO / POSITIONING
 * One big Hero-style flowing statement: sentence-case Nyght over four-ish
 * lines, left-aligned with a generous margin, words fading in one by one
 * while scrolling. No columns, no sub copy — the paragraph is the section.
 */

import { intro } from "@/lib/content";
import { ScrollWords } from "./ui";

export default function Intro() {
  return (
    <section id="intro" className="bg-white px-5 py-32 md:px-10 md:py-48">
      <div className="max-w-6xl md:ml-[8vw]">
        <ScrollWords
          text={intro.statement}
          className="statement !text-[clamp(2.1rem,4.6vw,4.8rem)] !leading-[1.14]"
        />
      </div>
    </section>
  );
}
