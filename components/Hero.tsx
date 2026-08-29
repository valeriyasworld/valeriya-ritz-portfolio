"use client";

/**
 * 01 — HERO
 * The manifesto as a living cluster: every word is a black pill floating in
 * zero gravity, pulled toward the centre and chained to its neighbours by
 * thin white threads. A royal blue hull stretches around the whole cluster
 * like a membrane — drag any word and the blob deforms with it.
 *
 * Matter.js runs the physics; the pills stay real DOM text (crisp type,
 * screen-reader friendly), hull and threads are one SVG layer beneath.
 * Touch: pills carry `touch-action: none` so dragging works on a phone,
 * while empty space keeps normal page scrolling.
 * Reduced motion: no simulation, the sentence simply sets as a paragraph.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { heroWords } from "@/lib/content";

/** every pill reads the same size — the sentence, not one word, is the star */
const PILL =
  "text-[clamp(0.85rem,1.55vw,1.25rem)] px-4 py-2.5";

/** how far the blue membrane sits outside the outermost pills */
const HULL_PADDING = 26;
/** delay between two words joining the cluster */
const STAGGER_MS = 170;

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hullRef = useRef<SVGPolygonElement>(null);
  const threadsRef = useRef<SVGGElement>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const dragRef = useRef<{ constraint: Matter.Constraint } | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const build = useCallback(() => {
    const scene = sceneRef.current;
    const threads = threadsRef.current;
    if (!scene || !threads) return () => {};

    const W = scene.clientWidth;
    const H = scene.clientHeight;
    const cx = W / 2;
    const cy = H / 2;

    const engine = Matter.Engine.create();
    engine.gravity.y = 0; // the cluster floats; the centre pull does the work
    engine.gravity.x = 0;
    const world = engine.world;
    worldRef.current = world;

    // generous walls so a hard throw never loses a word off-screen
    const WALL = 300;
    Matter.Composite.add(world, [
      Matter.Bodies.rectangle(cx, -WALL / 2, W + WALL * 2, WALL, { isStatic: true }),
      Matter.Bodies.rectangle(cx, H + WALL / 2, W + WALL * 2, WALL, { isStatic: true }),
      Matter.Bodies.rectangle(-WALL / 2, cy, WALL, H + WALL * 2, { isStatic: true }),
      Matter.Bodies.rectangle(W + WALL / 2, cy, WALL, H + WALL * 2, { isStatic: true }),
    ]);

    // one body per word, all born near the centre
    const bodies: Matter.Body[] = [];
    chipRefs.current.forEach((el, i) => {
      if (!el) return;
      bodies[i] = Matter.Bodies.rectangle(
        cx + (Math.random() - 0.5) * 60,
        cy + (Math.random() - 0.5) * 60,
        el.offsetWidth,
        el.offsetHeight,
        {
          restitution: 0.2,
          friction: 0.1,
          frictionAir: 0.09, // space-like drag: the cluster settles, never jitters
          chamfer: { radius: Math.min(el.offsetHeight / 2, 30) },
          angle: (Math.random() - 0.5) * 0.5,
        }
      );
    });
    bodiesRef.current = bodies;

    // the sentence as a chain: each word softly tied to the next
    const chain: Matter.Constraint[] = [];
    for (let i = 1; i < bodies.length; i++) {
      if (!bodies[i] || !bodies[i - 1]) continue;
      chain[i - 1] = Matter.Constraint.create({
        bodyA: bodies[i - 1],
        bodyB: bodies[i],
        length: 0,
        stiffness: 0.006,
        damping: 0.06,
      });
    }

    // words join the cluster one after another
    const timers: number[] = [];
    const live = new Set<Matter.Body>();
    bodies.forEach((body, i) => {
      timers.push(
        window.setTimeout(() => {
          Matter.Composite.add(world, body);
          live.add(body);
          if (chain[i - 1]) Matter.Composite.add(world, chain[i - 1]);
          const el = chipRefs.current[i];
          if (el) el.style.opacity = "1";
        }, i * STAGGER_MS)
      );
    });

    // gentle pull to the centre keeps the cluster together and centred
    Matter.Events.on(engine, "beforeUpdate", () => {
      live.forEach((body) => {
        Matter.Body.applyForce(body, body.position, {
          x: (cx - body.position.x) * 2.2e-6 * body.mass,
          y: (cy - body.position.y) * 2.2e-6 * body.mass,
        });
      });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // one <line> per chain link, reused every frame
    threads.replaceChildren(
      ...chain.map(() =>
        document.createElementNS("http://www.w3.org/2000/svg", "line")
      )
    );

    let raf = 0;
    const paint = () => {
      // pills follow their bodies
      bodies.forEach((body, i) => {
        const el = chipRefs.current[i];
        if (!el || !body) return;
        el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${
          body.position.y - el.offsetHeight / 2
        }px) rotate(${body.angle}rad)`;
      });

      // white threads between chained words
      chain.forEach((c, i) => {
        const line = threads.children[i] as SVGLineElement | undefined;
        if (!line || !c.bodyA || !c.bodyB) return;
        line.setAttribute("x1", String(c.bodyA.position.x));
        line.setAttribute("y1", String(c.bodyA.position.y));
        line.setAttribute("x2", String(c.bodyB.position.x));
        line.setAttribute("y2", String(c.bodyB.position.y));
        line.setAttribute(
          "opacity",
          live.has(c.bodyA) && live.has(c.bodyB) ? "1" : "0"
        );
      });

      // the blue membrane: convex hull around every pill, pushed outward
      if (hullRef.current && live.size) {
        const pts: Matter.Vector[] = [];
        live.forEach((b) =>
          b.vertices.forEach((v) => pts.push({ x: v.x, y: v.y }))
        );
        // hull() only reads x/y; its typings just ask for the richer Vertex
        const hull = Matter.Vertices.hull(pts as unknown as Matter.Vertex[]);
        const hx = hull.reduce((s, p) => s + p.x, 0) / hull.length;
        const hy = hull.reduce((s, p) => s + p.y, 0) / hull.length;
        hullRef.current.setAttribute(
          "points",
          hull
            .map((p) => {
              const dx = p.x - hx;
              const dy = p.y - hy;
              const d = Math.hypot(dx, dy) || 1;
              return `${p.x + (dx / d) * HULL_PADDING},${
                p.y + (dy / d) * HULL_PADDING
              }`;
            })
            .join(" ")
        );
      }

      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);


    return () => {
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(raf);
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate");
      Matter.Engine.clear(engine);
      Matter.Composite.clear(world, false);
      chipRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
      hullRef.current?.setAttribute("points", "");
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
      if (!w || !h) return; // not laid out yet — the observer will call again
      // ignore the height jitter mobile browsers make when toolbars slide away
      if (Math.abs(w - lastW) < 2 && Math.abs(h - lastH) < 120) return;
      lastW = w;
      lastH = h;
      cleanup?.();
      cleanup = build();
    };

    // wait for the real fonts, otherwise the pills are measured in a fallback
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

  const pointerPos = (e: React.PointerEvent) => {
    const rect = sceneRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onChipDown = (i: number) => (e: React.PointerEvent<HTMLSpanElement>) => {
    const body = bodiesRef.current[i];
    const world = worldRef.current;
    if (!body || !world) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = pointerPos(e);
    const dx = pos.x - body.position.x;
    const dy = pos.y - body.position.y;
    const constraint = Matter.Constraint.create({
      pointA: pos,
      bodyB: body,
      // grab offset expressed in the body's own rotated frame
      pointB: {
        x: dx * Math.cos(-body.angle) - dy * Math.sin(-body.angle),
        y: dx * Math.sin(-body.angle) + dy * Math.cos(-body.angle),
      },
      length: 0,
      stiffness: 0.16,
      damping: 0.12,
    });
    Matter.Composite.add(world, constraint);
    dragRef.current = { constraint };
  };

  const onChipMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (dragRef.current) dragRef.current.constraint.pointA = pointerPos(e);
  };

  const endDrag = () => {
    const world = worldRef.current;
    if (dragRef.current && world)
      Matter.Composite.remove(world, dragRef.current.constraint);
    dragRef.current = null;
  };

  /* -------------------------------------------------------------- render */

  if (reduced) {
    return (
      <section
        id="top"
        className="flex min-h-[100svh] items-center bg-white px-5 py-32 md:px-10"
      >
        <p className="statement max-w-6xl !text-[clamp(1.8rem,5vw,4.5rem)]">
          {heroWords.join(" ")}
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
        Valeriya Ritz — {heroWords.join(" ")}
      </h1>

      {/* membrane + threads */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <polygon ref={hullRef} fill="var(--royal)" />
        <g ref={threadsRef} stroke="#fff" strokeWidth="1.5" fill="none" />
      </svg>

      {/* the words */}
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
          className={`absolute left-0 top-0 inline-flex cursor-grab touch-none select-none items-center whitespace-nowrap rounded-full bg-black font-bold uppercase leading-none tracking-tight text-white active:cursor-grabbing ${PILL}`}
          style={{ opacity: 0, willChange: "transform" }}
        >
          {word}
        </span>
      ))}

      <span className="micro pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-grey">
        drag the words
      </span>
    </section>
  );
}
