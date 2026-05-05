export type Photo = {
  src: string;
  alt: string;
  caption: string;
  area?: "japan" | "marketing" | "design" | "field-notes";
};

export const photos: Photo[] = [
  {
    src: "/gallery-tokyo-night.jpg",
    alt: "Tokyo at night",
    caption: '夜里的东京街道。这种"再普通不过"的画面是我观察日本商业系统最喜欢的素材——所有重要的判断都写在街景里。',
    area: "japan",
  },
  {
    src: "/gallery-train.jpg",
    alt: "Train interior",
    caption: "通勤电车里没人看广告的那部分人，才是广告主真正要争夺的注意力。",
    area: "japan",
  },
  {
    src: "/gallery-market.jpg",
    alt: "Market scene",
    caption: "市场里的招牌、价签、手写菜单——这些视觉系统从来没被设计师碰过，但是它们工作得特别好。",
    area: "design",
  },
  {
    src: "/gallery-concrete.jpg",
    alt: "Concrete architecture",
    caption: '清水混凝土。便宜的材料，昂贵的精度——这种"识别成本"是品牌叙事的细腻层次。',
    area: "design",
  },
];
