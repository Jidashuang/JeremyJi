import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { FeedCard } from "@/components/cards/feed-card";
import { domains } from "@/data/domains";
import { filterByArea, sortByDateDesc } from "@/lib/feed";
import { getAllFeedItems } from "@/components/feed/feed-grid";

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return notFound();

  const items = sortByDateDesc(filterByArea(getAllFeedItems(), domain.slug));
  const recent = items.slice(0, 12);

  return (
    <SiteShell current="feed">
      <article className="section" style={{ paddingTop: "20px" }}>
        <Eyebrow>{domain.shortLabel}</Eyebrow>
        <h1 className="h-display-l" style={{ marginTop: "12px" }}>{domain.name}</h1>
        <div className="body-l measure" style={{ marginTop: "24px", whiteSpace: "pre-line" }}>
          {domain.manifesto}
        </div>

        <div style={{ marginTop: "60px" }}>
          <SectionNumberBar number="•" label="Recent in this area" />
        </div>
        {recent.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {recent.map((item) => <FeedCard key={item.id} item={item} />)}
          </div>
        ) : (
          <p className="caption">还没有内容索引到这个 area。Phase 4 task 54 会补 field notes。</p>
        )}
      </article>
    </SiteShell>
  );
}
