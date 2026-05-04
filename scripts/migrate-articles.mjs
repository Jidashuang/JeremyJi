// One-shot migration: old articles.json → new FeedItemSchema shape.
// Run once with: node scripts/migrate-articles.mjs
import fs from "node:fs";
import path from "node:path";

const SRC = "src/data/feed/articles.json";
const old = JSON.parse(fs.readFileSync(SRC, "utf8"));

const AREA_MAP = {
  "All About Japan": "japan",
  "Marketing Insights": "marketing",
  "Design": "design",
  "Essay": "field-notes",
};

// Approximate date by zhihu URL post-id ordering (lower = older).
// We map ID ranges to monthly buckets for stable sort, not historical truth.
function approximateDate(url) {
  const m = url.match(/\/p\/(\d+)/);
  if (!m) return "2020-01-01";
  const id = parseInt(m[1], 10);
  // Linearly interpolate between 2016-04 and 2024-06 by id bucket
  const minId = 21000000;
  const maxId = 400000000;
  const startMs = new Date("2016-04-01").getTime();
  const endMs = new Date("2024-06-01").getTime();
  const ratio = Math.max(0, Math.min(1, (id - minId) / (maxId - minId)));
  const ms = startMs + ratio * (endMs - startMs);
  const d = new Date(ms);
  return d.toISOString().slice(0, 10);
}

function decodeHtml(s) {
  return (s || "")
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/ /g, " ");
}

function summarize(s) {
  const txt = decodeHtml(s).trim();
  if (!txt) return undefined;
  // Cut at first sentence boundary or 100 chars.
  const cut = txt.match(/^(.{20,140}?[。.!?！？])/);
  return cut ? cut[1].trim() : txt.slice(0, 120) + "…";
}

const transformed = old
  .map((item) => {
    const idMatch = item.url.match(/\/p\/(\d+)/);
    const id = idMatch ? `zhihu-${idMatch[1]}` : `zhihu-${item.url.slice(-8)}`;
    const area = AREA_MAP[item.category];
    if (!area) {
      console.warn(`Unknown category: ${item.category} (skipping ${item.title})`);
      return null;
    }
    return {
      id,
      title: item.title,
      format: "article",
      area,
      href: item.url,
      date: approximateDate(item.url),
      summary: summarize(item.description),
    };
  })
  .filter(Boolean)
  // Sort newest first for predictable order
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

fs.writeFileSync(SRC, JSON.stringify(transformed, null, 2) + "\n");
console.log(`Migrated ${transformed.length} items.`);
