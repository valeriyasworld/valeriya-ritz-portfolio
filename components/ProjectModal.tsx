"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/data";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

/** Full-bleed overlay revealing a single project. Closes on Esc / backdrop. */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (project) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project`}
            initial={{ y: "6%", opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "4%", opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid max-h-[92vh] w-full max-w-5xl grid-rows-[auto] overflow-y-auto rounded-t-3xl bg-paper sm:rounded-3xl md:grid-cols-2"
          >
            {/* media */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink/10 md:aspect-auto md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.media.src}
                alt={project.media.alt}
                className="h-full w-full object-cover"
              />
            </div>

            {/* text */}
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
              <div>
                <div className="label flex items-center justify-between font-medium not-italic text-ink/50">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] tracking-tightest sm:text-6xl">
                  {project.title}
                </h3>
                <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/75">
                  {project.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="label rounded-full border border-ink/15 px-3 py-1.5 font-medium not-italic text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="label self-start rounded-full bg-ink px-6 py-3 font-semibold not-italic text-paper transition-transform hover:-translate-y-0.5"
              >
                Close ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
