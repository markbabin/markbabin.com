import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Oswald, Bitcount_Ink, Source_Code_Pro, Jersey_10 } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

const bitcountInk = Bitcount_Ink({
  variable: "--font-bitcount-ink",
  subsets: ["latin"],
  weight: ["700"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["700"],
});

const jersey10 = Jersey_10({
  variable: "--font-jersey-10",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://babinmark.com"),
  title: {
    default: "Mark Babin",
    template: "%s — Mark Babin",
  },
  description:
    "Mark Babin — makes beats, breaks code, shoots photos, and writes stuff nobody asked for.",
  icons: {
    icon: "/mbfavicon.png?v=2",
    apple: "/mbfavicon.png?v=2",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mark Babin",
    title: "Mark Babin",
    description:
      "Mark Babin — makes beats, breaks code, shoots photos, and writes stuff nobody asked for.",
    url: "https://babinmark.com",
  },
  twitter: {
    card: "summary",
    title: "Mark Babin",
    description:
      "Mark Babin — makes beats, breaks code, shoots photos, and writes stuff nobody asked for.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`black ${jetbrainsMono.variable} ${playfair.variable} ${oswald.variable} ${bitcountInk.variable} ${sourceCodePro.variable} ${jersey10.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <div className="mx-auto w-full max-w-2xl px-6 flex flex-col min-h-full flex-1">
          <Nav />
          <main className="flex-1 py-8">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
