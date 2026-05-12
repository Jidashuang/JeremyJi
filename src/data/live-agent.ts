import { FAQEntrySchema, type FAQEntry } from "@/lib/schemas";

// W2 v1 dictionary (10 entries). 6 ported from the original AgentPrompt[],
// 4 added for: CV ask, tool stack, Japan POV, slide/PDF ask.
// Tone: editorial-warm, no "AI generated" wording, no "不是……而是" pattern.

const raw: FAQEntry[] = [
  {
    id: "brief-thinking",
    question: "他怎么思考一个新品牌的传播 brief?",
    triggers: ["brief", "新品牌", "传播 brief", "怎么思考 brief"],
    language: "zh",
    answer: `他会先把 brief 拆成三个独立的问题，每个问完才进下一个：

第一个：这个品类的真实购买理由是什么。不是品牌方"希望大家觉得它怎么样"，是消费者打开钱包之前心里 actually 想的那一句话。这一步通常会发现 brief 里已经埋了一个错的假设。

第二个：他们用什么平台做出决定。不同品类有完全不同的决策路径——美妆走小红书种草、3C 走知乎评测、母婴走垂类社群。这一步决定了媒介组合的骨架。

第三个：过去的传播在哪一步漏了。如果是新品牌，这一步换成"竞品在哪一步成功"。这一步决定了今年要补的洞。

三个答完之后，brief 通常会被改一遍——而不是按原样执行。这种"先质疑 brief"的习惯，是他在 EssenceMediacom 做 Range Rover 那年学会的。`,
    followUp: [
      { label: "看 Range Rover 案例 →", href: "/proof-of-work/range-rover-flagship" },
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "closest-case",
    question: "哪个项目最像我现在要解决的问题?",
    triggers: ["像我", "类似项目", "对照", "参考案例"],
    language: "zh",
    answer: `他通常会反问三件事再回答：

—— 你的品类是新进入还是要重塑？
—— 你的预算是百万级、千万级、还是亿级？
—— 你的时间窗是 campaign 周期（4-8 周）还是常态运营？

四个 case 大致对应四种问题形状：

Range Rover（旗舰新车上市）适合"小受众、高客单价、需要文化叙事"的项目。

Nintendo（春节传播）适合"IP 已有认知、要在特定节点放大"的项目，时间窗紧。

Bicester Village（用户拉新）适合"线上拉新打到店转化"的本地零售类项目。

PUMA（新品上市）适合"品类竞争激烈、内容方向需要重新锚定"的项目。

把你的项目跟这四个比一下，一般能定位到一个最近的对照组。`,
    followUp: [
      { label: "看四个 proof-of-work →", href: "/proof-of-work" },
    ],
  },
  {
    id: "japan-touchpoints",
    question: "他在日本研究里最受触动的三件事是什么?",
    triggers: ["日本", "japan", "受触动", "便利店"],
    language: "zh",
    answer: `第一件：便利店收银台后面的灯光。日本便利店把"日常感"做成了一种被精确控制的视觉系统——色温、亮度、货架反光、收银员动线，每一项都对应一个消费心理判断。看完之后你会重新理解"日常营销"——它从来都不是"接地气"，是被设计过的视觉舒适。

第二件：JR 月台的广告排版。日本平面广告对版式的克制，源于一个朴素假设："看广告的人是匆忙的"。所以信息层级要在 0.5 秒内被读完，色块的对比要在低光环境下不刺眼。这个假设迁移到中国地铁场景一样成立，但很少有人这么做。

第三件：大阪小店的 menu 设计。手写 menu 在日本不是"复古"，是商家与顾客之间建立信任的视觉信号——"这家店是真人在经营"。当你理解这个信号之后，你会突然看到中国本地店铺的 menu 在向哪个方向演化、为什么有些品牌需要刻意"去标准化"才能赢回信任。

这三件事都指向同一个判断：日本提供的不是文化奇观，是商业系统的可观察样本。`,
    followUp: [
      { label: "看 Japan area →", href: "/areas/japan" },
    ],
  },
  {
    id: "channel-mix-first-cut",
    question: "他做媒介组合的时候第一个砍的是什么?",
    triggers: ["媒介", "砍掉", "渠道", "channel"],
    language: "zh",
    answer: `第一个砍的永远是"看起来安全的预算"。

具体来说：把上一波 campaign 表现"中等"的渠道——既没明显失败也没明显成功的那一档——挪出预算。原因是：中等表现的渠道往往是因为目标人群刚好对一半，看起来在工作其实在浪费一半钱。这类渠道留着是出于"上次也用了"的惯性，不是策略选择。

砍完之后再补两类：一类是上一波明显跑出 ROI 但预算给少了的（加 30-50%），一类是数据空白但跟产品逻辑契合的小渠道（放 10% 做试验）。

这套做法的前提是要做媒介复盘，这一步很多团队跳过了。`,
    followUp: [
      { label: "看 Marketing area →", href: "/areas/marketing" },
    ],
  },
  {
    id: "creative-vs-brief",
    question: "他怎么判断一个 creative 偏离了 brief?",
    triggers: ["creative", "偏离", "判断 creative"],
    language: "zh",
    answer: `他用三个问题快速测：

一，这条 creative 抽掉品牌 logo 之后，还能立刻看出在卖什么品类吗？能，说明它讲清了品类问题；不能，说明它在自 high。

二，把这条 creative 放到目标受众真实使用的内容场景里（比如刷小红书、刷抖音、看 B 站），它会被滑过还是会被点开？不需要测试，凭经验过一遍。

三，如果三个月后回看，这条 creative 让品牌资产积累了一点点，还是只是消费了一次媒介预算？

三个里两个答"不行"，就要 push back。`,
    followUp: [
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "data-vs-instinct",
    question: "数据和直觉冲突的时候他怎么选?",
    triggers: ["数据", "直觉", "instinct", "冲突"],
    language: "zh",
    answer: `他会先问：这个直觉的来源是什么。

如果直觉来自"我跟这个人群长期接触、我知道他们怎么想"，那它本质是没被结构化的数据——值得跟报表上的数据并列权衡。这种情况下他会做小预算试验来调和两边。

如果直觉来自"我觉得应该这样"，没有具体接触做支撑——那它就是偏好，不是判断。这种情况下他会偏向数据。

判断直觉是不是"伪装成洞察的偏好"，是他给自己设的一道闸门。`,
    followUp: [
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "cv-ask",
    question: "可以看他的 CV 吗?",
    triggers: ["cv", "简历", "履历", "resume"],
    language: "both",
    answer: `可以。中英两版都在 /interface 页底部下载区，PDF 不到 200KB。

CV 上的关键信息：剑桥 Judge 在读 / EssenceMediacom Range Rover 媒介策略 / Nintendo 中国春节传播 / Bicester Village 上海拉新 / PUMA 新品方向重锚。

更详细的项目复盘在 /proof-of-work，内容比 CV 长 10 倍。`,
    followUp: [
      { label: "去 Interface 页下载 →", href: "/interface" },
      { label: "看完整 proof-of-work →", href: "/proof-of-work" },
    ],
  },
  {
    id: "tool-stack",
    question: "他平时用什么工具做策略和分析?",
    triggers: ["工具", "tool", "stack", "用什么"],
    language: "zh",
    answer: `日常三件套：

Notion 做 brief 拆解和阶段性 memo——它的 toggle 适合做"假设/证据/结论"三层结构。

Figma 做内容方向的视觉拼盘——把竞品 5-10 个 creative 横向铺出来比写文字快。

Claude / GPT 做信息密度高的初稿草稿——他不让 LLM 给结论，只让它把 5 篇文章压成 1 页要点。结论由他自己写。

不用的：营销自动化平台、SaaS dashboard。原因是它们的数据维度通常滞后于真实的人群行为变化，看了反而被误导。`,
    followUp: [
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "japan-pov",
    question: "他对日本市场最想说的一句话是什么?",
    triggers: ["日本市场", "pov", "japan pov", "一句话"],
    language: "zh",
    answer: `日本不是用来"学品牌的"，日本是用来"看商业基础设施怎么稳定运行十年以上"的。

很多中国品牌从日本学的是表层视觉（极简、留白、克制），但忽略了背后是供应链稳定 + 渠道分层成熟 + 消费者忠诚长尾这三件硬基础设施。脱开这些去抄视觉，会做出"日式皮、中国体"的拧巴产品。

真正应该学的是日本企业在 3-5 年周期内做的产品演化节奏——比如无印良品的 SKU 修剪、7-11 的鲜食上新——这些里面的逻辑比包装设计有用得多。`,
    followUp: [
      { label: "看 Japan area →", href: "/areas/japan" },
    ],
  },
  {
    id: "slides-ask",
    question: "他做过的提案 PPT 能看吗?",
    triggers: ["ppt", "提案", "slides", "deck"],
    language: "both",
    answer: `公开版本没有放在站点上。原因是 PPT 里大量数据是客户原数据，直接公开违反 NDA。

替代方案是 /proof-of-work 下的四篇深度复盘——那里把"提案讲过什么"用文字重写了一遍，数据脱敏。如果有具体项目想了解，可以发邮件，他会判断哪些可以在不违反 NDA 的前提下分享。

邮件在 /interface 页底部。`,
    followUp: [
      { label: "去 Interface 页 →", href: "/interface" },
      { label: "看 proof-of-work →", href: "/proof-of-work" },
    ],
  },
];

export const faqEntries: FAQEntry[] = raw.map((e) => FAQEntrySchema.parse(e));

// Deprecated alias for backward compat during W2.
// Remove after live-agent-block.tsx + live-agent page have migrated.
export type AgentPrompt = { question: string; answer: string };
export const prompts: AgentPrompt[] = faqEntries.map((e) => ({
  question: e.question,
  answer: e.answer,
}));
