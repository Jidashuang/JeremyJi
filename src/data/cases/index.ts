import { CaseSchema, type Case } from "@/lib/schemas";

const raw: Case[] = [
  {
    slug: "range-rover-flagship",
    brand: "Range Rover",
    sector: "Auto",
    year: 2023,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — Range Rover.]",
    heroBrandColor: "#2a4858",
    heroBrandColorEnd: "#1a2e38",
  },
  {
    slug: "nintendo-cny-2022",
    brand: "Nintendo",
    sector: "Gaming",
    year: 2022,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — Nintendo.]",
    heroBrandColor: "#c41e3a",
    heroBrandColorEnd: "#8b1428",
  },
  {
    slug: "bicester-village-2022",
    brand: "Bicester Village",
    sector: "Retail",
    year: 2022,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — Bicester.]",
    heroBrandColor: "#d4a574",
    heroBrandColorEnd: "#a08560",
  },
  {
    slug: "puma-launch",
    brand: "PUMA",
    sector: "Apparel",
    year: 2021,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — PUMA.]",
    heroBrandColor: "#1f6b63",
    heroBrandColorEnd: "#145954",
  },
];

export const cases: Case[] = raw.map((c) => CaseSchema.parse(c));
