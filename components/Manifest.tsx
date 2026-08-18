"use client";

/**
 * 04 — MANIFEST
 * Three statements, stacked, quiet. No slider, no counters, no arrows —
 * the words carry it.
 */

import { manifest } from "@/lib/content";
import { Em, Reveal } from "./ui";

export default function Manifest() {
  return (
    <section id="manifest" className="bg-white px-5 py-32 md:px-10 md:py-48">
      <div className="max-w-5xl md:ml-[8vw]">
        {manifest.map((statement, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p className="statement mb-16 !text-[clamp(1.7rem,3.6vw,3.4rem)] !leading-[1.18] last:mb-0">
              <Em text={statement} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
