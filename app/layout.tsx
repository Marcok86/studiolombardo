import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/content";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display rinascimentale: capitali ispirate alle iscrizioni romane.
// Usato per i momenti cerimoniali (eyebrow, titoli, citazione Leonardo).
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Studio Tecnico Lombardo — Geometra a Locate Varesino (CO)",
  description:
    "Dal 2014 progettiamo, costruiamo e valorizziamo immobili per privati, imprese e investitori. Progettazione, direzione lavori, pratiche edilizie, perizie, rilievi GNSS e APE. Richiedi una consulenza.",
  keywords: [
    "geometra Locate Varesino",
    "studio tecnico Como",
    "progettazione",
    "direzione lavori",
    "pratiche edilizie",
    "CILA SCIA",
    "perizie immobiliari",
    "rilievi topografici",
    "APE certificato energetico",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE.url,
    siteName: SITE.legalName,
    title: "Studio Tecnico Lombardo — Geometra a Locate Varesino (CO)",
    description:
      "Dal 2014 un unico referente tecnico per privati, imprese e investitori. Progettazione, direzione lavori, pratiche edilizie, perizie e rilievi.",
    images: ["/assets/hero/hero-03-central-climax.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.legalName,
  image: `${SITE.url}/assets/hero/hero-03-central-climax.webp`,
  url: SITE.url,
  email: SITE.email,
  telephone: "+390331363564",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via S. Antonio n. 5",
    postalCode: "22070",
    addressLocality: "Locate Varesino",
    addressRegion: "CO",
    addressCountry: "IT",
  },
  founder: { "@type": "Person", name: "Geom. Marco Lombardo" },
  foundingDate: "2014",
  areaServed: "Provincia di Como e Lombardia",
  vatID: "03090650130",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${cinzel.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
