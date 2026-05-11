import Image from "next/image";
import type { FeedItem } from "@/lib/schemas";

type FeedCardProps = {
  item: FeedItem;
};

const FORMAT_LABEL: Record<FeedItem["format"], string> = {
  article: "Article",
  video: "Video",
  podcast: "Podcast",
  note: "Field Note",
  source: "Source",
};

const FORMAT_ACCENT: Record<FeedItem["format"], string> = {
  article: "var(--gradient-article)",
  video:   "var(--gradient-video)",
  podcast: "var(--gradient-podcast)",
  note:    "var(--paper-2)",
  source:  "var(--paper-2)",
};

export function FeedCard({ item }: FeedCardProps) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "block",
        color: "var(--ink)",
      }}
    >
      <div style={{ aspectRatio: "4 / 3", background: FORMAT_ACCENT[item.format], position: "relative" }}>
        {item.image ? <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} /> : null}
        {item.format === "video" ? (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} aria-hidden />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "white", fontSize: "32px", opacity: 0.95 }} aria-hidden>▶</div>
          </>
        ) : null}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <span className="eyebrow">{FORMAT_LABEL[item.format]} · {item.area}</span>
        <h4 className="h-3" style={{ fontSize: "16px", margin: "6px 0 8px", lineHeight: 1.3, fontWeight: 500, fontFamily: "var(--font-serif)" }}>
          {item.title}
        </h4>
        {item.summary ? <p className="caption">{item.summary}</p> : null}
      </div>
    </a>
  );
}
