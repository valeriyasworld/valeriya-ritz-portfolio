"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-5 py-5 mix-blend-difference sm:px-8"
    >
      <a
        href="#top"
        className="label font-semibold not-italic tracking-[0.2em] text-white"
      >
        valeriya ritz
      </a>
      <a
        href="#contact"
        className="label font-medium not-italic tracking-[0.2em] text-white/90 transition-opacity hover:opacity-60"
      >
        Get in touch
      </a>
    </motion.header>
  );
}
