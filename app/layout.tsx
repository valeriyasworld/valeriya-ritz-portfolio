import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";

/*
 * FALLBACK FONTS ONLY.
 * The real typefaces are Nyght (headlines) and Aeonik (body) — see the
 * @font-face block in globals.css. Once you drop the font files into
 * /public/fonts/ these two Google fonts silently become invisible backups.
 */
const bodyFallback = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-fallback",
  display: "swap",
});

const displayFallback = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valeriya Ritz — Portfolio 2026",
  description:
    "Digital products, visual systems, motion, films and small personal contradictions. Currently moving from digital design into creative direction and filmmaking.",
  openGraph: {
    title: "Valeriya Ritz — Portfolio 2026",
    description:
      "I design systems. I direct stories. Digital design moving into creative direction and film.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFallback.variable} ${displayFallback.variable}`}>
      <body>{children}</body>
    </html>
  );
}
