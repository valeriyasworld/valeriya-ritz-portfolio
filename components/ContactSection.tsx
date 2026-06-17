"use client";

import { motion } from "framer-motion";
import { contact, contactCollage } from "@/lib/data";
import InteractiveMediaSlot from "./InteractiveMediaSlot";
import FloatingLabel from "./FloatingLabel";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-28 sm:px-8"
    >
      <FloatingLabel className="left-5 top-24 sm:left-10" delay={0.1}>
        Open for 2026
      </FloatingLabel>
      <FloatingLabel className="right-5 top-32 sm:right-12" delay={0.2}>
        Collaborations · Commissions
      </FloatingLabel>

      <motion.h2
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="statement statement--compact relative z-20 mx-auto max-w-[12ch] text-center"
      >
        Let&apos;s create{" "}
        <InteractiveMediaSlot
          images={contactCollage}
          mode="slideshow"
          interval={700}
          card={{
            title: "Say hello",
            body: "Tell me about the thing you want people to feel. I'll help you build it.",
          }}
        />{" "}
        together
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mt-14 flex w-full max-w-3xl flex-col items-center gap-10"
      >
        {/* details */}
        <div className="grid w-full grid-cols-2 gap-6 text-left sm:grid-cols-4">
          <div>
            <p className="label text-ink/45">Designer</p>
            <p className="mt-1 font-semibold">{contact.name}</p>
            <p className="text-ink/60">{contact.role}</p>
          </div>
          <div>
            <p className="label text-ink/45">Based in</p>
            <p className="mt-1 font-semibold">{contact.location}</p>
          </div>
          <div>
            <p className="label text-ink/45">Social</p>
            <a
              href={contact.instagram.href}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block font-semibold underline-offset-4 hover:underline"
            >
              {contact.instagram.label}
            </a>
            <a
              href={contact.linkedin.href}
              className="block text-ink/60 underline-offset-4 hover:underline"
            >
              {contact.linkedin.label}
            </a>
          </div>
          <div>
            <p className="label text-ink/45">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block break-all font-semibold underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`mailto:${contact.email}`}
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-paper transition-transform duration-300 hover:-translate-y-1"
        >
          Get in touch
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </a>

        <p className="label mt-4 text-ink/40">
          © {new Date().getFullYear()} Valeriya Ritz — Portfolio 2026
        </p>
      </motion.div>
    </section>
  );
}
