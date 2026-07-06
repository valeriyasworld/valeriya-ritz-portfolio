"use client";

/**
 * Fixed minimal navigation. Uses mix-blend-difference so it stays white on
 * the black showreel and flips to black on the white sections — no scroll
 * listeners needed.
 */

import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-5 text-white md:px-10">
        <a
          href="#showreel"
          className="micro pointer-events-auto font-bold tracking-[0.22em]"
        >
          <span className="hidden sm:inline">Valeriya Ritz</span>
          <span className="sm:hidden">VR</span>
        </a>

        <ul className="pointer-events-auto flex items-center gap-4 md:gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="micro link-line transition-opacity hover:opacity-100 md:opacity-70"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
