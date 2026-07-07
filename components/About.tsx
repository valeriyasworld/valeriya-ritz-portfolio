"use client";

/**
 * 03 — ABOUT ME (homepage)
 * Just one centered invitation right after the intro statement:
 * Experience & Education → /about (the full timeline lives there).
 */

import Link from "next/link";
import { Reveal } from "./ui";

export default function About() {
  return (
    <section id="about" className="bg-white px-5 pb-32 md:px-10 md:pb-44">
      <Reveal className="text-center">
        <Link
          href="/about"
          className="group inline-flex items-baseline gap-4 font-display text-3xl tracking-tight md:text-5xl"
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
    </section>
  );
}
