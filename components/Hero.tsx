"use client";

/**
 * 01 — HERO
 * The manifesto as physics: every word is a chip with weight. They drop in,
 * collide, stack — and you can grab and throw them around. Matter.js runs
 * the simulation, the words stay real DOM text (crisp type, selectable,
 * readable by screen readers).
 *
 * Touch: chips carry `touch-action: none` so dragging works on a phone,
 * while empty space keeps normal page scrolling.
 * Reduced motion: no simulation, the sentence simply sets as a paragraph.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { heroWords } from "@/lib/content";

const SIZE_CLASS = {
  s: "text-[clamp(1.1rem,2.6vw,2rem)] px-4 py-2",
  m: "text-[clamp(1.3rem,3.4vw,2.8rem)] px-5 py-2.5",
  l: "text-[clamp(1.5rem,4.4vw,3.6rem)] px-6 py-3",
} as const;

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const dragRef = useRef<{ constraint: Matter.Constraint; body: Matter.Body } | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /** (re)build the whole simulation for the current container size */
  const build = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return () => {};

    const W = scene.clientWidth;
    const H = scene.clientHeight;
    const WALL = 200; // thick walls: nothing tunnels out on a hard throw

    const engine = Matter.Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;
    worldRef.current = world;

    Matter.Composite.add(world, [
      Matter.Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, { isStatic: true }),
      Matter.Bodies.rectangle(-WALL / 2, H / 2, WALL, H * 3, { isStatic: true }),
      Matter.Bodies.rectangle(W + WALL / 2, H / 2, WALL, H * 3, { isStatic: true }),
      // deliberately no ceiling: words may fly up and fall back in
    ]);

    // one body per chip, sized from the rendered text
    const bodies: Matter.Body[] = [];
    chipRefs.current.forEach((el, i) => {
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const body = Matter.Bodies.rectangle(
        W * 0.15 + Math.random() * W * 0.7,
        -h / 2 - 40 - Math.random() * H * 0.75, // staggered arrival
        w,
        h,
        {
          restitution: 0.45,
          friction: 0.35,
          frictionAir: 0.012,
          chamfer: { radius: Math.min(h / 2, 28) },
        }
      );
      bodies[i] = body;
    });
    Matter.Composite.add(world, bodies.filter(Boolean));
    bodiesRef.current = bodies;

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // paint: physics -> DOM transforms
    let raf = 0;
    const paint = () => {
      bodies.forEach((body, i) => {
        const el = chipRefs.current[i];
        if (!el || !body) return;
        const { x, y } = body.position;
        el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${
          y - el.offsetHeight / 2
        }px) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(raf);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(world, false);
      bodiesRef.current = [];
      worldRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const scene = sceneRef.current;
    if (!scene) return;

    let cleanup: (() => void) | null = null;
    let ro: ResizeObserver | null = null;
    let t = 0;
    let lastW = 0;
    let lastH = 0;

    const rebuild = () => {
      const w = scene.clientWidth;
      const h = scene.clientHeight;
      if (!w || !h) return; // not laid out yet — wait for the observer
      // width changes matter; ignore the small height jitter mobile browsers
      // produce when their toolbars slide away mid-scroll
      if (Math.abs(w - lastW) < 2 && Math.abs(h - lastH) < 120) return;
      lastW = w;
      lastH = h;
      cleanup?.();
      cleanup = build();
    };

    // measure only once the real fonts are in, otherwise the chip widths
    // (and therefore the physics bodies) belong to the fallback font
    const start = () => {
      rebuild();
      ro = new ResizeObserver(() => {
        window.clearTimeout(t);
        t = window.setTimeout(rebuild, 250);
      });
      ro.observe(scene);
    };
    if (document.fonts?.ready) document.fonts.ready.then(start);
    else start();

    return () => {
      window.clearTimeout(t);
      ro?.disconnect();
      cleanup?.();
    };
  }, [build, reduced]);

  /* ------------------------------------------------------------ dragging */

  const pointerPos = (e: React.PointerEvent | PointerEvent) => {
    const rect = sceneRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onChipDown = (i: number) => (e: React.PointerEvent<HTMLSpanElement>) => {
    const body = bodiesRef.current[i];
    const world = worldRef.current;
    if (!body || !world) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = pointerPos(e);
    const constraint = Matter.Constraint.create({
      pointA: pos,
      bodyB: body,
      pointB: {
        x: (pos.x - body.position.x) * Math.cos(-body.angle) - (pos.y - body.position.y) * Math.sin(-body.angle),
        y: (pos.x - body.position.x) * Math.sin(-body.angle) + (pos.y - body.position.y) * Math.cos(-body.angle),
      },
      stiffness: 0.18,
      damping: 0.12,
      length: 0,
    });
    Matter.Composite.add(world, constraint);
    dragRef.current = { constraint, body };
  };

  const onChipMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!dragRef.current) return;
    dragRef.current.constraint.pointA = pointerPos(e);
  };

  const endDrag = () => {
    const drag = dragRef.current;
    const world = worldRef.current;
    if (drag && world) Matter.Composite.remove(world, drag.constraint);
    dragRef.current = null;
  };

  /* -------------------------------------------------------------- render */

  if (reduced) {
    return (
      <section id="top" className="flex min-h-[100svh] items-center bg-white px-5 py-32 md:px-10">
        <p className="statement max-w-6xl !text-[clamp(1.8rem,5vw,4.5rem)]">
          {heroWords.map((w, i) => (
            <span key={i} className={w.accent ? "text-royal" : undefined}>
              {w.text}{" "}
            </span>
          ))}
        </p>
      </section>
    );
  }

  return (
    <section
      id="top"
      ref={sceneRef}
      className="relative h-[100svh] w-full overflow-hidden bg-white"
    >
      <h1 className="sr-only">
        Valeriya Ritz — {heroWords.map((w) => w.text).join(" ")}
      </h1>

      {heroWords.map((word, i) => (
        <span
          key={i}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          aria-hidden
          onPointerDown={onChipDown(i)}
          onPointerMove={onChipMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`absolute left-0 top-0 inline-flex cursor-grab touch-none select-none items-center whitespace-nowrap rounded-full font-bold uppercase leading-none tracking-tight active:cursor-grabbing ${
            SIZE_CLASS[word.size ?? "m"]
          } ${
            word.accent
              ? "bg-royal text-white"
              : "border border-black/15 bg-white text-black"
          }`}
          style={{ willChange: "transform" }}
        >
          {word.text}
        </span>
      ))}

      <span className="micro pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-grey">
        drag the words
      </span>
    </section>
  );
}
