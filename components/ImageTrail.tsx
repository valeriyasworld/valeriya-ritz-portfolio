"use client";

/**
 * IMAGE TRAIL — a slideshow that chases the cursor. Every ~90px of mouse
 * travel the next image spawns under the pointer, scales in and dissolves
 * shortly after, so the movement leaves a fading trace of pictures.
 * Images come from `trailImages` in lib/content.ts. Touch devices simply
 * never fire mousemove, so the effect stays desktop-only by itself.
 */

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trailImages } from "@/lib/content";
import { EASE } from "./ui";

type TrailItem = { id: number; x: number; y: number; src: string };

const SPAWN_DISTANCE = 90; // px of cursor travel between images
const LIFETIME = 750; // ms until an image starts to dissolve
const MAX_ITEMS = 8;

export default function ImageTrail({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const counter = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [items, setItems] = useState<TrailItem[]>([]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPos.current) {
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      if (dist < SPAWN_DISTANCE) return;
    }
    lastPos.current = { x, y };

    const id = counter.current++;
    const item: TrailItem = {
      id,
      x,
      y,
      src: trailImages[id % trailImages.length],
    };
    setItems((prev) => [...prev.slice(-(MAX_ITEMS - 1)), item]);
    window.setTimeout(
      () => setItems((prev) => prev.filter((i) => i.id !== id)),
      LIFETIME
    );
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} className="relative">
      {/* trail layer — behind the content, never intercepts clicks */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {items.map((item) => (
            <motion.img
              key={item.id}
              src={item.src}
              alt=""
              aria-hidden
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [...EASE] }}
              className="absolute w-28 -translate-x-1/2 -translate-y-1/2 object-cover md:w-32"
              style={{ left: item.x, top: item.y, aspectRatio: "10 / 13" }}
            />
          ))}
        </AnimatePresence>

        {/* mobile: no cursor, so a handful of photos pop in around the sign
            as the section scrolls into view */}
        <div className="md:hidden">
          {MOBILE_SPOTS.map((spot, i) => (
            <motion.img
              key={i}
              src={trailImages[i % trailImages.length]}
              alt=""
              aria-hidden
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 16,
                delay: 0.2 + i * 0.18,
              }}
              className="absolute w-20 object-cover"
              style={{ ...spot, aspectRatio: "10 / 13" }}
            />
          ))}
        </div>
      </div>

      {/* actual section content above the trail */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* scattered spots around the sign — deliberately few, so it stays calm */
const MOBILE_SPOTS: React.CSSProperties[] = [
  { top: "4%", left: "6%" },
  { top: "10%", right: "8%" },
  { top: "46%", left: "4%" },
  { top: "58%", right: "5%" },
  { bottom: "14%", left: "14%" },
];
