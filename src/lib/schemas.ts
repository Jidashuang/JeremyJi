import { z } from "zod";

export const AREA_SLUGS = ["japan", "marketing", "design", "field-notes", "media"] as const;
export const FORMAT_VALUES = ["article", "video", "podcast", "note", "source"] as const;

export const AreaSlugSchema = z.enum(AREA_SLUGS);
export const FormatSchema = z.enum(FORMAT_VALUES);

export const CaseSchema = z.object({
  slug: z.string().min(1),
  brand: z.string().min(1),
  sector: z.string().min(1),
  year: z.number().int().gte(2000).lte(2100),
  thinkingQuote: z.string().min(1),
  heroBrandColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  heroBrandColorEnd: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});
export type Case = z.infer<typeof CaseSchema>;

export const FeedItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  format: FormatSchema,
  area: AreaSlugSchema,
  href: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().optional(),
  image: z.string().optional(),
});
export type FeedItem = z.infer<typeof FeedItemSchema>;

export const FieldNoteSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  area: AreaSlugSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.string().optional(),
});
export type FieldNote = z.infer<typeof FieldNoteSchema>;

export const PrincipleSchema = z.object({
  number: z.string(),                    // "P / 01"
  headline: z.string(),                  // English one-liner
  explanation: z.string(),               // Chinese one-liner
});
export type Principle = z.infer<typeof PrincipleSchema>;

export const DomainSchema = z.object({
  slug: AreaSlugSchema,
  name: z.string(),
  shortLabel: z.string(),
  manifesto: z.string().min(50),         // 200-300 word manifesto goes here
});
export type Domain = z.infer<typeof DomainSchema>;
