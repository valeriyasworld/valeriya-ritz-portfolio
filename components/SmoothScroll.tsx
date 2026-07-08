"use client";

/**
 * SMOOTH SCROLL — Lenis gives the whole site the buttery, inertial scroll
 * feel (reference: theshift.tokyo). Anchor links are intercepted and glide
 * to their section instead of jumping. Users with prefers-reduced-motion
 * get the plain native scroll.
 */

import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useState } from "react";

/** same-page anchor clicks glide via Lenis (keeps the fixed-nav offset) */
function AnchorGlide() {
  const lenis = useLenis();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!lenis) return;
      const a = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);
  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ duration: 1.15, smoothWheel: true }}>
      <AnchorGlide />
      {children}
    </ReactLenis>
  );
}
