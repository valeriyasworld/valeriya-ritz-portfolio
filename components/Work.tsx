"use client";

/**
 * 05 — SELECTED WORK  (structural reference: Hero Studios)
 * Desktop: only the project names are visible — big Nyght type, grey by
 * default. On hover the name turns black, an arrow slides in, a small meta
 * line appears underneath and the image card fades in next to the project.
 * Mobile: stacked cards (no hover on touch).
 *
 * >>> later: point each project's `href` in lib/content.ts to a detail page.
 */

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { EASE, Reveal } from "./ui";

/**
 * Mobile card media: video only mounts (and starts downloading) once the
 * card scrolls near the viewport — otherwise phones would fetch ~20MB of
 * video on page load. Until then the poster image shows.
 */
function MobileCardMedia({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "300px" });

  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden bg-black">
      {p.video && inView ? (
        <video
          src={p.video}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={p.image}
          alt={`${p.title} — preview`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="bg-white px-5 py-28 md:px-10 md:py-40">
      {/* ---------- desktop: name list + floating hover card ---------------- */}
      <div className="relative hidden md:block">
        <ul
          className="relative z-10 max-w-4xl"
          onMouseLeave={() => setActive(null)}
        >
          {projects.map((p, i) => {
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <Reveal key={p.id} delay={i * 0.04}>
                <li>
                  <a
                    href={p.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block py-4"
                  >
                    <span className="flex items-center gap-6">
                      {/* arrow fades in on hover */}
                      <span
                        aria-hidden
                        className={`w-12 shrink-0 font-display text-4xl transition-all duration-700 ease-editorial lg:w-16 lg:text-5xl ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-3 opacity-0"
                        }`}
                      >
                        →
                      </span>
                      {/* name glides right on hover (transform = smooth) */}
                      <span
                        className={`inline-block font-display text-[clamp(3.2rem,6.5vw,7rem)] leading-[1.05] tracking-tight transition-all duration-700 ease-editorial ${
                          isActive
                            ? "translate-x-0 text-black"
                            : dimmed
                            ? "-translate-x-[4.5rem] text-black/15 lg:-translate-x-[5.5rem]"
                            : "-translate-x-[4.5rem] text-black/30 lg:-translate-x-[5.5rem]"
                        }`}
                      >
                        {p.title}
                      </span>
                    </span>
                    {/* meta line: always occupies its height so rows never jump */}
                    <span
                      className={`micro block h-5 pl-[4.5rem] pt-1 text-grey transition-opacity duration-500 ease-editorial lg:pl-[5.5rem] ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {p.category.replaceAll("/", "·")} · {p.year}
                    </span>
                  </a>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* image card — fixed at the vertical center of the screen, so the
            preview is always in view no matter which project is hovered */}
        <AnimatePresence>
          {active !== null && (
            <div className="pointer-events-none fixed right-10 top-1/2 z-20 hidden w-[44vw] max-w-[680px] -translate-y-1/2 lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [...EASE] }}
                className="relative aspect-[16/10] overflow-hidden bg-black shadow-2xl">
                <AnimatePresence mode="popLayout">
                  {projects[active].video ? (
                    <motion.video
                      key={projects[active].id}
                      src={projects[active].video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [...EASE] }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <motion.img
                      key={projects[active].id}
                      src={projects[active].image}
                      alt={`${projects[active].title} — preview`}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [...EASE] }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- mobile: stacked cards ----------------------------------- */}
      <div className="space-y-14 md:hidden">
        {projects.map((p) => (
          <Reveal key={p.id}>
            <a href={p.href} className="block">
              <MobileCardMedia p={p} />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl leading-none tracking-tight">
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
