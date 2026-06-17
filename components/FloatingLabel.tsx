"use client";

import { motion } from "framer-motion";

type FloatingLabelProps = {
  children: React.ReactNode;
  /** Tailwind positioning classes, e.g. "top-6 left-8". */
  className?: string;
  delay?: number;
};

/**
 * Small editorial caption that floats around the big typography.
 * Position it with absolute utility classes via `className`.
 */
export default function FloatingLabel({
  children,
  className = "",
  delay = 0,
}: FloatingLabelProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 0.65, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`label pointer-events-none absolute z-10 font-medium italic text-ink/70 ${className}`}
    >
      {children}
    </motion.span>
  );
}
