import articlesJson from "@/data/feed/articles.json";
import { videos } from "@/data/feed/videos";
import { podcasts } from "@/data/feed/podcasts";
import { fieldNotes } from "@/data/feed/field-notes";
import { FeedItemSchema, type FeedItem } from "@/lib/schemas";
import { sortByDateDesc } from "@/lib/feed";

export function getAllFeedItems(): FeedItem[] {
  const articles = (articlesJson as unknown[]).map((a) => FeedItemSchema.parse(a));
  return sortByDateDesc([...articles, ...videos, ...podcasts, ...fieldNotes]);
}
