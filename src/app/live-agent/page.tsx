"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { faqEntries } from "@/data/live-agent";
import { matchFAQ } from "@/lib/faq-router";
import type { FAQEntry } from "@/lib/schemas";

export default function LiveAgentPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const matched: FAQEntry | null = submitted ? matchFAQ(submitted, faqEntries) : null;
  const noMatch = submitted !== null && submitted.trim() !== "" && matched === null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(query);
    setActiveIdx(null);
  }

  return (
    <SiteShell current="agent">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="06" label="Live Agent" trailing="Static knowledge router · LLM integration pending" />

        <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "12px", padding: "32px 36px", marginTop: "20px" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>$ ask jeremy</span>
          <h1 className="h-display-m" style={{ margin: "12px 0 22px", color: "var(--paper)" }}>
            一个读过我所有内容的 AI 分身。
          </h1>
          <p className="body" style={{ opacity: 0.75, color: "var(--paper)", maxWidth: "60ch" }}>
            建立在文章、案例、方法论之上。下面输入关键词，或者点开下方预设问题看示范回答。
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="试试 'brief'、'日本'、'CV'、'媒介'…"
              aria-label="Ask Jeremy"
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)", color: "var(--paper)",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px",
                padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "13px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--warm)", color: "var(--paper)", border: 0, borderRadius: "6px",
                padding: "0 18px", fontFamily: "var(--font-mono)", fontSize: "12px",
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >
              Ask
            </button>
          </form>

          {matched ? (
            <div style={{ marginTop: "22px", padding: "20px", background: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
              <p className="eyebrow" style={{ color: "var(--warm)" }}>Routed to · {matched.id}</p>
              <h2 className="h-3" style={{ color: "var(--paper)", margin: "8px 0 14px" }}>{matched.question}</h2>
              <div className="body" style={{ color: "var(--paper)", opacity: 0.92, whiteSpace: "pre-line" }}>
                {matched.answer}
              </div>
              {matched.followUp.length > 0 ? (
                <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {matched.followUp.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      style={{
                        color: "var(--warm)", fontFamily: "var(--font-mono)", fontSize: "12px",
                        border: "1px solid var(--warm)", padding: "6px 12px", borderRadius: "4px",
                      }}
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {noMatch ? (
            <div style={{ marginTop: "22px", padding: "16px 20px", background: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
              <p className="caption" style={{ color: "var(--paper)", opacity: 0.7 }}>
                没匹配到关键词。试试下方预设问题，或者把问题换个说法。
              </p>
            </div>
          ) : null}
        </div>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>预设问题</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
          {faqEntries.map((p, i) => (
            <li key={p.id} style={{ borderTop: "1px solid var(--line)" }}>
              <button
                type="button"
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", background: "transparent", border: 0,
                  padding: "16px 0", color: "var(--ink)",
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
                <div className="body" style={{ padding: "0 0 22px 28px", whiteSpace: "pre-line" }}>
                  {p.answer}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

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

        <p className="caption" style={{ marginTop: "24px", opacity: 0.6, fontFamily: "var(--font-mono)", fontSize: "11px" }}>
          Static knowledge router · LLM integration pending
        </p>
      </section>
    </SiteShell>
  );
}
