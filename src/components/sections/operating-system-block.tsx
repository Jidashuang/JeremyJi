import Link from "next/link";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PullQuote } from "@/components/primitives/pull-quote";
import type { Principle, Domain } from "@/lib/schemas";

type OSBlockProps = {
  principles: Principle[];
  domains: Domain[];
  pullQuote: string;
};

export function OperatingSystemBlock({ principles, domains, pullQuote }: OSBlockProps) {
  return (
    <section className="section">
      <SectionNumberBar number="01" label="My Operating System" trailing="How I observe, decide, execute" />
      <h2 className="h-display-l" style={{ maxWidth: "22ch", marginBottom: "18px" }}>
        长期关注的，真正擅长的，持续输出的。
      </h2>
      <p className="body-l measure">
        日本、营销、设计、Field Notes —— 这四条线不是独立爱好，而是互相渗透的认知系统。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginTop: "28px" }}>
        {principles.map((p) => (
          <div key={p.number} style={{ padding: "18px 0", borderTop: "1px solid var(--line)" }}>
            <span className="eyebrow" style={{ color: "var(--warm)" }}>{p.number}</span>
            <h3 className="h-3" style={{ margin: "8px 0" }}>{p.headline}</h3>
            <p className="caption">{p.explanation}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "28px" }}>
        {domains.map((d) => (
          <Link
            key={d.slug}
            href={`/areas/${d.slug}`}
            style={{
              padding: "14px 16px",
              border: "1px solid var(--line)",
              borderRadius: "6px",
              background: "var(--paper)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span className="eyebrow">{d.shortLabel}</span>
              <h4 className="h-display-m" style={{ fontSize: "18px", marginTop: "4px" }}>{d.name}</h4>
            </div>
            <span className="eyebrow">→</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "36px" }}>
        <PullQuote>{pullQuote}</PullQuote>
      </div>
    </section>
  );
}
