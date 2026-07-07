"use client";

/**
 * Fixed minimal navigation.
 * Desktop: inline links, white via mix-blend-difference (invert on white).
 * Mobile: burger button opens a black drawer sliding in from the right
 * (reference: Hero Studios mobile menu) — big Nyght items, staggered in.
 * The drawer lives OUTSIDE the blended header, otherwise the blend mode
 * would invert its colors.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/content";
import { EASE } from "./ui";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // lock page scroll while the drawer is open; Escape closes it
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav className="flex items-center justify-between px-5 py-5 text-white md:px-10">
          {/* handwritten signature logo — inverted (white strokes on black)
              so the header's mix-blend-difference renders it correctly on
              both the black showreel and the white sections */}
          <a href="#showreel" className="pointer-events-auto">
            <img
              src="/media/logo.png"
              alt="Valeriya Ritz"
              className="h-11 w-auto invert md:h-12"
            />
          </a>

          {/* desktop links */}
          <ul className="pointer-events-auto hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="micro link-line opacity-70 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* mobile burger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="pointer-events-auto flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <span className="block h-px w-7 bg-white" />
            <span className="block h-px w-7 bg-white" />
          </button>
        </nav>
      </header>

      {/* mobile drawer — outside the blended header */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* dimmed backdrop, tap to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40"
            />

            {/* panel sliding in from the right */}
            <motion.nav
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [...EASE] }}
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col justify-between bg-black px-8 py-6 text-white"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center text-2xl"
                >
                  ×
                </button>
              </div>

              <ul className="flex flex-col gap-7">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + i * 0.07,
                      ease: [...EASE],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-5xl tracking-tight"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <span />
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
