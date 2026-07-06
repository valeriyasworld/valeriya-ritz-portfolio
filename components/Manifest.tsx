"use client";

/**
 * 04 — MANIFEST
 * Horizontal slider, one statement per slide. Inverted to black for a
 * cinematic pause between the white sections. Native scroll-snap (works
 * with trackpad/touch) plus arrow controls and a counter.
 */

import { useRef, useState } from "react";
import { manifest } from "@/lib/content";
import { Em, Reveal } from "./ui";

export default function Manifest() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const slideTo = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    track.scrollBy({ left: dir * slide.offsetWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    setIndex(Math.round(track.scrollLeft / slide.offsetWidth));
  };

  return (
    <section id="manifest" className="bg-black py-28 text-white md:py-40">
      <Reveal className="mb-16 flex items-baseline justify-between border-t border-white/20 px-5 pt-4 md:mb-24 md:px-10">
        <span className="micro text-white/50">( 03 )</span>
        <span className="micro">Manifest</span>
      </Reveal>

      {/* slides */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {manifest.map((statement, i) => (
          <div
            key={i}
            className="flex w-[86vw] shrink-0 snap-center flex-col justify-center px-5 md:w-[72vw] md:px-16"
          >
            <span className="micro mb-8 text-white/40">
              {String(i + 1).padStart(2, "0")} / {String(manifest.length).padStart(2, "0")}
            </span>
            <p className="statement !text-[clamp(1.9rem,5.5vw,5.2rem)] !leading-[1.02]">
              <Em text={statement} />
            </p>
          </div>
        ))}
        {/* trailing breathing space */}
        <div className="w-[14vw] shrink-0 md:w-[28vw]" />
      </div>

      {/* controls */}
      <div className="mt-16 flex items-center justify-between px-5 md:mt-24 md:px-10">
        <span className="micro text-white/40">
          drag / scroll <span aria-hidden>→</span>
        </span>
        <div className="flex items-center gap-6">
          <span className="micro tabular-nums text-white/60">
            {String(index + 1).padStart(2, "0")} —{" "}
            {String(manifest.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => slideTo(-1)}
            aria-label="Previous statement"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-black"
          >
            ←
          </button>
          <button
            onClick={() => slideTo(1)}
            aria-label="Next statement"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-black"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
