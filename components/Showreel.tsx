"use client";

/**
 * 01 — OPENING SHOWREEL
 * Full-screen, black, cinematic. The work speaks first; explanation comes
 * after. Only minimal interface elements sit on top of the reel.
 *
 * >>> REPLACE ME: to activate the real showreel, set `videoSrc` in
 * lib/content.ts to "/media/showreel.mp4" (drop the file into /public/media).
 * The designed placeholder below disappears automatically.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { showreel } from "@/lib/content";
import { EASE } from "./ui";

export default function Showreel() {
  const ref = useRef<HTMLElement>(null);
  // hero parallax: the reel drifts slower than the page while scrolling away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reelY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={ref}
      id="showreel"
      className="relative flex h-[100svh] flex-col justify-between overflow-hidden bg-black text-white"
    >
      {/* the page's single h1 — visually the reel speaks, semantically this does */}
      <h1 className="sr-only">Valeriya Ritz — Portfolio 2026</h1>
      {/* ---- reel layer ---------------------------------------------------- */}
      {showreel.videoSrc ? (
        <motion.video
          style={{ y: reelY }}
          className="absolute inset-0 h-full w-full object-cover"
          src={showreel.videoSrc}
          poster={showreel.posterSrc ?? undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        /* placeholder while no video exists: slow-breathing frame + play mark */
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [...EASE] }}
            className="absolute inset-4 flex items-center justify-center border border-white/20 md:inset-8"
          >
            <motion.span
              animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 md:h-20 md:w-20"
            >
              {/* play triangle */}
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
                <path d="M1 1.5v17l16-8.5L1 1.5z" stroke="white" strokeWidth="1" />
              </svg>
            </motion.span>
            <span className="micro absolute bottom-4 left-4 text-white/40">
              Showreel — coming soon
            </span>
            <span className="micro absolute right-4 top-4 text-white/40">
              00:00 / 01:26
            </span>
          </motion.div>
        </div>
      )}

      {/* subtle vignette so the interface stays readable over any footage */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

      {/* ---- top spacer (fixed nav sits here) ------------------------------ */}
      <div />

      {/* ---- bottom strip --------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 flex justify-center pb-6 md:pb-8"
      >
        {/* tiny scroll hint — the only interface element besides nav + logo */}
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
