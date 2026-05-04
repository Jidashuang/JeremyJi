import { describe, it, expect } from "vitest";
import { CaseSchema, FieldNoteSchema, FeedItemSchema } from "./schemas";

describe("schemas", () => {
  it("validates a complete case", () => {
    const valid = {
      slug: "range-rover-flagship",
      brand: "Range Rover",
      sector: "Auto",
      year: 2023,
      thinkingQuote: "把豪车 SUV 的传播从'参数比较'转向'生活方式叙事'。",
      heroBrandColor: "#2a4858",
    };
    expect(() => CaseSchema.parse(valid)).not.toThrow();
  });

  it("rejects a case missing brand", () => {
    expect(() =>
      CaseSchema.parse({ slug: "x", sector: "x", year: 2023, thinkingQuote: "x", heroBrandColor: "#000" })
    ).toThrow();
  });

  it("validates feed item with area+format tags", () => {
    const item = {
      id: "zhihu-001",
      title: "桥下彻",
      format: "article",
      area: "japan",
      href: "https://example.com",
      date: "2024-08-12",
    };
    expect(() => FeedItemSchema.parse(item)).not.toThrow();
  });

  it("rejects feed item with bad area", () => {
    expect(() =>
      FeedItemSchema.parse({
        id: "x", title: "x", format: "article", area: "not-a-real-area", href: "x", date: "2024-08-12",
      })
    ).toThrow();
  });

  it("validates a field note", () => {
    const note = {
      slug: "2025-11-konbini-light",
      title: "便利店收银台后面的灯光",
      area: "japan",
      date: "2025-11-04",
    };
    expect(() => FieldNoteSchema.parse(note)).not.toThrow();
  });
});
