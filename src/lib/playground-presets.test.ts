import { describe, it, expect } from "vitest";
import { lookupPreset } from "./playground-presets";
import type { CampaignPreset } from "./schemas";

const presets: CampaignPreset[] = [
  {
    id: "nintendo-cny-2022",
    label: "Nintendo · 2022 春节",
    triggers: ["nintendo", "任天堂", "cny", "春节"],
    blocks: { problemFraming: "x", audience: "x", channelMix: "x", pacing: "x", creativeFit: "x" },
  },
  {
    id: "range-rover-flagship",
    label: "Range Rover",
    triggers: ["range rover", "路虎"],
    blocks: { problemFraming: "x", audience: "x", channelMix: "x", pacing: "x", creativeFit: "x" },
  },
];

describe("lookupPreset", () => {
  it("returns null for empty input", () => {
    expect(lookupPreset("", presets)).toBeNull();
    expect(lookupPreset("   ", presets)).toBeNull();
  });

  it("matches by preset id", () => {
    expect(lookupPreset("nintendo-cny-2022", presets)?.id).toBe("nintendo-cny-2022");
  });

  it("matches by trigger keyword case-insensitively", () => {
    expect(lookupPreset("NINTENDO", presets)?.id).toBe("nintendo-cny-2022");
    expect(lookupPreset("任天堂 春节", presets)?.id).toBe("nintendo-cny-2022");
    expect(lookupPreset("range rover 上市", presets)?.id).toBe("range-rover-flagship");
  });

  it("returns first match when multiple triggers hit", () => {
    expect(lookupPreset("nintendo and range rover", presets)?.id).toBe("nintendo-cny-2022");
  });

  it("returns null when no trigger matches", () => {
    expect(lookupPreset("starbucks holiday", presets)).toBeNull();
  });
});
