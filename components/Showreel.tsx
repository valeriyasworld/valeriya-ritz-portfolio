"use client";

/**
 * 01 — HERO
 * The showreel is gone (2026-08). For now: a clean black stage with just
 * the scroll hint — >>> new hero content TBD (Valeriya: "другая чача").
 */

import { motion } from "framer-motion";

export default function Showreel() {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] flex-col justify-between overflow-hidden bg-black text-white"
    >
      {/* the page's single h1 — semantically present, visually quiet */}
      <h1 className="sr-only">Valeriya Ritz — Portfolio 2026</h1>

      <div />

      {/* bottom strip: only the scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <span className="micro flex flex-col items-center gap-2 text-white/60">
          scroll
          <motion.span
            animate={{ scaleY: [0.2, 1, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px origin-top bg-white/60"
          />
        </span>
      </motion.div>
    </section>
  );
}
