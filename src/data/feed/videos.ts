import { FeedItemSchema, type FeedItem } from "@/lib/schemas";

const raw: FeedItem[] = [
  { id: "bili-001", title: "如何用日文说我爱你", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV1at411k71b", date: "2020-05-12", image: "/video-love-you.jpg", summary: "Jeremy 的日语教室" },
  { id: "bili-002", title: "在东京用得上的日语词", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV18t411B7Bm", date: "2020-06-04", image: "/video-tokyo-words.jpg" },
  { id: "bili-003", title: "职场日语指南", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV11t411T74H", date: "2020-07-15", image: "/video-office-japanese.jpg" },
  { id: "bili-004", title: "日语中骂人的话", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV1Ab411z7Bd", date: "2020-08-22", image: "/video-swearing.jpg" },
  { id: "bili-005", title: "鲨鱼和自我陶醉", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV1ht41187PD", date: "2020-09-30", image: "/video-shark-story.jpg" },
];

export const videos: FeedItem[] = raw.map((v) => FeedItemSchema.parse(v));
