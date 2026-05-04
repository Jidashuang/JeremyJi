import Link from "next/link";
import type { Case } from "@/lib/schemas";

type CaseCardProps = {
  c: Case;
  index: number;
};

export function CaseCard({ c, index }: CaseCardProps) {
  const heroBg = c.heroBrandColorEnd
    ? `linear-gradient(135deg, ${c.heroBrandColor}, ${c.heroBrandColorEnd})`
    : c.heroBrandColor;

  return (
    <article
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        aria-hidden
        style={{
          aspectRatio: "16 / 10",
          background: heroBg,
          display: "grid",
          placeItems: "center",
          color: "rgba(255,255,255,0.85)",
          fontFamily: "var(--font-serif)",
          fontSize: "32px",
          fontWeight: 500,
        }}
      >
        {c.brand}
      </div>
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <span className="eyebrow">{`Case ${String(index + 1).padStart(2, "0")} · ${c.sector} · ${c.year}`}</span>
          <span className="eyebrow">{c.brand}</span>
        </div>
        <h3 className="h-display-m" style={{ marginBottom: "14px" }}>{c.brand}</h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "var(--t-body-l)",
            lineHeight: 1.5,
            borderLeft: "2px solid var(--warm)",
            paddingLeft: "14px",
            margin: "0 0 14px",
          }}
        >
          &ldquo;{c.thinkingQuote}&rdquo;
        </p>
        <Link
          href={`/proof-of-work/${c.slug}`}
          className="eyebrow"
          style={{
            marginTop: "auto",
            paddingTop: "14px",
            borderTop: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        >
          Read full case →
        </Link>
      </div>
    </article>
  );
}
