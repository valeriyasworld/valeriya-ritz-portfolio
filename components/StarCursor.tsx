"use client";

/**
 * STAR CURSOR — Valeriya's hand-drawn star follows the pointer as a DOM
 * element, so it can be any size (CSS `cursor:` caps out near 48px).
 * It eases toward the mouse for a soft, alive feel. Hidden on touch
 * devices and when the pointer leaves the window; the native cursor is
 * hidden only while this is active (class on <html>).
 */

import { useEffect, useRef } from "react";

const SIZE = 64; // px — tweak freely, no browser limit here

export default function StarCursor() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // touch / no fine pointer → keep the native cursor, don't mount the star
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("star-cursor-active");

    let mx = -100,
      my = -100; // target (mouse)
    let cx = mx,
      cy = my; // current (eased)
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        cx = mx;
        cy = my;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      cx += (mx - cx) * 0.28;
      cy += (my - cy) * 0.28;
      el.style.transform = `translate(${cx - SIZE / 2}px, ${cy - SIZE / 2}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("star-cursor-active");
    };
  }, []);

  return (
    <img
      ref={ref}
      src="/media/cursor-star.png"
      alt=""
      aria-hidden
      width={SIZE}
      height={SIZE}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform",
      }}
    />
  );
}
