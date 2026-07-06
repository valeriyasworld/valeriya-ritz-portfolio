"use client";

/**
 * 03 — ABOUT ME
 * Not a CV. A narrative: how each step changed the way of thinking.
 * Sticky heading left, story + timeline right.
 * Hovering a timeline entry reveals a little slideshow with memories from
 * that place (cycling every second). Entries without memories (the future)
 * show nothing.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about } from "@/lib/content";
import { Em, EASE, Reveal } from "./ui";

type TimelineStep = (typeof about.timeline)[number];

function TimelineEntry({ step }: { step: TimelineStep }) {
  const [hovered, setHovered] = useState(false);
  const [slide, setSlide] = useState(0);
  const hasMemories = step.memories.length > 0;

  // preload the photos once so the flashbacks never show an empty frame
  useEffect(() => {
    step.memories.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [step.memories]);

  // flashback mode: recap-fast cuts, like remembering
  useEffect(() => {
    if (!hovered || !hasMemories) return;
    const id = setInterval(() => setSlide((s) => s + 1), 180);
    return () => clearInterval(id);
  }, [hovered, hasMemories]);

  return (
    <li
      className="relative py-10 first:pt-0 md:py-12"
      onMouseEnter={() => {
        setHovered(true);
        setSlide(0);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl tracking-tight md:text-4xl">
          {step.title}{" "}
          <a
            href={step.org.href}
            target="_blank"
            rel="noreferrer"
            className="link-line"
          >
            {step.org.label}
          </a>
        </h3>
        <span className="micro shrink-0 text-grey">{step.period}</span>

        {/* memory flashbacks — top-aligned with the heading, desktop only */}
        {hasMemories && (
          <div className="pointer-events-none absolute right-full top-0 z-20 mr-8 hidden w-[13vw] max-w-[220px] lg:block">
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [...EASE] }}
                  className="relative aspect-[3/4] overflow-hidden bg-black shadow-xl"
                >
                  {/* modern recap flashbacks: the outgoing photo collapses
                      into the center while the next one settles in behind it */}
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={slide % step.memories.length}
                      src={step.memories[slide % step.memories.length]}
                      alt={`${step.org.label} — memory`}
                      initial={{ scale: 1.14 }}
                      animate={{ scale: 1, zIndex: 1 }}
                      exit={{ scale: 0.4, opacity: 0, zIndex: 2 }}
                      transition={{ duration: 0.18, ease: [...EASE] }}
                      className="absolute inset-0 h-full w-full object-cover grayscale"
                    />
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <p className="micro mt-3 text-grey">{step.dates}</p>
      <p className="mt-3 text-sm text-grey md:text-base">{step.what}</p>
      <p className="font-display mt-5 text-lg leading-snug md:text-xl">
        {step.changed}
      </p>
    </li>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-white px-5 pb-32 md:px-10 md:pb-48">
      <div className="grid gap-12 md:grid-cols-12">
        {/* sticky narrative heading */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <h2 className="statement !text-[clamp(2.2rem,5.5vw,5rem)]">
                <Em text={about.heading} />
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 max-w-sm space-y-5">
              {about.personal.map((p, i) => (
                <p key={i} className="text-base leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="micro pt-2 text-grey">{about.currently}</p>
            </Reveal>
          </div>
        </div>

        {/* timeline — each step ends with what it changed */}
        <div className="md:col-span-6 md:col-start-7">
          <ol>
            {about.timeline.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <TimelineEntry step={step} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
