"use client";

/**
 * Media renderers for the project detail pages.
 * Images get a subtle parallax drift (theshift.tokyo-style depth) inside
 * their crop box; videos stay static for performance. "ph" renders the
 * quiet placeholder slot.
 */

import { Parallax } from "./ui";

export function Media({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith(".mp4")) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full bg-black"
      />
    );
  }
  return (
    <Parallax className="bg-black">
      <img src={src} alt={alt} loading="lazy" className="w-full object-cover" />
    </Parallax>
  );
}

export function Tile({
  src,
  alt,
  aspect,
  className,
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
}) {
  if (src === "ph") {
    return (
      <div
        className={`flex ${aspect} items-center justify-center border border-line bg-[#F4F4F4] ${className ?? ""}`}
      >
        <span className="micro text-grey">( image )</span>
      </div>
    );
  }
  if (src.endsWith(".mp4")) {
    return (
      <div className={`${aspect} overflow-hidden bg-black ${className ?? ""}`}>
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <Parallax className={`${aspect} bg-black ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </Parallax>
  );
}
