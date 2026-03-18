import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { contactEndpoints, interfaceRules, interfaceTracks } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Interface | Jeremy Ji",
  description:
    "A protocol-style collaboration page describing how to work with Jeremy Ji across strategy, content, and research projects.",
};

export default function InterfacePage() {
  return (
    <SiteShell current="interface">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Protocol / Contact</span>
        </div>

        <div className="feed-hero">
          <div className="area-copy">
            <p className="eyebrow">Interface</p>
            <h1 className="area-title">Contact is a protocol, not a form</h1>
            <p className="area-summary">
              你可以把这页当接口文档：什么问题适合来，来之前最好准备什么，我会输出什么。
            </p>
          </div>

          <div className="signal-pill">
            <strong>Best first message</strong>
            <p>项目背景 + 当前目标 + 卡点 + 时间要求 + 现有素材</p>
          </div>
        </div>

        <div className="interface-showcase-grid">
          {interfaceTracks.map((item) => (
            <article className="protocol-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p className="card-kicker">Good for</p>
              <ul className="detail-list">
                {item.goodFor.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
              <p className="card-kicker">Deliverables</p>
              <ul className="detail-list">
                {item.deliverables.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="area-card">
          <p className="card-kicker">Working rules</p>
          <div className="rule-grid">
            {interfaceRules.map((rule) => (
              <article className="rule-card" key={rule.title}>
                <h3>{rule.title}</h3>
                <p>{rule.detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="area-card">
          <p className="card-kicker">Endpoints</p>
          <ul className="endpoint-list">
            {contactEndpoints.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.value}
                </a>
                <em>{item.note}</em>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </SiteShell>
  );
}
