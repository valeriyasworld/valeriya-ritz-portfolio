import type { Metadata } from "next";
import Link from "next/link";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Experience & Education — Valeriya Ritz",
  description:
    "Career and education of Valeriya Ritz — media design, brand, film and the road into creative direction.",
};

/**
 * /about — EXPERIENCE & EDUCATION
 * The full career/education timeline moved here from the homepage, so the
 * one-pager keeps its narrative flow and this page has room for detail.
 * Minimal header (signature = back home), same b/w editorial system.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-6 md:px-10">
      {/* minimal header: signature = back home */}
      <header className="flex items-center justify-between">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo.png"
            alt="Valeriya Ritz"
            className="h-11 w-auto md:h-12"
          />
        </Link>
        <Link href="/" className="micro link-line">
          ← Back
        </Link>
      </header>

      <div className="mx-auto mt-20 max-w-4xl md:mt-28">
        <h1 className="statement !text-[clamp(2.4rem,6vw,5.5rem)]">
          Experience <em className="serif">&amp;</em> Education
        </h1>

        <div className="mt-16 md:mt-24">
          <Timeline />
        </div>

        {/* room to grow: CV download, portrait, longer story… */}
      </div>
    </main>
  );
}
