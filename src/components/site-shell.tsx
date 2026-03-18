import type { ReactNode } from "react";
import Link from "next/link";
import { pageLinks } from "@/data/site-content";

type SiteShellProps = {
  children: ReactNode;
  current: string;
};

export function SiteShell({ children, current }: SiteShellProps) {
  return (
    <main className="page">
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">JJ</span>
          <span className="brand-copy">
            Jeremy Ji
            <span>media / culture / systems / photography</span>
          </span>
        </Link>

        <nav className="topnav" aria-label="Primary">
          {pageLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.key === current ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer className="footer">
        <p>Jeremy Ji</p>
        <span>
          Japanese culture, media strategy, content systems, photography, and AI-native
          workflows.
        </span>
      </footer>
    </main>
  );
}
