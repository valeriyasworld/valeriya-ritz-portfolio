"use client";

/**
 * 03 — ABOUT / CONTEXT
 * Not a CV. A narrative: how each step changed the way of thinking.
 * Sticky heading left, story + timeline right, contradictions at the end.
 */

import { about } from "@/lib/content";
import { Em, Reveal, SectionHead } from "./ui";

export default function About() {
  return (
    <section id="context" className="bg-white px-5 pb-32 md:px-10 md:pb-48">
      <SectionHead index="02" label="Context" />

      <div className="grid gap-12 md:grid-cols-12">
        {/* sticky narrative heading */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <h2 className="statement !text-[clamp(2.2rem,5.5vw,5rem)]">
                <Em text={about.heading} />
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 max-w-sm space-y-5">
              {about.personal.map((p, i) => (
                <p key={i} className="text-base leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="micro pt-2 text-grey">{about.currently}</p>
            </Reveal>
          </div>
        </div>

        {/* timeline — each step ends with what it changed */}
        <div className="md:col-span-6 md:col-start-7">
          <ol>
            {about.timeline.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="group py-10 first:pt-0 md:py-12">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl tracking-tight md:text-4xl">
                      {step.title}
                    </h3>
                    <span className="micro shrink-0 text-grey">
                      {step.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-grey md:text-base">
                    {step.what}
                  </p>
                  <p className="serif mt-5 text-lg leading-snug md:text-xl">
                    {step.changed}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* contradictions block */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <span className="micro text-grey">Small personal contradictions</span>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.contradictions.map((c, i) => (
            <Reveal key={c.a} delay={i * 0.08}>
              {/* hover: the rational word steps back, the honest one steps in */}
              <p className="group cursor-default text-3xl leading-tight md:text-4xl">
                <span className="font-display tracking-tight transition-opacity duration-300 group-hover:opacity-30">
                  {c.a}
                </span>
                <br />
                <span className="serif text-grey transition-colors duration-300 group-hover:text-black">
                  {c.b}
                </span>
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20 md:mt-28">
          <p className="serif mx-auto max-w-3xl text-center text-3xl leading-tight md:text-5xl">
            &ldquo;{about.quote}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
