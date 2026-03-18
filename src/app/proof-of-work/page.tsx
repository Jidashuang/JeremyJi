import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { careerTimeline, credentialGroups, proofCases, proofMetrics } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Proof of Work | Jeremy Ji",
  description:
    "Verified outcomes, campaign cases, and career timeline for Jeremy Ji across media strategy and communication roles.",
};

export default function ProofOfWorkPage() {
  return (
    <SiteShell current="proof-of-work">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Cases / Metrics / Timeline</span>
        </div>

        <div className="feed-hero">
          <div className="area-copy">
            <p className="eyebrow">Proof of Work</p>
            <h1 className="area-title">Evidence first, claims second</h1>
            <p className="area-summary">
              这里把简历里最有证明力的部分独立出来：预算范围、真实项目、结果变化、能力轨迹和工具栈。
            </p>
          </div>

          <div className="signal-pill">
            <strong>Resume</strong>
            <a className="button button-inline" href="/JeremyJi-Resume.docx" download>
              Download Resume
            </a>
          </div>
        </div>

        <div className="proof-stats proof-stats-wide">
          {proofMetrics.map((item) => (
            <article className="metric-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <article className="area-card">
          <p className="card-kicker">Selected cases</p>
          <div className="proof-case-stack">
            {proofCases.map((item) => (
              <article className="proof-case-card" key={item.title}>
                <div className="proof-case-head">
                  <h2>{item.title}</h2>
                  <span>{item.client}</span>
                  <em>{item.period}</em>
                </div>
                <p>{item.summary}</p>
                <p className="card-kicker">Role: {item.role}</p>
                <ul className="detail-list">
                  {item.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
                <p className="card-kicker">Approach</p>
                <ul className="detail-list">
                  {item.approach.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
                <p className="card-kicker">Stack</p>
                <div className="area-chip-row">
                  {item.stack.map((entry) => (
                    <span className="area-chip" key={entry}>
                      {entry}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </article>

        <div className="proof-bottom-grid">
          <article className="area-card">
            <p className="card-kicker">Career timeline</p>
            <div className="timeline-list">
              {careerTimeline.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.period}`}>
                  <h3>{item.company}</h3>
                  <strong>{item.role}</strong>
                  <em>{item.period}</em>
                  <p>{item.summary}</p>
                  <ul className="detail-list">
                    {item.bullets.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </article>

          <article className="area-card">
            <p className="card-kicker">Credentials and tools</p>
            <div className="credential-grid">
              {credentialGroups.map((group) => (
                <article className="credential-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="detail-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
