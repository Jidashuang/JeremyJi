import type { CampaignPreset } from "./schemas";

/**
 * lookupPreset matches the user's input against preset ids and triggers
 * (case-insensitive substring). The first preset whose id or any trigger
 * appears in the input wins. Returns null for empty input or no match.
 */
export function lookupPreset(input: string, presets: CampaignPreset[]): CampaignPreset | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  for (const preset of presets) {
    if (q.includes(preset.id.toLowerCase())) return preset;
    for (const trigger of preset.triggers) {
      if (q.includes(trigger.toLowerCase())) return preset;
    }
  }
  return null;
}
