import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "./fonts/Cormorant[wght].ttf", style: "normal" },
    { path: "./fonts/Cormorant-Italic[wght].ttf", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

const ebGaramond = localFont({
  src: [
    { path: "./fonts/EBGaramond[wght].ttf", style: "normal" },
    { path: "./fonts/EBGaramond-Italic[wght].ttf", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Tecnico Lombardo — Geom. Marco Lombardo",
  description:
    "Studio Tecnico Lombardo — Geometra a Locate Varesino (CO). Direzione lavori, valutazioni, rilievi GNSS RTK, urbanistica, sviluppo immobiliare.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${cormorant.variable} ${ebGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
