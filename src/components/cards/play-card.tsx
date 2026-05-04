import Link from "next/link";

type PlayCardProps = {
  index: number;
  slug: string;
  title: string;
  description: string;
  sampleInput: string;
  sampleOutput: string;
};

export function PlayCard(p: PlayCardProps) {
  return (
    <article style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px 26px" }}>
      <span className="eyebrow" style={{ color: "var(--warm)" }}>DEMO / {String(p.index).padStart(2, "0")}</span>
      <h3 className="h-display-m" style={{ margin: "10px 0 12px", fontSize: "26px" }}>{p.title}</h3>
      <p className="body" style={{ marginBottom: "14px" }}>{p.description}</p>
      <div style={{
        background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "6px",
        padding: "14px", fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: 1.6, color: "var(--muted)",
      }}>
        <strong style={{ color: "var(--ink)" }}>Sample input:</strong> {p.sampleInput}<br />
        <strong style={{ color: "var(--ink)" }}>Output:</strong> {p.sampleOutput}
      </div>
      <Link href={`/playground/${p.slug}`} className="eyebrow" style={{ display: "inline-block", marginTop: "14px" }}>
        Try this demo →
      </Link>
    </article>
  );
}
