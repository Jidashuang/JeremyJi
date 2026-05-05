import { FeedItemSchema, type FeedItem } from "@/lib/schemas";

// Field-note metadata for the mixed feed. Bodies live in the .mdx files of
// the same directory; the dynamic route /areas/field-notes/[slug] (added
// later) will render the full body.
const raw: FeedItem[] = [
  {
    id: "note-2025-11-konbini-light",
    title: "便利店收银台后面的灯光",
    format: "note",
    area: "japan",
    href: "/areas/field-notes/2025-11-konbini-light",
    date: "2025-11-04",
    summary: "凌晨两点的 7-Eleven。收银台后面那一排灯特别亮——这不是为了照明，是为了制造一种'我就是要买这个'的决断感。",
  },
  {
    id: "note-2025-12-tokyo-train-ad",
    title: "JR 月台的广告排版",
    format: "note",
    area: "japan",
    href: "/areas/field-notes/2025-12-tokyo-train-ad",
    date: "2025-12-19",
    summary: "信息层级 0.5 秒读完。日本平面广告对版式的克制，源于一个朴素假设——看广告的人是匆忙的。",
  },
  {
    id: "note-2026-01-handwritten-menu",
    title: "手写 menu 不是复古",
    format: "note",
    area: "japan",
    href: "/areas/field-notes/2026-01-handwritten-menu",
    date: "2026-01-22",
    summary: "在打印 menu 已经是标配的时代，手写代表'灵活、当下、可信'——独立小店在赢回连锁系统稀释掉的信任。",
  },
  {
    id: "note-2026-02-mall-sign",
    title: "商场地下一层的指引牌",
    format: "note",
    area: "marketing",
    href: "/areas/field-notes/2026-02-mall-sign",
    date: "2026-02-09",
    summary: "用户进入商场不是不知道要去哪，而是已经决定好了——只想要一条最快的路径。被忽视的决策环节往往不是最显眼的那个。",
  },
  {
    id: "note-2026-03-pocky-day",
    title: "Pocky Day 的造节逻辑",
    format: "note",
    area: "marketing",
    href: "/areas/field-notes/2026-03-pocky-day",
    date: "2026-03-15",
    summary: "造节最好的方法是发现已经存在的文化萌芽，而不是从零创造。中国品牌几乎所有的造节顺序都反了。",
  },
  {
    id: "note-2026-04-concrete-aesthetic",
    title: "清水混凝土为什么在日本反复回潮",
    format: "note",
    area: "design",
    href: "/areas/field-notes/2026-04-concrete-aesthetic",
    date: "2026-04-08",
    summary: "一种'克制的奢侈'。识别得出来精度的人，知道你在花真金白银做'看起来普通'的东西。",
  },
  {
    id: "note-2026-05-platform-decision",
    title: "选平台的真实决策时刻",
    format: "note",
    area: "field-notes",
    href: "/areas/field-notes/2026-05-platform-decision",
    date: "2026-05-01",
    summary: "你的产品是被'决定要买'之后买的，还是被'凑热闹'刷到买的？这个问题问完之后，平台选择就没什么悬念了。",
  },
];

export const fieldNotes: FeedItem[] = raw.map((n) => FeedItemSchema.parse(n));
