"use client";

/**
 * 06 — CONTACT / FINAL SIGN
 * Large centered typographic sign: "THIS IS YOUR SIGN".
 * Not corporate, not cute — a serious designer with a cinematic brain
 * and questionable humor.
 */

import { contact } from "@/lib/content";
import { Reveal } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-5 pb-10 pt-32 md:px-10 md:pt-48">
      {/* the sign */}
      <div className="text-center">
        <Reveal>
          <h2 className="sign">
            {contact.signLines[0]}
            <br />
            <em className="serif font-light">{contact.signLines[1]}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-10 max-w-md md:mt-14">
          {contact.sub.map((line, i) => (
            <p key={i} className="text-base leading-relaxed text-grey md:text-lg">
              {line}
            </p>
          ))}
        </Reveal>

        {/* email button */}
        <Reveal delay={0.25} className="mt-12 md:mt-16">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-white hover:text-black hover:outline hover:outline-1 hover:outline-black"
          >
            {contact.email}
            <span
              aria-hidden
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </a>
        </Reveal>

        {/* secondary channels */}
        <Reveal
          delay={0.35}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <a href={contact.linkedin.href} target="_blank" rel="noreferrer" className="micro link-line">
            {contact.linkedin.label}
          </a>
          <a href={contact.instagram.href} target="_blank" rel="noreferrer" className="micro link-line">
            {contact.instagram.label}
          </a>
          {/* >>> Telegram href is a placeholder until Valeriya sends the link */}
          <a href={contact.telegram.href} target="_blank" rel="noreferrer" className="micro link-line">
            {contact.telegram.label}
          </a>
          {contact.phones.map((phone) => (
            <a key={phone.href} href={phone.href} className="micro link-line tabular-nums">
              {phone.label}
            </a>
          ))}
        </Reveal>
      </div>

      {/* footer */}
      <footer className="mt-28 flex items-baseline justify-center gap-8 pb-2 md:mt-40">
        <span className="micro text-grey">
          Designed &amp; built by Valeriya Ritz © 2026
        </span>
        <a href="/impressum" className="micro link-line text-grey">
          Impressum
        </a>
      </footer>
    </section>
  );
}
