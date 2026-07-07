"use client";

/**
 * PHOTO STRIP — a slow, endless film strip of real moments (color!) that
 * breaks up the typographic stretch between the intro and the skills.
 * Same seamless marquee trick as the skills rows: the track holds the
 * list twice and slides by half its width.
 */

import { stripImages } from "@/lib/content";

function Strip() {
  return (
    <>
      {stripImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-40 w-auto shrink-0 object-cover md:h-56"
        />
      ))}
    </>
  );
}

export default function PhotoStrip() {
  return (
    <section className="overflow-hidden bg-white pb-24 md:pb-32">
      <div className="marquee-slow flex w-max gap-3 md:gap-4">
        <Strip />
        <Strip />
      </div>
    </section>
  );
}
