import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import {
  agentCapabilities,
  agentPrompts,
  channels,
  contactEndpoints,
  domains,
  interfaceTracks,
  playgroundExperiments,
  proofCases,
  proofMetrics,
  publicSignals,
} from "@/data/site-content";

const feedPreview = [
  {
    title: "如何用日文说我爱你",
    note: "Bilibili / Japan",
    href: "https://www.bilibili.com/video/BV1at411k71b",
    image: "/video-love-you.jpg",
  },
  {
    title: "在东京用得上的日语词",
    note: "Bilibili / Japan",
    href: "https://www.bilibili.com/video/BV18t411B7Bm",
    image: "/video-tokyo-words.jpg",
  },
  {
    title: "职场日语指南",
    note: "Bilibili / Work",
    href: "https://www.bilibili.com/video/BV11t411T74H",
    image: "/video-office-japanese.jpg",
  },
  {
    title: "日语中骂人的话",
    note: "Bilibili / Culture",
    href: "https://www.bilibili.com/video/BV1Ab411z7Bd",
    image: "/video-swearing.jpg",
  },
  {
    title: "鲨鱼和自我陶醉",
    note: "Bilibili / Storytelling",
    href: "https://www.bilibili.com/video/BV1ht41187PD",
    image: "/video-shark-story.jpg",
  },
];

