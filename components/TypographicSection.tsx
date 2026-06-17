"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type TypographicSectionProps = {
  id?: string;
  /** The huge statement, typically containing an InteractiveMediaSlot inline. */
  children: React.ReactNode;
  /** Floating labels, body copy, scroll-revealed words, etc. */
  surround?: React.ReactNode;
  /** Supporting paragraph under the statement. */
  body?: React.ReactNode;
  compact?: boolean;
  className?: string;
};

/**
 * A full-height typographic stage. The statement fades / slides in on scroll
 * and drifts subtly for a parallax feel. Floating labels and body copy are
 * placed via the `surround` and `body` slots.
 */
export default function TypographicSection({
  id,
  children,
  surround,
  body,
  compact = false,
  className = "",
}: TypographicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax drift lives on a wrapper so it never competes with the
  // opacity/position reveal on the heading itself.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-28 sm:px-8 ${className}`}
    >
      {surround}

      <motion.div style={{ y }} className="relative z-20 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`statement ${
            compact ? "statement--compact" : ""
          } mx-auto max-w-[14ch] text-center text-ink`}
        >
          {children}
        </motion.h2>
      </motion.div>

      {body && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mt-12 max-w-xl text-center text-base font-normal leading-relaxed text-ink/70 sm:text-lg"
        >
          {body}
        </motion.div>
      )}
    </section>
  );
}
