import Link from "next/link";

type NavLink = { key: string; href: string; label: string };

type TopbarProps = {
  current: string;
  links: NavLink[];
};

export function Topbar({ current, links }: TopbarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: "0.9rem",
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        margin: "0 auto 1.3rem",
        padding: "0.95rem 1.05rem",
        width: "min(var(--container-max), 100%)",
        border: "1px solid var(--line)",
        borderRadius: "999px",
        background: "rgba(255, 250, 242, 0.82)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem" }}>
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            background: "var(--ink)",
            color: "var(--paper)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
          }}
        >
          JJ
        </span>
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 500 }}>Jeremy Ji</span>
          <span className="eyebrow">media · culture · systems</span>
        </span>
      </Link>

      <nav aria-label="Primary" style={{ display: "flex", gap: "20px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.key === current ? "page" : undefined}
            style={{ color: item.key === current ? "var(--warm)" : "var(--ink)" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
