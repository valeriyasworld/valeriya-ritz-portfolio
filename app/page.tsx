"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TypographicSection from "@/components/TypographicSection";
import InteractiveMediaSlot from "@/components/InteractiveMediaSlot";
import FloatingLabel from "@/components/FloatingLabel";
import FeelingWords from "@/components/FeelingWords";
import ShowreelSection from "@/components/ShowreelSection";
import ProjectModal from "@/components/ProjectModal";
import ContactSection from "@/components/ContactSection";
import {
  heroPortrait,
  processMedia,
  projects,
  feelingWords,
  philosophyMedia,
} from "@/lib/data";
import type { Project } from "@/lib/data";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <main id="top" className="relative w-full">
      <Header />

      {/* 1 — HERO ----------------------------------------------------------- */}
      <TypographicSection
        id="hero"
        surround={
          <>
            <FloatingLabel className="left-5 top-28 sm:left-12 sm:top-1/3" delay={0.2}>
              Get to know me
            </FloatingLabel>
            <FloatingLabel
              className="bottom-28 left-6 sm:bottom-1/4 sm:left-20"
              delay={0.35}
            >
              The mind behind
            </FloatingLabel>
            <FloatingLabel className="right-5 top-32 sm:right-14 sm:top-1/3" delay={0.5}>
              Portfolio 2026
            </FloatingLabel>
          </>
        }
        body={
          <span className="italic">
            Scroll to discover the person through type, motion and small visual
            fragments.
          </span>
        }
      >
        I am{" "}
        <InteractiveMediaSlot
          images={[heroPortrait]}
          mode="single"
          card={{
            title: "Valeriya Ritz",
            body: "Media Designer from Ukraine, currently creating in Germany. I design identities, digital experiences and emotional stories.",
          }}
        />{" "}
        Valeriya
      </TypographicSection>

      {/* 1.5 — SHOWREEL (portrait grows into a reel of every work) --------- */}
      <ShowreelSection />

      {/* 2 — CREATION ------------------------------------------------------- */}
      <TypographicSection
        id="create"
        surround={
          <FloatingLabel className="right-6 top-28 sm:right-16 sm:top-1/4" delay={0.2}>
            Process · Craft
          </FloatingLabel>
        }
        body="I move between branding, interaction, film and storytelling — creating systems that people can feel, not just look at."
      >
        I create{" "}
        <InteractiveMediaSlot
          images={processMedia}
          mode="collage"
          card={{
            title: "Inside the studio",
            body: "Sketches, moodboards, wireframes, behind-the-scenes and visual experiments.",
          }}
        />{" "}
        Experiences
      </TypographicSection>

      {/* 3 — STORIES / WORK ------------------------------------------------- */}
      <TypographicSection
        id="work"
        surround={
          <>
            <FloatingLabel className="left-6 top-28 sm:left-16 sm:top-1/4" delay={0.2}>
              Selected work
            </FloatingLabel>
            <FloatingLabel
              className="bottom-24 right-6 sm:bottom-1/4 sm:right-20"
              delay={0.35}
            >
              Hover · then click
            </FloatingLabel>
          </>
        }
        body="Five stories told in identity, interaction and film. Open any one to step inside."
      >
        I tell{" "}
        <InteractiveMediaSlot
          images={projects.map((p) => p.media)}
          mode="rotating"
          interval={2200}
          perItemCards={projects.map((p) => ({
            title: `${p.title} — ${p.year}`,
            body: p.description,
          }))}
          onActiveClick={(i) => setActiveProject(projects[i])}
        />{" "}
        Stories
      </TypographicSection>

      {/* quick project index under the statement */}
      <nav className="relative z-20 -mt-16 mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProject(p)}
            className="label font-medium not-italic text-ink/45 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {p.title}
          </button>
        ))}
      </nav>

      {/* 4 — PHILOSOPHY ----------------------------------------------------- */}
      <TypographicSection
        id="feel"
        compact
        surround={
          <FloatingLabel className="left-6 top-24 sm:left-16 sm:top-1/4" delay={0.2}>
            Why it matters
          </FloatingLabel>
        }
        body="Design is not just decoration. It is a way to create emotion, attention and meaning."
      >
        I make{" "}
        <InteractiveMediaSlot
          images={[philosophyMedia]}
          mode="single"
          card={{
            title: "Emotion first",
            body: "I design for the feeling someone is left with — long after the screen goes dark.",
          }}
        />{" "}
        People feel
      </TypographicSection>

      {/* scroll-revealed feeling words */}
      <section className="relative z-20 mx-auto -mt-10 mb-32 w-full px-6">
        <FeelingWords words={feelingWords} />
      </section>

      {/* 5 — CONTACT -------------------------------------------------------- */}
      <ContactSection />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}
