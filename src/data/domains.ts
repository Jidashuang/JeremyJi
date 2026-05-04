import { DomainSchema, type Domain } from "@/lib/schemas";

const raw: Domain[] = [
  {
    slug: "japan",
    name: "Japan",
    shortLabel: "Domain · 01",
    manifesto: "[Manifesto for Japan — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
  {
    slug: "marketing",
    name: "Marketing",
    shortLabel: "Domain · 02",
    manifesto: "[Manifesto for Marketing — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
  {
    slug: "design",
    name: "Design",
    shortLabel: "Domain · 03",
    manifesto: "[Manifesto for Design — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
  {
    slug: "field-notes",
    name: "Field Notes",
    shortLabel: "Domain · 04",
    manifesto: "[Manifesto for Field Notes — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
];

export const domains: Domain[] = raw.map((d) => DomainSchema.parse(d));
