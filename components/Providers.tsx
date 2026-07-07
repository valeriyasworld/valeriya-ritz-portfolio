"use client";

/**
 * Global client providers. MotionConfig makes every framer-motion animation
 * respect the user's prefers-reduced-motion setting (the CSS animations are
 * already covered by the media query in globals.css).
 */

import { MotionConfig } from "framer-motion";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
