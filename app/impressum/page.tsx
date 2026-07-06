import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — Valeriya Ritz",
  robots: { index: false },
};

/**
 * Impressum (legal notice, § 5 TMG). Plain server-rendered page in the same
 * black-and-white editorial style as the main site. The main anchor nav is
 * intentionally absent — just the name as a way back home.
 */

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl tracking-tight md:text-3xl">
        {label}
      </h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-grey">
        {children}
      </div>
    </div>
  );
}

export default function Impressum() {
  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-6 md:px-10">
      {/* minimal header: name = back home */}
      <header className="flex items-center justify-between">
        <Link href="/" className="micro font-bold tracking-[0.22em]">
          Valeriya Ritz
        </Link>
        <Link href="/" className="micro link-line">
          ← Back
        </Link>
      </header>

      <div className="mx-auto mt-20 max-w-2xl md:mt-28">
        <h1 className="statement !text-[clamp(2.6rem,7vw,6rem)]">Impressum</h1>

        <Block label="Angaben gemäß § 5 TMG">
          <p>
            <span className="text-black">Name</span>
            <br />
            Valeriya Ritz
          </p>
          <p>
            <span className="text-black">Anschrift</span>
            <br />
            Saumweg 8
            <br />
            88214 Ravensburg
          </p>
          <p>
            <span className="text-black">Kontakt</span>
            <br />
            <a href="mailto:valeriyaritz@gmail.com" className="link-line">
              valeriyaritz@gmail.com
            </a>
          </p>
        </Block>

        <Block label="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
          <p>
            Valeriya Ritz
            <br />
            Saumweg 8
            <br />
            88214 Ravensburg
          </p>
        </Block>

        <Block label="Haftung für Inhalte">
          <p>
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
            erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
            Inhalte kann jedoch keine Gewähr übernommen werden.
          </p>
        </Block>

        <Block label="Haftung für Links">
          <p>
            Diese Website enthält Links zu externen Webseiten Dritter. Auf
            deren Inhalte habe ich keinen Einfluss. Für die Inhalte der
            verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>
        </Block>

        <Block label="Urheberrecht">
          <p>
            Die auf dieser Website veröffentlichten Inhalte, Bilder, Videos
            und sonstigen Werke unterliegen dem Urheberrecht. Eine
            Vervielfältigung, Bearbeitung oder Verwendung außerhalb der
            Grenzen des Urheberrechts bedarf der vorherigen schriftlichen
            Zustimmung, sofern nicht anders angegeben.
          </p>
        </Block>
      </div>
    </main>
  );
}
