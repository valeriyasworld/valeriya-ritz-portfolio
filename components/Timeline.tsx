"use client";

/**
 * Full experience & education timeline — lives on the /about subpage where
 * it has room to breathe: every entry fully visible, no accordion.
 * Hovering an entry still triggers the memory flashbacks (desktop).
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about } from "@/lib/content";
import { EASE, Reveal } from "./ui";

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
      className="relative py-9 first:pt-0 md:py-11"
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

        {/* memory flashbacks — desktop only */}
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
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={slide % step.memories.length}
                      src={step.memories[slide % step.memories.length]}
                      alt={`${step.org.label} — memory`}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1, zIndex: 1 }}
                      exit={{ scale: 0.92, opacity: 0, zIndex: 2 }}
                      transition={{ duration: 0.18, ease: [...EASE] }}
                      className="absolute inset-0 h-full w-full object-cover"
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
    </li>
  );
}

export default function Timeline() {
  return (
    <ol>
      {about.timeline.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.04}>
          <TimelineEntry step={step} />
        </Reveal>
      ))}
    </ol>
  );
}
