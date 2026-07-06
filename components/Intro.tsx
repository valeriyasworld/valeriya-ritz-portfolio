"use client";

/**
 * 02 — INTRO / POSITIONING
 * One big Hero-style flowing statement: sentence-case Nyght, left-aligned,
 * words fading in one by one while scrolling — with small photos living
 * inline between the words (like Hero's studio intro).
 *
 * The statement text and the inline photos come from lib/content.ts:
 * [1] [2] [3] markers place `intro.inlineImages[0..2]` in the flow.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { intro } from "@/lib/content";

type Token =
  | { kind: "word"; text: string; serif: boolean }
  | { kind: "image"; src: string };

function tokenize(): Token[] {
  const tokens: Token[] = [];
  intro.statement.split(/\*(.+?)\*/g).forEach((part, i) => {
    part
      .split(" ")
      .filter(Boolean)
      .forEach((word) => {
        const slot = word.match(/^\[(\d)\]$/);
        if (slot) {
          const src = intro.inlineImages[Number(slot[1]) - 1];
          if (src) tokens.push({ kind: "image", src });
          return; // empty slots disappear silently
        }
        tokens.push({ kind: "word", text: word, serif: i % 2 === 1 });
      });
  });
  return tokens;
}

function FadingToken({
  token,
  progress,
  range,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  if (token.kind === "image") {
    const cls =
      "mx-[0.18em] inline-block h-[0.82em] w-auto -translate-y-[0.06em] rounded-[3px] object-cover align-baseline";
    // .mp4 slots become tiny muted video loops — a film living inside the word "film"
    if (token.src.endsWith(".mp4")) {
      return (
        <motion.video
          style={{ opacity }}
          src={token.src}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className={cls}
        />
      );
    }
    return (
      <motion.img style={{ opacity }} src={token.src} alt="" aria-hidden className={cls} />
    );
  }
  return (
    <motion.span style={{ opacity }} className={token.serif ? "serif" : undefined}>
      {token.text}{" "}
    </motion.span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const tokens = tokenize();

  return (
    <section id="intro" className="bg-white px-5 py-32 md:px-10 md:py-48">
      <div className="max-w-6xl md:ml-[8vw]">
        <p
          ref={ref}
          className="statement !text-[clamp(2.1rem,4.6vw,4.8rem)] !leading-[1.14]"
        >
          {tokens.map((token, i) => (
            <FadingToken
              key={i}
              token={token}
              progress={scrollYProgress}
              range={[i / tokens.length, (i + 1) / tokens.length]}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
