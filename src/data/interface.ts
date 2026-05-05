export type CollabTrack = { title: string; summary: string; goodFor: string[]; sendThis: string };
export type Endpoint = { label: string; value: string; href: string };
export type FAQ = { q: string; a: string };

export const protocolLine =
  "如果你有一个品牌、传播、市场或文化问题需要更锐利的 framing，发给我背景、目标、deadline。";

export const tracks: CollabTrack[] = [
  {
    title: "Media Strategy Consult",
    summary: "媒介策略诊断 / 渠道与组合判断 / KPI 复盘。",
    goodFor: [
      "上市后转化没起来，要判断是策略错还是执行错",
      "新品类切入，需要快速一份 channel-fit 评估",
      "campaign 复盘，找出可复用的判断模式",
    ],
    sendThis: "品牌、品类、目标人群、当前痛点、过往 campaign deck（如有）",
  },
  {
    title: "Brief Refinement",
    summary: "把模糊的业务诉求变成可执行 brief。",
    goodFor: [
      "老板说要做点品牌的事，但不知道怎么开口",
      "要发 RFP，写出来 agency 都猜不到要什么",
      "团队内部对方向有分歧，要一份对齐的 brief",
    ],
    sendThis: "现有的 brief / 邮件 / 会议纪要，越原始越好",
  },
  {
    title: "Speaking · Partnership",
    summary: "分享 / 工作坊 / 内容合作。",
    goodFor: [
      "内部分享 — 媒介策略、用户洞察、日本市场",
      "工作坊 — brief 训练、案例拆解",
      "内容合作 — 公众号 / 播客 / 视频联合",
    ],
    sendThis: "活动 / 项目背景，预期产出，时间窗",
  },
];

export const endpoints: Endpoint[] = [
  // TODO: 用真实邮箱替换 hi@jeremyji.dev 之前确认。
  { label: "Email", value: "hi@jeremyji.dev", href: "mailto:hi@jeremyji.dev" },
  { label: "LinkedIn", value: "/in/jeremyji", href: "https://www.linkedin.com/in/jeremyji" },
  { label: "WeChat", value: "by intro only", href: "#" },
  { label: "Telegram", value: "@jeremyjee", href: "https://t.me/jeremyjee" },
];

export const faq: FAQ[] = [
  {
    q: "你接全职 in-house 吗？",
    a: "看公司、看团队、看具体岗位。直接发岗位 JD + 团队结构 + 上一任为什么离开，能省彼此的时间。",
  },
  {
    q: "你做长期顾问吗？",
    a: "做。每月固定时数 + 项目议题。先做 1-2 个 brief refinement 试合作节奏。",
  },
  {
    q: "agency 找你呢？",
    a: "case-by-case。比起承接执行，更喜欢做策略层的二次审视。",
  },
  {
    q: "回复时间？",
    a: "工作日 24 小时内。带具体问题的 brief 优先回。",
  },
];

export const briefTemplate = `Subject: [Brief] <品牌> · <议题>

背景：
（这个品牌 / 业务现在的状态）

目标：
（campaign / 季度 / 年度 想达成什么）

卡点：
（你已经试过什么、为什么觉得不对）

时间窗：
（什么时候要看到产出）

预算量级：
（可选，但有的话能更快判断）

附件：
（现有 deck / brief / 数据）`;
