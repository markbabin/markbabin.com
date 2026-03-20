import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Oswald, Bitcount_Ink, Source_Code_Pro } from "next/font/google";

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

export const metadata: Metadata = {
  title: {
    default: "Mark Babin",
    template: "%s — Mark Babin",
  },
  description: "Articles and photos by Mark Babin.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
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
      className={`black ${jetbrainsMono.variable} ${playfair.variable} ${oswald.variable} ${bitcountInk.variable} ${sourceCodePro.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <div className="mx-auto w-full max-w-2xl px-6 flex flex-col min-h-full flex-1">
          <Nav />
          <main className="flex-1 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
