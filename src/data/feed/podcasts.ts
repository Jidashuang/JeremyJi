import { FeedItemSchema, type FeedItem } from "@/lib/schemas";

// Podcast episodes — replace with actual episode metadata once available.
const raw: FeedItem[] = [];

export const podcasts: FeedItem[] = raw.map((p) => FeedItemSchema.parse(p));
