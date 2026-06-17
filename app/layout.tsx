import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const grotesk = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valeriya Ritz — Media Designer",
  description:
    "Media Designer from Ukraine, currently creating in Germany. Identities, digital experiences and emotional stories.",
  openGraph: {
    title: "Valeriya Ritz — Media Designer",
    description:
      "Identities, digital experiences and emotional stories. Portfolio 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body className="font-grotesk bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
