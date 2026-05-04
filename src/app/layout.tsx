import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Playfair_Display,
  Space_Grotesk,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from "next/font/google";
import "./globals.css";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const cnSerif = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cn-serif",
  preload: false,
});

const cnSans = Noto_Sans_SC({
  weight: ["400", "500", "600"],
  variable: "--font-cn-sans",
  preload: false,
});

export const metadata: Metadata = {
  title: "Jeremy Ji | Operating System for Media Strategy",
  description:
    "A standalone personal site for Jeremy Ji, focused on media strategy, proof of work, cultural research, and AI-native workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} ${cnSerif.variable} ${cnSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
