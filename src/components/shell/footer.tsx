const SOCIAL = [
  { href: "https://www.zhihu.com/people/ji-qing-qiu", label: "Zhihu" },
  { href: "https://space.bilibili.com/6963341", label: "Bilibili" },
  { href: "https://www.instagram.com/jeremyjee/", label: "Instagram" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="section"
      style={{
        marginTop: "var(--section-gap)",
        paddingTop: "28px",
        borderTop: "1px solid var(--line-strong)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "24px",
        alignItems: "center",
      }}
    >
      <span className="eyebrow">Vol. 01 — 2026 Spring · Shanghai</span>
      <span style={{ fontFamily: "var(--font-serif)", fontSize: "14px" }}>
        Jeremy Ji · © {year}
      </span>
      <nav aria-label="Social" style={{ textAlign: "right", display: "flex", gap: "16px", justifyContent: "flex-end" }}>
        {SOCIAL.map((s) => (
          <a key={s.href} className="eyebrow" href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