export default function Home() {
  return (
    <SiteShell current="home">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Shanghai · Japan · Media · Design · Photography</p>
          <h1 className="hero-title">Jeremy Ji</h1>
          <p className="hero-body">
            媒介策略师，日本文化观察者，内容创作者。我关心的不只是广告怎么投，
            而是品牌如何在真实语境里被人记住。这里是我的个人操作系统。
          </p>

          <div className="cta-row">
            <Link className="button" href="/thinking-feed">
              进入 Thinking Feed
            </Link>
            <Link className="button button-ghost" href="/playground">
              Playground
            </Link>
            <Link className="button button-ghost" href="/proof-of-work">
              Proof of Work
            </Link>
          </div>

          <div className="quote-stack">
            <div className="quote-card">
              <p>广告狗，KOP，The Cure 死忠，喜爱摄影，略懂日本文化。</p>
            </div>
            <div className="quote-card quote-card-jp">
              <p>ドジで、のろまで、勉強が嫌いで、でもずっと観察している人。</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <article className="media-card media-card-video">
            <Image
              src="/video-tokyo-words.jpg"
              alt="Jeremy 的日语教室"
              width={1219}
              height={754}
              priority
            />
            <div className="media-overlay">
              <span>Bilibili</span>
              <strong>Jeremy 的日语教室</strong>
            </div>
          </article>

          <article className="media-card media-card-illustration">
            <Image
              src="/jeremy-portrait.jpg"
              alt="Jeremy Ji"
              width={500}
              height={500}
            />
          </article>

          <article className="note-card">
            <p className="card-kicker">About this site</p>
            <strong>Personal OS, not a résumé page.</strong>
            <p>先看一个人，再看他的证明。</p>
          </article>

          <article className="media-card media-card-mini">
            <Image src="/studio-note.jpg" alt="Visual note" width={1000} height={1000} />
          </article>
        </div>
      </section>

      {/* ── Signal bar ───────────────────────────────────── */}
      <section className="signal-bar section section-compact">
        {publicSignals.map((item) => (
          <article className="signal-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      {/* ── Page portals ─────────────────────────────────── */}
      <section className="section section-compact">
        <div className="portal-grid">
          {[
            { href: "/playground", kicker: "Capability demos", title: "Playground", text: "我如何拆解一个传播问题、定义受众、调校内容方向。" },
            { href: "/thinking-feed", kicker: "Writing / Video / Podcast", title: "Thinking Feed", text: "知乎、B 站、播客、照片、信息源，全部在这里。" },
            { href: "/gallery", kicker: "Photography / Visual notes", title: "Gallery", text: "照片是我观察世界的另一种语言。" },
            { href: "/interface", kicker: "Contact / Collaboration", title: "Interface", text: "如果你想找我合作，这里说清楚了适合哪些项目。" },
            { href: "/proof-of-work", kicker: "Cases / Metrics / Resume", title: "Proof of Work", text: "Nintendo、Bicester、Range Rover——这些是可以验证的工作。" },
          ].map((item) => (
            <Link className="portal-card" key={item.href} href={item.href}>
              <p className="card-kicker">{item.kicker}</p>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <span>Open page</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 01 My Operating System ───────────────────────── */}
      <section className="section" id="operating-system">
        <div className="section-header">
          <p className="eyebrow">01 / My Operating System</p>
          <h2>我长期关注的，我真正擅长的，我持续输出的。</h2>
          <p>
            日本、营销、设计、Field Notes——这四条线不是独立爱好，而是互相渗透的认知系统。
          </p>
        </div>

        <div className="domain-grid domain-grid-home">
          {domains.map((item) => (
            <Link className="domain-card" key={item.slug} href={`/areas/${item.slug}`}>
              <p className="card-kicker">{item.shortLabel}</p>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <span>Open domain page</span>
            </Link>
          ))}
        </div>

        <div className="os-principle-grid">
          {[
            { title: "I study people through media behavior.", text: "我不先写观点再找证据；我先看用户怎么搜、怎么停留、怎么被说服。" },
            { title: "I connect culture to execution.", text: "日本、设计、美学，这些是会真实影响传播判断的输入源，不是装饰。" },
            { title: "I like systems, not isolated campaigns.", text: "我更关心品牌如何建立长期媒介逻辑，而不是一次爆款。" },
            { title: "I work across strategy and making.", text: "从框架到 brief，从媒介组合到执行节奏，我习惯把链条拉通。" },
          ].map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="channel-grid channel-grid-compact">
          {channels.slice(0, 3).map((item) => (
            <a
              className="channel-card"
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="channel-head">
                {item.image ? (
                  <div className="channel-avatar">
                    <Image src={item.image} alt={item.name} width={240} height={240} />
                  </div>
                ) : null}
                <div className="channel-meta">
                  <p className="card-kicker">{item.platform}</p>
                  <h3>{item.name}</h3>
                  <span>{item.handle}</span>
                </div>
              </div>
              <strong>{item.audience}</strong>
            </a>
          ))}
        </div>
      </section>

      {/* ── 02 Playground ────────────────────────────────── */}
      <section className="section" id="playground">
        <div className="section-header">
          <p className="eyebrow">02 / Playground</p>
          <h2>不是作品集，是思维方式的演示区。</h2>
          <p>
            每个模块都对应一个我实际工作中会做的拆解动作：诊断传播问题、定义受众、判断内容和渠道是否匹配。
          </p>
          <div className="cta-row">
            <Link className="button" href="/playground">
              Open Playground
            </Link>
          </div>
        </div>

        <div className="playground-grid playground-grid-home">
          {playgroundExperiments.slice(0, 4).map((item, index) => (
            <article className="play-card" key={item.title}>
              <p className="play-index">{String(index + 1).padStart(2, "0")}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <strong>{item.prompt}</strong>
            </article>
          ))}
        </div>
      </section>

      {/* ── 03 Thinking Feed ─────────────────────────────── */}
      <section className="section" id="thinking-feed">
        <div className="section-header">
          <p className="eyebrow">03 / Thinking Feed</p>
          <h2>文章、视频、播客、照片——不应该分开过日子。</h2>
          <p>
            知乎有 4,578 个关注者、143 个回答、57 篇文章。B 站有日语教室系列。
            这些内容加在一起，才是完整的 Jeremy。
          </p>
          <div className="cta-row">
            <Link className="button" href="/thinking-feed">
              Open Feed Page
            </Link>
          </div>
        </div>

        <div className="video-strip video-strip-wide">
          {feedPreview.map((item) => (
            <a className="video-card" key={item.title} href={item.href} target="_blank" rel="noreferrer">
              <Image src={item.image} alt={item.title} width={1219} height={754} />
              <div className="video-copy">
                <p>{item.note}</p>
                <strong>{item.title}</strong>
              </div>
            </a>
          ))}
        </div>

        <div className="feed-domain-row">
          {domains.map((item) => (
            <Link className="shelf-card" key={item.slug} href={`/areas/${item.slug}`}>
              <p className="card-kicker">{item.shortLabel}</p>
              <h3>{item.name}</h3>
              <p>{item.signal}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 04 Interface ─────────────────────────────────── */}
      <section className="section" id="interface">
        <div className="section-header">
          <p className="eyebrow">04 / Interface</p>
          <h2>联系我，不如说是调用我。</h2>
          <p>
            最直接的方式：带上背景、目标和卡点来找我。我更擅长处理有具体问题的合作，
            而不是泛泛的"聊聊看"。
          </p>
          <div className="cta-row">
            <Link className="button" href="/interface">
              Open Interface
            </Link>
          </div>
        </div>

        <div className="interface-layout">
          <div className="interface-grid">
            {interfaceTracks.map((item) => (
              <article className="protocol-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="detail-list">
                  {item.goodFor.slice(0, 2).map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="contact-card">
            <p className="card-kicker">Contact endpoints</p>
            <ul className="contact-list">
              {contactEndpoints.slice(0, 4).map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ── 05 Proof of Work ─────────────────────────────── */}
      <section className="section" id="proof-of-work">
        <div className="section-header">
          <p className="eyebrow">05 / Proof of Work</p>
          <h2>7 年，1.5 亿预算，可验证的结果。</h2>
          <p>
            Nintendo、Bicester Village、Range Rover、PUMA——这些项目里有实际的数字和可以描述的方法。
          </p>
          <div className="cta-row">
            <Link className="button" href="/proof-of-work">
              Open Proof Page
            </Link>
          </div>
        </div>

        <div className="proof-stats">
          {proofMetrics.slice(0, 6).map((item) => (
            <article className="metric-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="case-grid">
          {proofCases.slice(0, 4).map((item) => (
            <article className="case-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="detail-list">
                {item.results.slice(0, 2).map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── 06 Live Agent ────────────────────────────────── */}
      <section className="section" id="live-agent">
        <div className="section-header">
          <p className="eyebrow">06 / Live Agent</p>
          <h2>一个读过我所有内容的 AI 分身。</h2>
          <p>
            它建立在我的文章、案例和方法论之上，不是通用聊天机器人。
            可以问它关于我的项目、内容、工作方式的任何问题。
          </p>
          <div className="cta-row">
            <Link className="button" href="/live-agent">
              Open Live Agent
            </Link>
          </div>
        </div>

        <div className="agent-layout">
          <div className="agent-terminal">
            <p className="terminal-label">$ ask-jeremy-agent</p>
            <ul className="prompt-list">
              {agentPrompts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="agent-capability-grid">
            {agentCapabilities.slice(0, 3).map((item) => (
              <article className="agent-capability-card" key={item.title}>
                <p className="card-kicker">{item.sources.join(" / ")}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.prompt}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

    </SiteShell>
  );
}
