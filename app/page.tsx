/**
 * Valeriya Ritz — one-page portfolio.
 *
 * Flow (structural reference: Hero Studios; narrative pacing: YEQQ):
 *   1. Showreel  — watch / feel the work first
 *   2. Intro     — understand who is behind it
 *   3. Context   — how each step changed the thinking
 *   4. Manifest  — what it's all for
 *   5. Work      — explore the projects
 *   6. Contact   — this is your sign
 *
 * All copy + media paths live in lib/content.ts.
 */

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full">
      <Nav />
      <Hero />
      <Intro />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
