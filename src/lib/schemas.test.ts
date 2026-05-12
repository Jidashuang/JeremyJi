import { describe, it, expect } from "vitest";
import { CaseSchema, FieldNoteSchema, FeedItemSchema, FAQEntrySchema, CampaignPresetSchema } from "./schemas";

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


describe("FAQEntrySchema", () => {
  it("validates a complete entry with both languages", () => {
    const valid = {
      id: "brief-thinking",
      question: "他怎么思考一个新品牌的传播 brief?",
      triggers: ["brief", "新品牌", "传播 brief"],
      answer: "三步:先质疑 brief 里的假设,再拆决策路径,最后定补洞优先级。",
      followUp: [{ label: "看 Range Rover 案例", href: "/proof-of-work/range-rover-flagship" }],
      language: "both",
    };
    expect(() => FAQEntrySchema.parse(valid)).not.toThrow();
  });

  it("rejects an entry with empty triggers", () => {
    expect(() =>
      FAQEntrySchema.parse({
        id: "x", question: "x", triggers: [], answer: "x", followUp: [], language: "zh",
      })
    ).toThrow();
  });

  it("rejects an entry with bad language enum", () => {
    expect(() =>
      FAQEntrySchema.parse({
        id: "x", question: "x", triggers: ["x"], answer: "x", followUp: [], language: "jp",
      })
    ).toThrow();
  });
});

describe("CampaignPresetSchema", () => {
  it("validates a preset with all 5 blocks", () => {
    const valid = {
      id: "nintendo-cny-2022",
      label: "Nintendo · 2022 春节",
      triggers: ["nintendo", "任天堂", "春节", "cny"],
      blocks: {
        problemFraming: "Switch 在中国市场需要把春节窗口当成情绪放大器。",
        audience: "家庭决策者 + 年轻玩家的双层人群,触点分别在朋友圈和 B 站。",
        channelMix: "朋友圈视频做 reach,B 站长内容做 consideration,京东自营页接 conversion。",
        pacing: "腊月廿三起 7 天预热,初一到初五日更,初六收口复盘。",
        creativeFit: "全家欢 IP 跟春节场景天然咬合,色彩用红+金对齐节日符号。",
      },
      resultLink: { label: "看完整复盘 →", href: "/proof-of-work/nintendo-cny-2022" },
    };
    expect(() => CampaignPresetSchema.parse(valid)).not.toThrow();
  });

  it("rejects a preset missing problemFraming", () => {
    expect(() =>
      CampaignPresetSchema.parse({
        id: "x", label: "x", triggers: ["x"],
        blocks: { audience: "x", channelMix: "x", pacing: "x", creativeFit: "x" },
      })
    ).toThrow();
  });
});
