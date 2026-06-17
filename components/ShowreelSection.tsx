"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { showreelFrames } from "@/lib/data";

const INTRO = 0.2; // portion of scroll spent growing the portrait to fullscreen
const COUNT = showreelFrames.length;
const SEG = (1 - INTRO) / COUNT; // scroll share per frame in the reel
const FADE = SEG * 0.42; // crossfade overlap

/** Scroll window [fadeInStart, fullIn, fullOut, fadeOutEnd] for frame `i`. */
function windowStops(i: number): [number, number, number, number] {
  if (i === 0) {
    const e = INTRO + SEG;
    return [-0.001, 0, e, e + FADE];
  }
  const s = INTRO + i * SEG;
  const e = INTRO + (i + 1) * SEG;
  return [s - FADE, s, e, e + FADE];
}

/** One full-bleed frame that crossfades as the scrub passes through it. */
function ReelFrameImage({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const stops = windowStops(index);
  const opacity = useTransform(progress, stops, [0, 1, 1, 0]);
  // gentle Ken-Burns drift so each held frame still feels alive
  const scale = useTransform(progress, [stops[0], stops[3]], [1.12, 1]);
  const frame = showreelFrames[index];

  return (
    <motion.div
      style={{ opacity, zIndex: index }}
      className="absolute inset-0"
    >
      <motion.div style={{ scale }} className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frame.media.src}
          alt={frame.media.alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ShowreelSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The stage grows from a small portrait card into a full-bleed frame.
  const scale = useTransform(
    scrollYProgress,
    [0, INTRO],
    reduce ? [1, 1] : [0.22, 1]
  );
  const radius = useTransform(scrollYProgress, [0, INTRO], [28, 0]);
  // labels appear once the image has filled the screen
  const chromeOpacity = useTransform(
    scrollYProgress,
    [INTRO * 0.6, INTRO],
    [0, 1]
  );
  const barScaleX = scrollYProgress;

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = v <= INTRO ? 0 : Math.floor((v - INTRO) / SEG);
    setActive(Math.max(0, Math.min(COUNT - 1, i)));
  });

  return (
    <section
      ref={ref}
      aria-label="Showreel of selected works"
      className="relative"
      style={{ height: `${Math.max(360, COUNT * 75)}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* the growing stage */}
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-[100svh] w-full overflow-hidden bg-ink"
        >
          {showreelFrames.map((_, i) => (
            <ReelFrameImage key={i} progress={scrollYProgress} index={i} />
          ))}
          {/* readability gradient for the overlaid type */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
        </motion.div>

        {/* fixed chrome — sits above the stage, doesn't scale with it */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 text-paper sm:p-10"
        >
          {/* top row */}
          <div className="flex items-start justify-between">
            <span className="label font-semibold tracking-[0.24em]">
              ✦ Showreel 2026
            </span>
            <span className="label font-medium tracking-[0.24em]">
              {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
            </span>
          </div>

          {/* bottom row — current work title */}
          <div className="relative h-[3.2em]">
            {showreelFrames.map((f, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 18,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0"
              >
                <p className="label mb-1 font-medium tracking-[0.22em] text-paper/70">
                  {f.meta}
                </p>
                <p className="text-4xl font-extrabold uppercase leading-none tracking-tightest sm:text-6xl">
                  {f.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* scrub progress bar */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full bg-paper/20"
        >
          <motion.div
            style={{ scaleX: barScaleX }}
            className="h-full w-full origin-left bg-paper"
          />
        </motion.div>
      </div>
    </section>
  );
}
