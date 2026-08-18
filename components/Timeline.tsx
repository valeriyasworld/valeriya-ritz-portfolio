"use client";

/**
 * Full experience & education timeline for /about — quiet and factual.
 * No hover reels: the CV reads as a CV.
 */

import { about } from "@/lib/content";
import { Reveal } from "./ui";

export default function Timeline() {
  return (
    <ol>
      {about.timeline.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.04}>
          <li className="py-9 first:pt-0 md:py-11">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-3xl tracking-tight md:text-4xl">
                {step.title}
                <br />
                <a
                  href={step.org.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line"
                >
                  {step.org.label}
                </a>
              </h3>
              <span className="micro shrink-0 text-grey">{step.period}</span>
            </div>
            <p className="micro mt-3 text-grey">{step.dates}</p>
            <p className="mt-3 text-sm text-grey md:text-base">{step.what}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
