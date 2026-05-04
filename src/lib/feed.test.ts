import { describe, it, expect } from "vitest";
import { filterByArea, sortByDateDesc } from "./feed";
import type { FeedItem } from "./schemas";

const items: FeedItem[] = [
  { id: "1", title: "A", format: "article", area: "japan",     href: "x", date: "2024-08-01" },
  { id: "2", title: "B", format: "video",   area: "marketing", href: "x", date: "2025-01-15" },
  { id: "3", title: "C", format: "podcast", area: "japan",     href: "x", date: "2025-03-20" },
  { id: "4", title: "D", format: "article", area: "design",    href: "x", date: "2024-11-30" },
];

describe("feed", () => {
  it("filterByArea returns all items when area is 'all'", () => {
    expect(filterByArea(items, "all")).toHaveLength(4);
  });

  it("filterByArea returns only matching area", () => {
    expect(filterByArea(items, "japan")).toHaveLength(2);
  });

  it("sortByDateDesc puts newest first", () => {
    const sorted = sortByDateDesc(items);
    expect(sorted[0].date).toBe("2025-03-20");
    expect(sorted[3].date).toBe("2024-08-01");
  });

  it("sortByDateDesc does not mutate the input", () => {
    const before = [...items];
    sortByDateDesc(items);
    expect(items).toEqual(before);
  });
});
