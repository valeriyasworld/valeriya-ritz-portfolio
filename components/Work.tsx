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
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/content";
import { EASE, Reveal } from "./ui";

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [cardTop, setCardTop] = useState(0);

  const onEnter = (i: number) => (e: React.SyntheticEvent<HTMLElement>) => {
    setActive(i);
    // vertically align the image card with the hovered project name
    const row = e.currentTarget;
    setCardTop(row.offsetTop + row.offsetHeight / 2);
  };

  return (
    <section id="work" className="bg-white px-5 py-28 md:px-10 md:py-40">
      {/* ---------- desktop: name list + floating hover card ---------------- */}
      <div className="relative hidden md:block">
        <ul
          ref={listRef}
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
                    onMouseEnter={onEnter(i)}
                    onFocus={onEnter(i)}
                    className="group block py-5"
                  >
                    <span className="flex items-center gap-5">
                      {/* arrow slides in on hover */}
                      <span
                        aria-hidden
                        className={`font-display text-3xl transition-all duration-300 ease-editorial lg:text-4xl ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
                        }`}
                      >
                        →
                      </span>
                      <span
                        className={`font-display text-5xl leading-[1.1] tracking-tight transition-all duration-300 ease-editorial lg:text-6xl ${
                          isActive
                            ? "-translate-x-0 text-black"
                            : dimmed
                            ? "text-black/15"
                            : "text-black/30"
                        } ${!isActive ? "-ml-12" : ""}`}
                      >
                        {p.title}
                      </span>
                    </span>
                    {/* meta line under the active name */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [...EASE] }}
                          className="micro block overflow-hidden pl-[3.75rem] pt-2 text-grey"
                        >
                          {p.category.replaceAll("/", "·")} · {p.year}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </a>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* floating image card, aligned with the hovered project */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 3, top: cardTop }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [...EASE] }}
              className="pointer-events-none absolute right-0 z-20 hidden w-[38vw] max-w-[560px] -translate-y-1/2 lg:block"
              style={{ top: cardTop }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black shadow-2xl">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={projects[active].id}
                    src={projects[active].image}
                    alt={`${projects[active].title} — preview`}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [...EASE] }}
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- mobile: stacked cards ----------------------------------- */}
      <div className="space-y-14 md:hidden">
        {projects.map((p) => (
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
