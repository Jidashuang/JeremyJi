import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PlayCard } from "@/components/cards/play-card";

const FUTURE = [
  { title: "Media Mix Simulator", note: "Channel choices by goal — interactive in V1" },
  { title: "Japan Trend Scan", note: "Track and translate cultural signals — V1" },
  { title: "Creative Brief Generator", note: "Messy ask → clear brief — V1" },
];

export default function PlaygroundPage() {
  return (
    <SiteShell current="playground">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="04" label="Playground" trailing="Capability demos" />
        <h1 className="h-display-l" style={{ maxWidth: "22ch", marginBottom: "14px" }}>
          不是作品集 ——<br />是思维方式的演示区。
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "28px" }}>
          <PlayCard
            index={1}
            slug="campaign-teardown"
            title="Campaign Teardown"
            description="给我一个最近上市的品牌，我把它的传播打法拆开给你看。"
            sampleInput="喜茶 × FENDI 联名"
            sampleOutput="6 段诊断 · 3 个不足 · 2 条改进建议"
          />
          <PlayCard
            index={2}
            slug="audience-mapper"
            title="Audience Mapper"
            description="一个品类 → 一张受众分层逻辑图。"
            sampleInput="30+ 女性身体护理"
            sampleOutput="4 层人群 · 各自痛点 · 媒介触点"
          />
        </div>

        <h2 className="h-display-m" style={{ marginTop: "60px" }}>Future demos</h2>
        <p className="caption" style={{ marginBottom: "20px" }}>需要真接入 LLM 才有意义的，留给 V1。</p>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {FUTURE.map((f) => (
            <div key={f.title} style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <h3 className="h-3">{f.title}</h3>
              <p className="caption">{f.note}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
