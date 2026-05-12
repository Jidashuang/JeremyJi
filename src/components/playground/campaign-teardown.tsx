"use client";

import { useState } from "react";
import Link from "next/link";
import { campaignPresets } from "@/data/playground/campaign-teardown-presets";
import { lookupPreset } from "@/lib/playground-presets";
import type { CampaignPreset, TeardownBlocks } from "@/lib/schemas";

// V2 placeholder: when a backend endpoint exists, POST { input } here for a
// dynamic teardown. W2 only uses the static preset path. Do NOT enable in V1.
// const CAMPAIGN_TEARDOWN_WEBHOOK_URL = "/api/playground/campaign-teardown";

const BLOCK_LABELS: Array<{ key: keyof TeardownBlocks; label: string; n: string }> = [
  { key: "problemFraming", label: "Problem framing", n: "01" },
  { key: "audience",       label: "Audience",        n: "02" },
  { key: "channelMix",     label: "Channel mix",     n: "03" },
  { key: "pacing",         label: "Pacing",          n: "04" },
  { key: "creativeFit",    label: "Creative fit",    n: "05" },
];

export function CampaignTeardown() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const matched: CampaignPreset | null = selectedId
    ? campaignPresets.find((p) => p.id === selectedId) ?? null
    : submitted
      ? lookupPreset(submitted, campaignPresets)
      : null;

  const noMatch = submitted !== null && submitted.trim() !== "" && !selectedId && matched === null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSelectedId(null);
    setSubmitted(query);
  }

  return (
    <div style={{ marginTop: "28px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入品牌/campaign 名（V1 支持 Nintendo CNY 和 Range Rover 旗舰）"
          aria-label="Campaign input"
          style={{
            flex: 1, background: "var(--paper-2)", color: "var(--ink)",
            border: "1px solid var(--line)", borderRadius: "6px",
            padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "13px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "var(--ink)", color: "var(--paper)", border: 0, borderRadius: "6px",
            padding: "0 18px", fontFamily: "var(--font-mono)", fontSize: "12px",
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Teardown
        </button>
      </form>

      <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <span className="eyebrow" style={{ alignSelf: "center" }}>Or pick a preset:</span>
        {campaignPresets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => { setSelectedId(p.id); setSubmitted(null); setQuery(""); }}
            style={{
              background: selectedId === p.id ? "var(--ink)" : "transparent",
              color: selectedId === p.id ? "var(--paper)" : "var(--ink)",
              border: "1px solid var(--line)", borderRadius: "20px",
              padding: "6px 14px", fontFamily: "var(--font-mono)", fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {noMatch ? (
        <div style={{ marginTop: "22px", padding: "16px 20px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "8px" }}>
          <p className="caption">
            V1 没匹配到这个 campaign 的预设拆解。点上面任意一个 preset chip 看一遍示范输出。
          </p>
        </div>
      ) : null}

      {matched ? (
        <div style={{ marginTop: "28px" }}>
          <p className="eyebrow" style={{ color: "var(--warm)" }}>Teardown · {matched.label}</p>
          <div style={{ display: "grid", gap: "16px", marginTop: "14px" }}>
            {BLOCK_LABELS.map((b) => (
              <article
                key={b.key}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  padding: "20px 22px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px" }}>
                  <span style={{ color: "var(--warm)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>{b.n}</span>
                  <span className="eyebrow">{b.label}</span>
                </div>
                <p className="body" style={{ whiteSpace: "pre-line" }}>{matched.blocks[b.key]}</p>
              </article>
            ))}
          </div>
          {matched.resultLink ? (
            <Link
              href={matched.resultLink.href}
              style={{
                display: "inline-block", marginTop: "20px",
                color: "var(--warm)", fontFamily: "var(--font-mono)", fontSize: "12px",
                border: "1px solid var(--warm)", padding: "8px 16px", borderRadius: "4px",
              }}
            >
              {matched.resultLink.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
