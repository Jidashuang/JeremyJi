import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import {
  bilibiliPlaylistLinks,
  channels,
  domains,
  featuredFeedEntries,
  zhihuPortalLinks,
  legacyArchiveLinks,
  sourceModes,
  zhihuArticles,
} from "@/data/site-content";

const articleCategories = [
  { key: "All About Japan", label: "🇯🇵 All About Japan" },
  { key: "Marketing Insights", label: "🎯 Marketing Insights" },
  { key: "Design", label: "🍎 Design" },
  { key: "Essay", label: "📖 随笔" },
] as const;

export const metadata: Metadata = {
  title: "Thinking Feed | Jeremy Ji",
  description:
    "A structured feed for Jeremy Ji's writing, video, podcast, visual notes, and research archives.",
};

function isExternal(href?: string) {
  return href ? !href.startsWith("/") : false;
}

export default function ThinkingFeedPage() {
  return (
    <SiteShell current="thinking-feed">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Thinking Feed</span>
        </div>

        <div className="feed-hero feed-hero-media">
          <div className="area-copy">
            <p className="eyebrow">Writing / Video / Podcast / Visual / Research</p>
            <h1 className="area-title">Thinking Feed</h1>
            <p className="area-summary">
              这个页面把你的网站从“模块说明”推进到“内容入口”。重点不是把所有内容一次铺满，而是先把最能代表你的内容流和入口建立起来。
            </p>
            <div className="cta-row">
              <Link className="button button-inline" href="/gallery">
                Open Gallery
              </Link>
            </div>
          </div>

          <div className="feed-hero-visual">
            <Image src="/video-office-japanese.jpg" alt="Thinking Feed preview" width={1219} height={754} />
          </div>
        </div>

        <div className="channel-grid">
          {channels.map((item) => (
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
              <p>{item.note}</p>
              {item.verifiedAt ? <em>{item.verifiedAt}</em> : null}
            </a>
          ))}
        </div>

        <div className="feed-domain-row">
          {domains.map((domain) => (
            <Link className="domain-card" key={domain.slug} href={`/areas/${domain.slug}`}>
              <p className="card-kicker">{domain.shortLabel}</p>
              <h2>{domain.name}</h2>
              <p>{domain.summary}</p>
              <span>Open domain</span>
            </Link>
          ))}
        </div>

        <article className="area-card">
          <p className="card-kicker">Featured entries</p>
          <div className="feed-entry-grid">
            {featuredFeedEntries.map((entry) =>
              entry.href ? (
                <a
                  className={`feed-entry-card${entry.image ? " feed-entry-card-media" : ""}`}
                  key={entry.title}
                  href={entry.href}
                  target={isExternal(entry.href) ? "_blank" : undefined}
                  rel={isExternal(entry.href) ? "noreferrer" : undefined}
                >
                  {entry.image ? (
                    <div className="feed-entry-image">
                      <Image src={entry.image} alt={entry.title} width={1219} height={754} />
                    </div>
                  ) : null}
                  <div className="feed-entry-copy">
                    <span>{entry.format}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    <em>{entry.domain}</em>
                    {entry.note ? <strong>{entry.note}</strong> : null}
                  </div>
                </a>
              ) : (
                <div className="feed-entry-card" key={entry.title}>
                  <div className="feed-entry-copy">
                    <span>{entry.format}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    <em>{entry.domain}</em>
                    {entry.status ? <strong>{entry.status}</strong> : null}
                  </div>
                </div>
              ),
            )}
          </div>
        </article>

        <article className="area-card">
          <p className="card-kicker">Zhihu article and answer entry points</p>
          <div className="link-grid">
            {zhihuPortalLinks.map((item) => (
              <a className="link-card" key={item.title} href={item.href} target="_blank" rel="noreferrer">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>Open link</span>
              </a>
            ))}
          </div>
        </article>

        <article className="area-card">
          <p className="card-kicker">Bilibili video links from the original site</p>
          <div className="link-grid">
            {bilibiliPlaylistLinks.map((item) => (
              <a className="link-card" key={item.title} href={item.href} target="_blank" rel="noreferrer">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>Watch on Bilibili</span>
              </a>
            ))}
          </div>
        </article>

        <article className="area-card">
          <p className="card-kicker">How the input system works</p>
          <div className="source-grid source-grid-compact">
            {sourceModes.map((item) => (
              <article className="source-card source-card-minimal" key={item.title}>
                <div className="source-copy">
                  <p className="card-kicker">Source mode</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        {articleCategories.map((cat) => {
          const articles = zhihuArticles.filter((a) => a.category === cat.key);
          return (
            <article className="area-card" key={cat.key}>
              <p className="card-kicker">Zhihu archive / {cat.key}</p>
              <h2 className="area-card-title">{cat.label}</h2>
              <div className="article-grid">
                {articles.map((article) => (
                  <a
                    className="article-card"
                    key={article.title}
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="article-thumb">
                      <img src={article.image} alt={article.title} loading="lazy" />
                    </div>
                    <div className="article-copy">
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <span>Read on Zhihu ↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </article>
          );
        })}

        <article className="area-card">
          <p className="card-kicker">Legacy archive bridges</p>
          <div className="area-entry-list">
            {legacyArchiveLinks.map((entry) => (
              <div className="area-entry" key={entry.title}>
                <span>{entry.format}</span>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
                <em>{entry.domain}</em>
                <a href={entry.href} target="_blank" rel="noreferrer">
                  Open archive
                </a>
              </div>
            ))}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
