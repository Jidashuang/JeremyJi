import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { DownloadButton } from "@/components/primitives/download-button";
import { CaseCard } from "@/components/cards/case-card";
import type { Case } from "@/lib/schemas";

type Job = { when: string; role: string; who: string };

type PoWBlockProps = {
  cases: Case[];
  timeline: Job[];
};

export function ProofOfWorkBlock({ cases, timeline }: PoWBlockProps) {
  return (
    <section className="section">
      <SectionNumberBar number="02" label="Proof of Work" trailing="Cases & career" />
      <h2 className="h-display-l" style={{ maxWidth: "18ch", marginBottom: "20px" }}>
        我做过的事，<br />我学到的事。
      </h2>
      <p className="body-l measure" style={{ marginBottom: "8px" }}>
        7 年代理商，从汽车到游戏到奥莱到 FMCG。下面是几个有代表性的项目，以及它们教会我的判断。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "28px" }}>
        {cases.map((c, i) => <CaseCard key={c.slug} c={c} index={i} />)}
      </div>

      <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--line)" }}>
        {timeline.map((j) => (
          <div key={j.when} style={{ padding: "18px 14px", borderRight: "1px solid var(--line)" }}>
            <span className="eyebrow">{j.when}</span>
            <h4 className="h-display-m" style={{ fontSize: "17px", margin: "6px 0 4px" }}>{j.role}</h4>
            <span className="caption">{j.who}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <DownloadButton href="/cv/jeremy-ji-cv-en.pdf">↓ Download CV · EN</DownloadButton>
        <DownloadButton href="/cv/jeremy-ji-cv-cn.pdf" variant="ghost">↓ CV · 中文</DownloadButton>
      </div>
    </section>
  );
}
