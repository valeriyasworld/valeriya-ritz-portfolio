"use client";

/**
 * 05 — SELECTED WORK
 * Desktop: project list on the left, sticky visual preview on the right that
 * crossfades on hover (structural reference: Hero Studios).
 * Mobile: stacked cards with the image on top.
 *
 * Clicking a project currently scrolls nowhere (href="#work" placeholder) —
 * >>> later, point each project's `href` in lib/content.ts to a detail page.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/content";
import { EASE, Reveal, SectionHead } from "./ui";

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="bg-white px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="04" label="Selected Work" />

      {/* ---------- desktop: list + sticky preview ------------------------- */}
      <div className="hidden gap-12 md:grid md:grid-cols-12">
        <ul className="md:col-span-7" onMouseLeave={() => setActive(active)}>
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <li className="border-t border-line last:border-b">
                <a
                  href={p.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-6 py-7 transition-colors duration-300"
                >
                  <span className="micro w-8 shrink-0 text-grey">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-3xl font-bold uppercase leading-none tracking-tight transition-all duration-300 ease-editorial lg:text-4xl ${
                      active === i ? "translate-x-3" : "text-black"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="ml-auto shrink-0 text-right">
                    <span className="micro block text-grey">{p.category}</span>
                    <span className="micro block text-grey/60">{p.year}</span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* sticky crossfading preview */}
        <div className="md:col-span-5">
          <div className="sticky top-28">
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={projects[active].id}
                  src={projects[active].image}
                  alt={`${projects[active].title} — preview`}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [...EASE] }}
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />
              </AnimatePresence>
              <span className="micro absolute bottom-3 left-3 z-10 bg-black px-2 py-1 text-white">
                {projects[active].title}
              </span>
            </div>
            <motion.p
              key={projects[active].id + "-desc"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [...EASE] }}
              className="mt-5 max-w-md text-sm leading-relaxed text-grey"
            >
              {projects[active].description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ---------- mobile: stacked cards ----------------------------------- */}
      <div className="space-y-14 md:hidden">
        {projects.map((p, i) => (
          <Reveal key={p.id}>
            <a href={p.href} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={p.image}
                  alt={`${p.title} — preview`}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-bold uppercase leading-none tracking-tight">
                  {p.title}
                </h3>
                <span className="micro shrink-0 text-grey">{p.year}</span>
              </div>
              <p className="micro mt-2 text-grey">{p.category}</p>
              <p className="mt-3 text-sm leading-relaxed text-grey">
                {p.description}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
