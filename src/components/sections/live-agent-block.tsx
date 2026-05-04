import Link from "next/link";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { prompts } from "@/data/live-agent";

export function LiveAgentBlock() {
  // Homepage shows 4 of 5 prompts as a teaser; full set lives on /live-agent.
  const homepagePrompts = prompts.slice(0, 4);

  return (
    <section className="section">
      <SectionNumberBar number="06" label="Live Agent" trailing="A version of Jeremy you can query · v0 static" />
      <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "12px", padding: "32px 36px" }}>
        <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>$ ask jeremy</span>
        <h3 className="h-display-m" style={{ margin: "12px 0 22px", color: "var(--paper)" }}>
          一个读过我所有内容的 AI 分身。
        </h3>
        <p style={{ opacity: 0.75, margin: "0 0 22px", fontSize: "14px", lineHeight: 1.6, maxWidth: "60ch" }}>
          建立在我的文章、案例、方法论之上。问它关于我的项目、内容、工作方式的任何问题。
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {homepagePrompts.map((p) => (
            <li key={p.question} style={{
              padding: "14px 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "17px",
              display: "flex", alignItems: "baseline", gap: "14px",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", color: "var(--warm)", fontSize: "14px" }}>?</span>
              {p.question}
            </li>
          ))}
        </ul>
        <Link href="/live-agent" style={{
          display: "inline-block", marginTop: "22px",
          padding: "10px 16px", borderRadius: "6px",
          border: "1px solid var(--paper)", color: "var(--paper)",
          fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
        }}>
          Open Live Agent →
        </Link>
      </div>
    </section>
  );
}
