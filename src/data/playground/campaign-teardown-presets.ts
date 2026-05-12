import { CampaignPresetSchema, type CampaignPreset } from "@/lib/schemas";

const raw: CampaignPreset[] = [
  {
    id: "nintendo-cny-2022",
    label: "Nintendo · 2022 春节",
    triggers: ["nintendo", "任天堂", "cny", "春节", "switch"],
    blocks: {
      problemFraming:
        "Switch 在中国市场的认知已有，但春节窗口需要一次情绪放大——把硬件叙事拉回到家庭场景，让购买理由从'我要玩什么'变成'我们一起玩什么'。",
      audience:
        "两层人群：18-28 岁年轻玩家自己决定买什么游戏，30-45 岁家庭决策者决定送什么礼。前者触点在 B 站和小红书，后者触点在朋友圈和京东 banner。两条触点要分头打，内容口吻不能复用。",
      channelMix:
        "朋友圈视频做大盘 reach，B 站三档 UP 主长内容做 consideration，京东自营页 + 抖音搜索词做 conversion 收口。RedBook 走 KOC 真实开箱，不走头部硬广。",
      pacing:
        "腊月廿三起 7 天预热（主投朋友圈视频），除夕到初一发布全家欢主片，初二到初五日更场景化短视频，初六做媒介复盘并准备元宵收口波次。节奏最怕的是初一一波打完就停。",
      creativeFit:
        "全家欢 IP 跟春节场景天然咬合，色彩以日式红 + 中国金调和，避开纯日式克制风。台词用'一起玩'而不是'独自享受'，跟春节'团圆'语义对齐。Switch 硬件特性放在第二层，不抢情绪表达。",
    },
    resultLink: { label: "看完整复盘 →", href: "/proof-of-work/nintendo-cny-2022" },
  },
  {
    id: "range-rover-flagship",
    label: "Range Rover · 旗舰上市",
    triggers: ["range rover", "路虎", "揽胜", "旗舰"],
    blocks: {
      problemFraming:
        "豪华 SUV 旗舰在中国的购买理由已经从参数比较移到生活方式认同。Range Rover 这一波要解决的是'让目标受众觉得这台车配得上他想成为的那个人'，而不是把零百加速再喊一次。",
      audience:
        "核心人群是 40+ 二次购车的高净值男性，精神受众扩到他们的另一半（决定家庭出行场景）。第一层触点是高端商场和高尔夫场，第二层是私人飞行和精品酒店的合作展位。",
      channelMix:
        "媒介组合刻意降权传统 OTV，把预算重压到三类：高端户外（机场、高尔夫球场围挡、精品酒店电梯屏）、私域邀请制试驾活动、以及微信生态内的长图文内容（公众号深度稿 + 朋友圈精准投放）。抖音只做品牌形象片分发，不做效果投放。",
      pacing:
        "节奏拉到 12 周：首 4 周做生活方式叙事铺垫（不强提产品），中 4 周做媒介 + 试驾邀约，后 4 周做经销商体验和口碑收口。每 4 周设一次内部 review，允许调内容方向。",
      creativeFit:
        "Creative 主线是'宁静里的力量'，跟揽胜的越野基因结合，但不放越野场景前置。视觉用低饱和度色彩 + 自然光，跟一线豪车的浮夸路线区隔。台词避免 power / luxury 这类已被用滥的词。",
    },
    resultLink: { label: "看完整复盘 →", href: "/proof-of-work/range-rover-flagship" },
  },
];

export const campaignPresets: CampaignPreset[] = raw.map((p) => CampaignPresetSchema.parse(p));
