import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PlayCard } from "@/components/cards/play-card";

export function PlaygroundTeaser() {
  return (
    <section className="section">
      <SectionNumberBar number="04" label="Playground" trailing="Capability demos" />
      <h2 className="h-display-l" style={{ maxWidth: "22ch", marginBottom: "14px" }}>
        不是作品集 ——<br />是思维方式的演示区。
      </h2>
      <p className="body-l measure" style={{ marginBottom: "24px" }}>每个模块对应我实际工作中的拆解动作。</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <PlayCard
          index={1}
          slug="campaign-teardown"
          title="Campaign Teardown"
          description="给我一个最近上市的品牌，我把它的传播打法拆开给你看：媒介组合、内容路径、漏斗判断，哪里行哪里不行。"
          sampleInput="喜茶 × FENDI 联名"
          sampleOutput="6 段诊断 · 3 个不足 · 2 条改进建议"
        />
        <PlayCard
          index={2}
          slug="audience-mapper"
          title="Audience Mapper"
          description="一个品类 → 一张受众分层逻辑图。展示我做 segmentation 的实际推理路径，不是 PPT 里的圈层图。"
          sampleInput="30+ 女性身体护理"
          sampleOutput="4 层人群 · 各自痛点 · 媒介触点"
        />
      </div>
    </section>
  );
}
