"use client";

/**
 * 03 — ABOUT ME
 * Not a CV. A narrative: how each step changed the way of thinking.
 * Sticky heading left, story + timeline right.
 */

import { about } from "@/lib/content";
import { Em, Reveal } from "./ui";

export default function About() {
  return (
    <section id="about" className="bg-white px-5 pb-32 md:px-10 md:pb-48">
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

    </section>
  );
}
