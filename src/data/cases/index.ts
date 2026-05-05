import { CaseSchema, type Case } from "@/lib/schemas";

const raw: Case[] = [
  {
    slug: "range-rover-flagship",
    brand: "Range Rover",
    sector: "Auto",
    year: 2023,
    thinkingQuote: "奢侈 SUV 卖的是受众认同的生活方式叙事，参数比较只是入场券。",
    heroBrandColor: "#2a4858",
    heroBrandColorEnd: "#1a2e38",
  },
  {
    slug: "nintendo-cny-2022",
    brand: "Nintendo",
    sector: "Gaming",
    year: 2022,
    thinkingQuote: "IP 全家欢节奏装进中国春节场景，时间窗短就必须押对一个核心情绪。",
    heroBrandColor: "#c41e3a",
    heroBrandColorEnd: "#8b1428",
  },
  {
    slug: "bicester-village-2022",
    brand: "Bicester Village",
    sector: "Retail",
    year: 2022,
    thinkingQuote: "奥莱 + 上海本地 + 一次性消费决策的组合：打认知和到店要同时做、不能顺序做。",
    heroBrandColor: "#d4a574",
    heroBrandColorEnd: "#a08560",
  },
  {
    slug: "puma-launch",
    brand: "PUMA",
    sector: "Apparel",
    year: 2021,
    thinkingQuote: "高竞争品类、Gen-Z 受众的破局点在内容方向的重新锚定，加预算救不回来。",
    heroBrandColor: "#1f6b63",
    heroBrandColorEnd: "#145954",
  },
];

export const cases: Case[] = raw.map((c) => CaseSchema.parse(c));
