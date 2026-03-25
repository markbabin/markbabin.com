"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/photos", label: "Photos" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center py-6">
      <div className="flex items-center gap-6">
        {links.map(({ href, label }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                active
                  ? "text-[#e8855c] font-medium"
                  : "text-zinc-400 hover:text-[#e8855c]"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <a
          href="https://github.com/markbabin"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-zinc-400 hover:text-[#e8855c] transition-colors"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-[1.25em]">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            github
          </span>
        </a>
        <a
          href="mailto:mark@markbabin.com"
          className="relative group text-zinc-400 hover:text-[#e8855c] transition-colors"
          aria-label="Email"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[1.25em]">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13 2 4" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            email
          </span>
        </a>
        <a
          href="https://www.instagram.com/belopidiko/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-zinc-400 hover:text-[#e8855c] transition-colors"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[1.25em]">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            instagram
          </span>
        </a>
        <a
          href="https://buymeacoffee.com/markbabin"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-zinc-400 hover:text-[#e8855c] transition-colors"
          aria-label="Buy Me a Coffee"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[1.25em]">
            <path d="M17 8h1a4 4 0 010 8h-1" />
            <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
            <path d="M6 1v3" />
            <path d="M10 1v3" />
            <path d="M14 1v3" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            buy me a coffee
          </span>
        </a>
      </div>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
