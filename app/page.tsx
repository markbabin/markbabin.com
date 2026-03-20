import { NeonTitle } from "@/components/neon-title";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="fixed bottom-8 right-8">
        <NeonTitle />
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-64 w-full">
        <Link
          href="/writing"
          className="text-4xl italic font-bold transition-colors hover:text-[#8ACE00]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rants
        </Link>
        <Link
          href="/photos"
          className="text-4xl font-bold uppercase tracking-wider transition-colors hover:text-[#8ACE00]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Photos
        </Link>
        <a
          href="https://bandcamp.com/trulsone"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl font-bold transition-colors hover:text-[#8ACE00]"
          style={{ fontFamily: "var(--font-bitcount-ink)" }}
        >
          Music
        </a>
      </div>
    </div>
  );
}
