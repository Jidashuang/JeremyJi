import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { domains, playgroundExperiments } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Playground | Jeremy Ji",
  description:
    "Interactive capability demos for Jeremy Ji's strategy, audience diagnosis, and content-channel reframing.",
};

export default function PlaygroundPage() {
  return (
    <SiteShell current="playground">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Capability demos</span>
        </div>

        <div className="feed-hero">
          <div className="area-copy">
            <p className="eyebrow">Playground</p>
            <h1 className="area-title">How Jeremy solves problems</h1>
            <p className="area-summary">
              这里不是作品堆砌区，而是方法展示区。每个模块都对应你真实工作中会做的拆解动作。
            </p>
          </div>

          <div className="signal-pill">
            <strong>Current direction</strong>
            <p>先用可读卡片定义模块，再逐步升级成可交互 demo。</p>
          </div>
        </div>

        <div className="playground-gallery">
          {playgroundExperiments.map((item) => (
            <article className="playground-showcase-card" key={item.title}>
              <p className="card-kicker">{item.status}</p>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <strong>{item.prompt}</strong>
              <em>{item.output}</em>
            </article>
          ))}
        </div>

        <article className="area-card">
          <p className="card-kicker">Mapped back to domain pages</p>
          <div className="area-chip-row">
            {domains.map((item) => (
              <Link className="area-chip" key={item.slug} href={`/areas/${item.slug}`}>
                {item.shortLabel}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
