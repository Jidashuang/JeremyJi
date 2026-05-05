"use client";

import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { prompts } from "@/data/live-agent";

export default function LiveAgentPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <SiteShell current="agent">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="06" label="Live Agent" trailing="Static V0 — backend in Phase 6" />

        <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "12px", padding: "32px 36px", marginTop: "20px" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>$ ask jeremy</span>
          <h1 className="h-display-m" style={{ margin: "12px 0 22px", color: "var(--paper)" }}>
            一个读过我所有内容的 AI 分身。
          </h1>
          <p className="body" style={{ opacity: 0.75, color: "var(--paper)", maxWidth: "60ch" }}>
            建立在文章、案例、方法论之上。点击一个问题看示范回答。
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginTop: "24px" }}>
            {prompts.map((p, i) => (
              <li key={p.question} style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", background: "transparent", border: 0,
                    padding: "16px 0", color: "var(--paper)",
                    fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "17px",
                    cursor: "pointer",
                    display: "flex", alignItems: "baseline", gap: "14px",
                  }}
                >
                  <span style={{ color: "var(--warm)", fontFamily: "var(--font-mono)", fontStyle: "normal" }}>?</span>
                  <span>{p.question}</span>
                  <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: "12px", fontFamily: "var(--font-mono)" }}>{activeIdx === i ? "−" : "+"}</span>
                </button>
                {activeIdx === i ? (
                  <div className="body" style={{ color: "var(--paper)", padding: "0 0 22px 28px", whiteSpace: "pre-line" }}>
                    {p.answer}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>What this knows · What this won&apos;t do</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <div style={{ padding: "20px", border: "1px solid var(--line)", borderRadius: "8px" }}>
            <p className="eyebrow">Knows</p>
            <ul className="caption" style={{ paddingLeft: "16px", marginTop: "8px" }}>
              <li>Jeremy 的文章 / 公众号</li>
              <li>4 个完整 case writeup</li>
              <li>2 个 playground walkthrough</li>
              <li>4 个 area manifesto</li>
              <li>CV 内容</li>
            </ul>
          </div>
          <div style={{ padding: "20px", border: "1px solid var(--line)", borderRadius: "8px" }}>
            <p className="eyebrow">Won&apos;t do</p>
            <ul className="caption" style={{ paddingLeft: "16px", marginTop: "8px" }}>
              <li>不替 Jeremy 拍板</li>
              <li>不模仿 Jeremy 写作风格做新内容</li>
              <li>对未公开的项目 say nothing</li>
              <li>没看过的题目，会 routing 到 /interface</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
