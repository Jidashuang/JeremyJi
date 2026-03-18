import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { agentCapabilities, agentPrompts, agentSources } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Live Agent | Jeremy Ji",
  description:
    "A blueprint for Jeremy Ji's live AI agent, grounded in real archives, proof cases, and domain logic.",
};

export default function LiveAgentPage() {
  return (
    <SiteShell current="live-agent">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Agent / Knowledge base</span>
        </div>

        <div className="feed-hero">
          <div className="area-copy">
            <p className="eyebrow">Live Agent</p>
            <h1 className="area-title">An agent that sounds like Jeremy, not generic AI</h1>
            <p className="area-summary">
              这个页面定义 agent 的知识边界、检索来源和回答模式，确保它建立在真实内容而不是空泛生成上。
            </p>
          </div>

          <div className="agent-terminal">
            <p className="terminal-label">$ ask-jeremy-agent</p>
            <ul className="prompt-list">
              {agentPrompts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="agent-capability-grid">
          {agentCapabilities.map((item) => (
            <article className="agent-capability-card" key={item.title}>
              <p className="card-kicker">{item.sources.join(" / ")}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.prompt}</strong>
            </article>
          ))}
        </div>

        <article className="area-card">
          <p className="card-kicker">Knowledge sources</p>
          <div className="source-grid">
            {agentSources.map((item) => (
              <article className="source-card" key={item.title}>
                {item.image ? (
                  <div className="source-image">
                    <Image src={item.image} alt={item.title} width={1000} height={1000} />
                  </div>
                ) : null}
                <div className="source-copy">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
