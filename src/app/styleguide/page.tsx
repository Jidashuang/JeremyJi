import { Eyebrow } from "@/components/primitives/eyebrow";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PullQuote } from "@/components/primitives/pull-quote";
import { HairlineRule } from "@/components/primitives/hairline-rule";
import { Pill } from "@/components/primitives/pill";
import { Tag } from "@/components/primitives/tag";
import { DownloadButton } from "@/components/primitives/download-button";

export default function StyleguidePage() {
  return (
    <main className="page">
      <section className="section" style={{ padding: "40px 0" }}>
        <h1 className="h-display-l">Styleguide</h1>
        <p className="body-l measure">Every primitive at every variant. Internal QA only.</p>

        <HairlineRule variant="strong" />
        <h2 className="h-display-m" style={{ marginTop: "32px" }}>Type</h2>
        <p className="h-display-xl">display-xl 84/0.95</p>
        <p className="h-display-l">display-l 56/1.04</p>
        <p className="h-display-m">display-m 36/1.12</p>
        <p className="h-3">h3 22/1.30</p>
        <p className="body-l">body-l 18/1.65 — 媒介策略师 · 日本文化观察者 · 内容创作者。</p>
        <p className="body">body 15/1.65 — Reading culture as signal, writing it into campaigns.</p>
        <Eyebrow>01 / Operating system — Eyebrow mono caps</Eyebrow>
        <p className="caption">caption 13/1.50 — Bicester Village · 2022 · KOC + local search</p>

        <HairlineRule variant="strong" />
        <h2 className="h-display-m" style={{ marginTop: "32px" }}>Section number bar</h2>
        <SectionNumberBar number="01" label="My Operating System" trailing="How I observe, decide, execute" />

        <h2 className="h-display-m">Pull quote</h2>
        <PullQuote cite="JJ — operating note">
          I don&apos;t write about Japan as a hobby — I read Japan as a market signal.
        </PullQuote>

        <h2 className="h-display-m">Hairline rules</h2>
        <HairlineRule variant="strong" />
        <p className="caption">strong (3px ink) ↑</p>
        <HairlineRule />
        <p className="caption">default (1px line) ↑</p>
        <HairlineRule variant="warm" />
        <p className="caption">warm (1px warm-orange) ↑</p>

        <h2 className="h-display-m">Pills</h2>
        <Pill variant="solid" href="/proof-of-work">Proof of Work</Pill>
        {" "}
        <Pill href="/thinking-feed">Thinking Feed</Pill>
        {" "}
        <Pill href="/live-agent">Talk to Live Agent</Pill>

        <h2 className="h-display-m">Tags</h2>
        <Tag>Default</Tag> <Tag variant="solid">Solid</Tag> <Tag variant="warm">Warm</Tag>

        <h2 className="h-display-m">Download buttons</h2>
        <DownloadButton href="/cv/jeremy-ji-cv-en.pdf">↓ Download CV · EN</DownloadButton>
        {" "}
        <DownloadButton href="/cv/jeremy-ji-cv-cn.pdf" variant="ghost">↓ CV · 中文</DownloadButton>

      </section>
    </main>
  );
}
