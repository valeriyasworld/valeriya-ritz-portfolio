"use client";

/**
 * 02 — INTRO / POSITIONING
 * One statement, nothing else. Words fade in as the section scrolls
 * through the viewport. No inline media — the work does the showing.
 */

import { intro } from "@/lib/content";
import { ScrollWords } from "./ui";

export default function Intro() {
  return (
    <section id="intro" className="bg-white px-5 py-32 md:px-10 md:py-48">
      <div className="max-w-5xl md:ml-[8vw]">
        <ScrollWords
          text={intro.statement}
          className="statement !text-[clamp(2rem,4.2vw,4.2rem)] !leading-[1.16]"
        />
      </div>
    </section>
  );
}
