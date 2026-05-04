import type { FeedItem } from "./schemas";
import { AREA_SLUGS } from "./schemas";

export type AreaFilter = (typeof AREA_SLUGS)[number] | "all";

export function filterByArea(items: FeedItem[], area: AreaFilter): FeedItem[] {
  if (area === "all") return items;
  return items.filter((i) => i.area === area);
}

export function sortByDateDesc(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
