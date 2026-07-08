"use client";

/**
 * Shared micro-components: scroll reveals and the serif-italic text voice.
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Renders copy where *asterisked* fragments switch into the Nyght
 * serif-italic voice — the typographic "contradiction" device used
 * across the whole site.
 */
export function Em({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="serif">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/**
 * Parallax drift: the child glides slightly slower than the page while
 * scrolling through the viewport. Wrap media in an overflow-hidden box;
 * the inner content is scaled up a touch so no edges ever show.
 */
export function Parallax({
  children,
  amount = 7,
  className,
}: {
  children: React.ReactNode;
  /** drift strength in % of element height */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`]
  );
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="h-full w-full scale-[1.16]">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Editorial mask reveal: the text slides up out of an invisible clip,
 * like theshift.tokyo headlines. Use for display-size type.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay, ease: [...EASE] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Fade-up once when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [...EASE] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadingWord({
  children,
  progress,
  range,
  serif,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  serif: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={serif ? "serif" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/**
 * A statement whose words fade in one by one as it scrolls through the
 * viewport — the subtle text motion used for the intro and about copy.
 * Understands the same *serif* markup as <Em/>.
 */
export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  // Tokenise into words, remembering which belong to a *serif* span.
  const tokens: { word: string; serif: boolean }[] = [];
  text.split(/\*(.+?)\*/g).forEach((part, i) => {
    part
      .split(" ")
      .filter(Boolean)
      .forEach((word) => tokens.push({ word, serif: i % 2 === 1 }));
  });

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <FadingWord
          key={i}
          progress={scrollYProgress}
          range={[i / tokens.length, (i + 1) / tokens.length]}
          serif={t.serif}
        >
          {t.word}
        </FadingWord>
      ))}
    </p>
  );
}

