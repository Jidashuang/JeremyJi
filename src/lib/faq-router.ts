import type { FAQEntry } from "./schemas";

/**
 * matchFAQ runs a case-insensitive substring search over each entry's triggers
 * against the user input. The first entry with any trigger present in the input
 * wins (source order is intentional — author-curated priority).
 *
 * Returns null for empty/whitespace input or no match.
 */
export function matchFAQ(input: string, entries: FAQEntry[]): FAQEntry | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  for (const entry of entries) {
    for (const trigger of entry.triggers) {
      if (q.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  return null;
}
