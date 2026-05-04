import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { domainMap, domains } from "@/data/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function isInternal(href?: string) {
  return href ? href.startsWith("/") : false;
}

export async function generateStaticParams() {
  return domains.map((domain) => ({ slug: domain.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = domainMap[slug];

  if (!domain) {
    return {};
  }

  return {
    title: `${domain.name} | Jeremy Ji`,
    description: domain.summary,
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const domain = domainMap[slug];

  if (!domain) {
    notFound();
  }

  return (
    <SiteShell current="areas">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Domain page</span>
        </div>

        <div className="area-hero area-hero-media">
          <div className="area-copy">
            <p className="eyebrow">{domain.shortLabel}</p>
            <h1 className="area-title">{domain.name}</h1>
            <p className="area-summary">{domain.summary}</p>
            <div className="signal-pill">
              <strong>Signal</strong>
              <p>{domain.signal}</p>
            </div>
          </div>

          <div className="area-visual">
            <Image src={domain.image} alt={domain.name} width={1219} height={754} />
          </div>
        </div>

        <div className="area-detail-grid">
          <article className="area-card">
            <p className="card-kicker">What Jeremy is strong at here</p>
            <ul className="area-list">
              {domain.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </article>

          <article className="area-card">
            <p className="card-kicker">What he pays attention to</p>
            <ul className="area-list">
              {domain.lenses.map((lens) => (
                <li key={lens}>{lens}</li>
              ))}
            </ul>
          </article>

          <article className="area-card">
            <p className="card-kicker">How it translates into work</p>
            <ul className="area-list">
              {domain.translations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className="area-card">
          <p className="card-kicker">Representative outputs</p>
          <div className="area-entry-list">
            {domain.outputs.map((entry) => (
              <div className="area-entry" key={entry.title}>
                <span>{entry.format}</span>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
                {entry.href ? (
                  isInternal(entry.href) ? (
                    <Link href={entry.href}>{entry.ctaLabel ?? "Open page"}</Link>
                  ) : (
                    <a href={entry.href} target="_blank" rel="noreferrer">
                      {entry.ctaLabel ?? "Open source"}
                    </a>
                  )
                ) : null}
                {entry.status ? <em>{entry.status}</em> : null}
              </div>
            ))}
          </div>
        </article>

        <article className="area-card">
          <p className="card-kicker">Start here</p>
          <div className="feed-entry-grid">
            {domain.starterKit.map((entry) =>
              entry.href ? (
                isInternal(entry.href) ? (
                  <Link
                    className={`feed-entry-card${entry.image ? " feed-entry-card-media" : ""}`}
                    key={entry.title}
                    href={entry.href}
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
                      {entry.ctaLabel ? <strong>{entry.ctaLabel}</strong> : null}
                    </div>
                  </Link>
                ) : (
                  <a
                    className={`feed-entry-card${entry.image ? " feed-entry-card-media" : ""}`}
                    key={entry.title}
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
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
                      {entry.ctaLabel ? <strong>{entry.ctaLabel}</strong> : null}
                    </div>
                  </a>
                )
              ) : (
                <div className="feed-entry-card" key={entry.title}>
                  <div className="feed-entry-copy">
                    <span>{entry.format}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </article>

        <div className="area-footer">
          <p className="card-kicker">Other domains</p>
          <div className="area-chip-row">
            {domains
              .filter((item) => item.slug !== domain.slug)
              .map((item) => (
                <Link className="area-chip" key={item.slug} href={`/areas/${item.slug}`}>
                  {item.shortLabel}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
