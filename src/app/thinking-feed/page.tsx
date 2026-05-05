"use client";

import { useState, useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { FeedCard } from "@/components/cards/feed-card";
import { TagFilterBar } from "@/components/feed/tag-filter-bar";
import { filterByArea, type AreaFilter } from "@/lib/feed";
import { getAllFeedItems } from "@/components/feed/feed-grid";

const ALL = getAllFeedItems();

export default function ThinkingFeedPage() {
  const [active, setActive] = useState<AreaFilter>("all");
  const items = useMemo(() => filterByArea(ALL, active), [active]);

  return (
    <SiteShell current="feed">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="03" label="Thinking Feed" trailing="Articles · Videos · Podcasts · Field Notes" />
        <h1 className="h-display-l" style={{ maxWidth: "24ch", marginBottom: "14px" }}>
          文章、视频、播客、笔记 ——<br />不分开过日子。
        </h1>
        <p className="body-l measure" style={{ marginBottom: "24px" }}>一个混合 feed。tag 切，不按格式切。</p>

        <TagFilterBar active={active} onChange={setActive} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {items.map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      </section>
    </SiteShell>
  );
}
