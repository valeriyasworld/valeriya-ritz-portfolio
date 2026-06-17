"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** A single word that lights up as it passes through the viewport centre. */
function Word({ word, range }: { word: string; range: [number, number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.45"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-24, 0]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity, x }}
      className="relative text-4xl font-extrabold uppercase leading-tight tracking-tightest text-ink sm:text-6xl"
    >
      {word}
    </motion.li>
  );
}

export default function FeelingWords({ words }: { words: string[] }) {
  return (
    <ul className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 sm:gap-3">
      {words.map((w, i) => (
        <Word key={w} word={w} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </ul>
  );
}
