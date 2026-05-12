import { describe, it, expect } from "vitest";
import { matchFAQ } from "./faq-router";
import type { FAQEntry } from "./schemas";

const entries: FAQEntry[] = [
  {
    id: "brief", question: "Q1",
    triggers: ["brief", "新品牌"],
    answer: "A1", followUp: [], language: "zh",
  },
  {
    id: "japan", question: "Q2",
    triggers: ["日本", "japan", "便利店"],
    answer: "A2", followUp: [], language: "zh",
  },
  {
    id: "cv", question: "Q3",
    triggers: ["cv", "简历"],
    answer: "A3", followUp: [], language: "both",
  },
];

describe("matchFAQ", () => {
  it("returns null for empty input", () => {
    expect(matchFAQ("", entries)).toBeNull();
    expect(matchFAQ("   ", entries)).toBeNull();
  });

  it("matches a single trigger case-insensitively", () => {
    expect(matchFAQ("CV please", entries)?.id).toBe("cv");
    expect(matchFAQ("简历呢", entries)?.id).toBe("cv");
  });

  it("matches the entry whose trigger appears in the input", () => {
    expect(matchFAQ("聊聊日本便利店", entries)?.id).toBe("japan");
    expect(matchFAQ("japan?", entries)?.id).toBe("japan");
  });

  it("returns the first match when multiple entries hit", () => {
    // "brief" hits entry[0], "cv" hits entry[2]. First in source wins.
    expect(matchFAQ("brief and cv", entries)?.id).toBe("brief");
  });

  it("returns null when no trigger appears", () => {
    expect(matchFAQ("完全不相关的提问", entries)).toBeNull();
  });

  it("returns null when entries array is empty", () => {
    expect(matchFAQ("anything", [])).toBeNull();
  });
});
