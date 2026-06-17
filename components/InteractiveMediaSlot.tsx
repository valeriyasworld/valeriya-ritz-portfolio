"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MediaItem } from "@/lib/data";

export type SlotMode = "single" | "collage" | "rotating" | "slideshow";

export type SlotCard = { title?: string; body?: string };

type InteractiveMediaSlotProps = {
  images: MediaItem[];
  mode?: SlotMode;
  /** Static card shown on hover/tap (single · collage · slideshow). */
  card?: SlotCard;
  /** Per-image cards, indexed alongside `images` (rotating mode). */
  perItemCards?: SlotCard[];
  /** Called with the active image index on click (e.g. open a modal). */
  onActiveClick?: (index: number) => void;
  /** Cycle interval in ms for rotating / slideshow. */
  interval?: number;
  /** Accent ring while interacting. */
  className?: string;
};

function Media({ item, className = "" }: { item: MediaItem; className?: string }) {
  if (item.video) {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        src={item.video}
        poster={item.src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  /* eslint-disable-next-line @next/next/no-img-element */
  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/**
 * The signature `*( … )` element. The asterisk and parentheses inherit the
 * surrounding type size; the media box sits inline between them and expands
 * into a floating card on hover / tap. In `rotating` and `slideshow` modes the
 * media cycles automatically.
 */
export default function InteractiveMediaSlot({
  images,
  mode = "single",
  card,
  perItemCards,
  onActiveClick,
  interval = 2600,
  className = "",
}: InteractiveMediaSlotProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned;

  const cycles = mode === "rotating" || mode === "slideshow";

  // Auto-advance. Rotating pauses while the viewer is engaging; slideshow doesn't.
  useEffect(() => {
    if (!cycles || reduce) return;
    if (mode === "rotating" && open) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      mode === "slideshow" ? Math.min(interval, 900) : interval
    );
    return () => window.clearInterval(id);
  }, [cycles, mode, open, images.length, interval, reduce]);

  const activeCard: SlotCard | undefined = perItemCards
    ? perItemCards[index % perItemCards.length]
    : card;

  function handleClick() {
    if (onActiveClick) onActiveClick(index);
    else setPinned((p) => !p);
  }

  return (
    <span
      className="relative inline-flex select-none items-center align-middle"
      style={{ lineHeight: 0.86 }}
    >
      {/* leading asterisk + open paren — part of the typographic statement */}
      <span aria-hidden className="font-black">
        *(
      </span>

      {/* the media box */}
      <motion.button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={handleClick}
        aria-label={
          onActiveClick ? "Open project" : activeCard?.title ?? "Reveal detail"
        }
        animate={
          reduce
            ? undefined
            : { scale: open ? 1.06 : 1, rotate: open ? -1 : 0 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`group relative mx-[0.08em] inline-block aspect-[4/5] h-[0.82em] overflow-hidden rounded-[0.06em] bg-ink/10 align-middle ring-1 ring-ink/10 ${
          open ? "ring-accent/60" : ""
        } ${className}`}
      >
        {mode === "collage" ? (
          <span className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[1px]">
            {images.slice(0, 4).map((m, i) => (
              <Media key={i} item={m} />
            ))}
          </span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={index}
              className="block h-full w-full"
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Media item={images[index % images.length]} />
            </motion.span>
          </AnimatePresence>
        )}

        {/* subtle grain / darken on hover */}
        <span
          className={`pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 ${
            open ? "bg-ink/15" : ""
          }`}
        />
      </motion.button>

      {/* closing paren */}
      <span aria-hidden className="font-black">
        )
      </span>

      {/* floating detail card */}
      <AnimatePresence>
        {open && activeCard && (activeCard.title || activeCard.body) && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[calc(100%+0.4em)] z-50 w-[min(78vw,320px)] -translate-x-1/2 rounded-2xl border border-ink/10 bg-paper/95 p-5 text-left shadow-[0_20px_60px_-25px_rgba(17,17,17,0.5)] backdrop-blur"
          >
            {activeCard.title && (
              <p className="label mb-2 font-semibold not-italic tracking-[0.16em] text-accent">
                {activeCard.title}
              </p>
            )}
            {activeCard.body && (
              <p className="text-[0.95rem] font-normal normal-case leading-snug tracking-normal text-ink/80">
                {activeCard.body}
              </p>
            )}
            {onActiveClick && (
              <p className="label mt-3 font-medium not-italic text-ink/45">
                Click to open ↗
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
