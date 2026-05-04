import Link from "next/link";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { Tag } from "@/components/primitives/tag";
import { FeedCard } from "@/components/cards/feed-card";
import type { FeedItem } from "@/lib/schemas";

type ThinkingFeedTeaserProps = {
  items: FeedItem[];
};

const TAG_LABELS = ["All", "Japan", "Marketing", "Design", "Field Notes", "Media"];

export function ThinkingFeedTeaser({ items }: ThinkingFeedTeaserProps) {
  return (
    <section className="section">
      <SectionNumberBar number="03" label="Thinking Feed" trailing="Articles · Videos · Podcasts · Field Notes" />
      <h2 className="h-display-l" style={{ maxWidth: "24ch", marginBottom: "14px" }}>
        文章、视频、播客、笔记 ——<br />不分开过日子。
      </h2>
      <p className="body-l measure" style={{ marginBottom: "24px" }}>一个混合 feed。tag 切，不按格式切。</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
        {TAG_LABELS.map((t, i) => <Tag key={t} active={i === 0}>{t}</Tag>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        {items.slice(0, 4).map((item) => <FeedCard key={item.id} item={item} />)}
      </div>

      <div style={{ marginTop: "22px" }}>
        <Link href="/thinking-feed" className="eyebrow">Open Feed Page →</Link>
      </div>
    </section>
  );
}
