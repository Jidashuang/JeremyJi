export type PageLink = {
  key: string;
  href: string;
  label: string;
};

export type DomainEntry = {
  title: string;
  format: string;
  description: string;
  href?: string;
  status?: string;
  image?: string;
  ctaLabel?: string;
};

export type FeedEntry = {
  title: string;
  format: string;
  domain: string;
  description: string;
  href?: string;
  status?: string;
  image?: string;
  note?: string;
};

export type Domain = {
  slug: string;
  name: string;
  shortLabel: string;
  summary: string;
  whyItMatters: string;
  signal: string;
  image: string;
  strengths: string[];
  lenses: string[];
  translations: string[];
  outputs: DomainEntry[];
  starterKit: DomainEntry[];
};

export type Channel = {
  name: string;
  platform: string;
  handle: string;
  audience: string;
  note: string;
  href?: string;
  image?: string;
  verifiedAt?: string;
  status?: string;
};

export type ProofMetric = {
  value: string;
  label: string;
  detail: string;
};

export type ProofCase = {
  title: string;
  client: string;
  period: string;
  role: string;
  summary: string;
  results: string[];
  approach: string[];
  stack: string[];
};

export type CareerStep = {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
};

export type CredentialGroup = {
  title: string;
  items: string[];
};

export type PlaygroundExperiment = {
  title: string;
  summary: string;
  prompt: string;
  output: string;
  status: string;
};

export type InterfaceTrack = {
  title: string;
  summary: string;
  goodFor: string[];
  deliverables: string[];
};

export type InterfaceRule = {
  title: string;
  detail: string;
};

export type ContactEndpoint = {
  label: string;
  value: string;
  href: string;
  note: string;
};

export type AgentCapability = {
  title: string;
  description: string;
  sources: string[];
  prompt: string;
};

export type AgentSource = {
  title: string;
  detail: string;
  image?: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  href?: string;
  dateLabel?: string;
};

export type ToolOption = {
  name: string;
  type: string;
  link: string;
  note: string;
};

export const pageLinks: PageLink[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "playground", href: "/playground", label: "Playground" },
  { key: "gallery", href: "/gallery", label: "Gallery" },
  { key: "thinking-feed", href: "/thinking-feed", label: "Thinking Feed" },
  { key: "interface", href: "/interface", label: "Interface" },
  { key: "proof-of-work", href: "/proof-of-work", label: "Proof of Work" },
  { key: "live-agent", href: "/live-agent", label: "Live Agent" },
];

export const publicSignals = [
  { value: "4,578", label: "Zhihu followers" },
  { value: "143", label: "answers" },
  { value: "57", label: "articles" },
  { value: "41k+", label: "voteups" },
];

export const channels: Channel[] = [
  {
    name: "Zhihu",
    platform: "Long-form writing",
    handle: "@Jeremy",
    audience: "4,578 followers · 143 answers · 57 articles · 3 columns",
    note: "目前最明确的公开内容资产，也是 Japan / Marketing / Notes 三条线最容易被看见的入口。",
    href: "https://www.zhihu.com/people/ji-qing-qiu",
    image: "/zhihu-avatar.jpg",
    verifiedAt: "Verified on 2026-03-16",
  },
  {
    name: "Bilibili / Jtube",
    platform: "Video archive",
    handle: "@Jtube",
    audience: "Japanese lesson archive since 2018",
    note: "把日语和日本观察做成更轻巧、更有表演感的视频，而不是标准语言课。",
    href: "https://space.bilibili.com/6963341",
    image: "/bilibili-avatar.jpg",
    verifiedAt: "Public profile checked on 2026-03-16",
  },
  {
    name: "Instagram",
    platform: "Visual notes",
    handle: "@jeremyjee",
    audience: "Photography and visual references",
    note: "摄影不只是附属爱好，它和 design judgment 一起构成这个站点的气质层。",
    href: "https://www.instagram.com/jeremyjee/",
  },
  {
    name: "無二無三",
    platform: "Podcast",
    handle: "with Darin",
    audience: "Vol.1 and Vol.2 preserved on the legacy site",
    note: "延续日本相关话题的音频入口，适合后续扩成完整 audio shelf。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#210325f32bcd4eaa8d667ad8aab3f604",
  },
  {
    name: "Source Library",
    platform: "Research shelf",
    handle: "信息源",
    audience: "Public-facing knowledge map rebuilt from Notion",
    note: "原站里的信息源数据库说明你不是只写内容的人，还会稳定收集输入。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#d91d641a9ba94741bf363c4fcb3499ea",
  },
];

export const domains: Domain[] = [
  {
    slug: "japan",
    name: "Japan / Language / Culture",
    shortLabel: "Japan",
    summary:
      "这是你最稳定、最能体现个人语气的一条主线。它既是内容来源，也是你观察社会、语言、平台与人的方式。",
    whyItMatters:
      "网站里关于日本的部分，不应该被当成兴趣附录，而应该被展示成你最有辨识度的认知入口。",
    signal:
      "从知乎 headline “关注不一样的日本”，到 B 站的日本语教室和播客，这条线不是偶发兴趣，而是长期公开输出。",
    image: "/video-tokyo-words.jpg",
    strengths: [
      "把语言、文化和现实生活细节讲得具体而不僵硬",
      "能把长期兴趣变成稳定公开输出",
      "可以把跨文化观察转化成更宽的社会和传播理解",
    ],
    lenses: [
      "日本不只是旅行目的地，而是日常语言和行为细节的观察对象",
      "喜欢抓微小但能说明问题的文化差异，而不是宏大叙事",
      "会把知识点重新包装成更轻松、更容易传播的内容形式",
    ],
    translations: [
      "把跨文化兴趣转成用户洞察和内容选题输入",
      "让品牌沟通不只停留在卖点层，而能更敏感地处理语境和表达方式",
      "帮助站点建立明显的人格，而不是只剩职业介绍",
    ],
    outputs: [
      {
        title: "Zhihu profile and article archive",
        format: "Zhihu",
        description: "公开主页显示 143 个回答、57 篇文章、3 个专栏，headline 为“关注不一样的日本”。",
        href: "https://www.zhihu.com/people/ji-qing-qiu",
        ctaLabel: "Open Zhihu",
      },
      {
        title: "Jeremy 的日语教室",
        format: "Bilibili",
        description: "用 comedy 和生活化场景讲日语和日本文化，而不是做传统教学内容。",
        href: "https://space.bilibili.com/6963341",
        ctaLabel: "Open Bilibili",
      },
      {
        title: "無二無三",
        format: "Podcast",
        description: "和 Darin 共创的播客，承接对日本相关议题的长期兴趣。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#210325f32bcd4eaa8d667ad8aab3f604",
        ctaLabel: "Open legacy episode",
      },
      {
        title: "All About Japan archive",
        format: "Archive",
        description: "原站最饱满的内容区，说明这不是副线，而是内容系统的核心来源。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#8cbba5848f3149bb831c1a99a0b13756",
        ctaLabel: "Open archive",
      },
    ],
    starterKit: [
      {
        title: "如何用日文说我爱你",
        format: "Bilibili",
        description: "最有记忆点的早期代表作之一，能看出你如何把语言内容做得更有表演感。",
        href: "https://www.bilibili.com/video/BV1at411k71b",
        image: "/video-love-you.jpg",
        ctaLabel: "Watch video",
      },
      {
        title: "在东京用得上的日语词",
        format: "Bilibili",
        description: "把日语放进生活场景，而不是教条式教学，这也是你内容风格的核心。",
        href: "https://www.bilibili.com/video/BV18t411B7Bm",
        image: "/video-tokyo-words.jpg",
        ctaLabel: "Watch video",
      },
      {
        title: "职场日语指南",
        format: "Bilibili",
        description: "把工作语境和语言细节接到一起，说明你擅长处理“语言如何被真正使用”。",
        href: "https://www.bilibili.com/video/BV11t411T74H",
        image: "/video-office-japanese.jpg",
        ctaLabel: "Watch video",
      },
    ],
  },
  {
    slug: "marketing-systems",
    name: "Marketing / Media Systems",
    shortLabel: "Marketing",
    summary:
      "这是你最强的专业主线，不是抽象地会营销，而是能处理预算、媒介、内容、平台、人群和结果之间的关系。",
    whyItMatters:
      "网站里应该把这部分清楚地分离成真正擅长的能力层，而不是和兴趣内容混在一起。",
    signal:
      "简历里最扎实的成果都在这里出现：1.5 亿元预算、Recall +30%、CAC -20%、到店 +50%、销售 +20%。",
    image: "/notion-hero-photo.jpg",
    strengths: [
      "用户洞察与人群拆分",
      "媒介策略、预算控制与跨渠道组合",
      "传播项目诊断与效率提升",
      "内容形式与投放环境的匹配判断",
    ],
    lenses: [
      "你更擅长看系统问题，而不是只追单条投放数据",
      "会把人群、区域、渠道、内容和预算放在一张图里一起判断",
      "重视前期诊断，也重视执行期的节奏和细节把控",
    ],
    translations: [
      "把模糊的品牌传播问题拆成可执行的工作流",
      "能把文化、平台和人群差异翻译成可投放的策略",
      "这部分最适合转化成 Proof of Work 和 Playground",
    ],
    outputs: [
      {
        title: "Nintendo CNY campaign",
        format: "Proof of Work",
        description: "销售超预期 20%，线下到店提升 50%，是你把策略和执行连接起来的代表案例。",
        href: "/proof-of-work",
        ctaLabel: "Open proof page",
      },
      {
        title: "Bicester Village performance work",
        format: "Proof of Work",
        description: "通过 district attack 和 content segmentation，把获客成本压低约 20%。",
        href: "/proof-of-work",
        ctaLabel: "Open proof page",
      },
      {
        title: "Marketing Insights shelf",
        format: "Archive",
        description: "把投放、用户洞察、媒介逻辑写成能被外部理解的内容，而不只是内部术语。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#8cbba5848f3149bb831c1a99a0b13756",
        ctaLabel: "Open archive",
      },
    ],
    starterKit: [
      {
        title: "Nintendo Game Console CNY Campaign",
        format: "Case study",
        description: "精确人群画像 + 点评搜索广告 + 10+ KOL 线下到店内容，销售超预期 20%。",
        href: "/proof-of-work",
        ctaLabel: "Open case",
      },
      {
        title: "Bicester Village Growth Restructure",
        format: "Case study",
        description: "微信 + 抖音的 district attack / content segmentation 策略，让 CAC 下降约 20%。",
        href: "/proof-of-work",
        ctaLabel: "Open case",
      },
      {
        title: "Campaign Teardown Playground",
        format: "Playground",
        description: "把你做项目的方法拆成可体验的诊断模块，而不是只停留在结果陈列。",
        href: "/playground",
        ctaLabel: "Open demo",
      },
    ],
  },
  {
    slug: "design-aesthetics",
    name: "Design / Aesthetics / Presentation",
    shortLabel: "Design",
    summary:
      "设计不是附属兴趣，而是你做内容和传播判断时的重要过滤器。它影响你怎么组织信息、怎么判断素材、怎么呈现一个系统。",
    whyItMatters:
      "这一层能让网站明显区别于传统营销人主页，因为它解释了你为什么会在意形式、氛围和信息密度。",
    signal:
      "原站里独立存在的 Design 分类、摄影入口和 Stephen Shore 封面偏好，都在说明你对视觉气质有稳定判断。",
    image: "/stephen-shore-cover.jpg",
    strengths: [
      "对视觉呈现和叙事气质有稳定偏好",
      "知道内容该如何被包装得更可读、更可传播",
      "能把审美判断和品牌传播逻辑连起来",
    ],
    lenses: [
      "设计在你这里不是装饰，而是信息组织方式",
      "摄影和视觉收藏会真实影响你对内容氛围的判断",
      "审美偏好会反过来决定站点如何排版、取图和留白",
    ],
    translations: [
      "让品牌沟通不只是有效，也更有气质和辨识度",
      "让网站本身成为信息架构和视觉判断的样本",
      "让 Thinking Feed 不再像博客列表，而更像被策划过的内容空间",
    ],
    outputs: [
      {
        title: "Design archive",
        format: "Archive",
        description: "来自原站 Design 分类的文章和收藏，适合重做成专题入口。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#8cbba5848f3149bb831c1a99a0b13756",
        ctaLabel: "Open archive",
      },
      {
        title: "Photography stream",
        format: "Visual",
        description: "照片和视觉观察可以被整理成独立的 visual journal，而不只是附在页面底部。",
        href: "https://www.instagram.com/jeremyjee/",
        ctaLabel: "Open Instagram",
      },
      {
        title: "Site art direction",
        format: "Website",
        description: "这个独立站本身也应该成为你审美判断和信息组织能力的展示物。",
        href: "/",
        ctaLabel: "Back to home",
      },
    ],
    starterKit: [
      {
        title: "Stephen Shore reference line",
        format: "Visual cue",
        description: "原站明确写了 Stephen Shore 的 cover credit，这不是装饰性引用，而是审美线索。",
        image: "/stephen-shore-cover.jpg",
      },
      {
        title: "Photography and visual notes",
        format: "Instagram",
        description: "你对现实场景的观察方式，和营销/文化判断一样，是站点里必须被看见的一层。",
        href: "https://www.instagram.com/jeremyjee/",
        ctaLabel: "Open visual notes",
      },
      {
        title: "Field Notes styling line",
        format: "Website",
        description: "把文字、图像、引用和小型资料卡交错使用，才能真正体现这条线的价值。",
        href: "/thinking-feed",
        ctaLabel: "Open feed page",
      },
    ],
  },
  {
    slug: "field-notes",
    name: "Field Notes / Personal Signals",
    shortLabel: "Notes",
    summary:
      "这里承接你的随笔、照片、情绪、音乐和更轻一点的观察，让网站保留人的纹理，而不是只剩职业功能。",
    whyItMatters:
      "如果这层被拿掉，网站就会过度职业化，失去你原站里最有辨识度的那部分个性。",
    signal:
      "原站首页自我介绍、随笔、照片、播客、信息源和 The Cure 这些提示，说明你本来就不想做纯职业网站。",
    image: "/jeremy-portrait.jpg",
    strengths: [
      "能把细碎观察沉淀成有气质的内容",
      "有稳定的个人语气，而不是标准职业语言",
      "让网站保有呼吸感和非工具性",
    ],
    lenses: [
      "随笔、照片、音乐偏好和 source library 共同构成个人世界观",
      "你更像在做个人杂志，而不是简历 landing page",
      "Field Notes 负责把职业证明重新放回一个人的生活感里",
    ],
    translations: [
      "让访客愿意继续逛，而不是看完一屏业绩就离开",
      "让合作方更快理解你的语气、审美和思维方式",
      "也是未来 Live Agent 更像“你本人”而不是 FAQ bot 的基础",
    ],
    outputs: [
      {
        title: "Field Notes shelf",
        format: "Writing",
        description: "原站里的随笔和碎片内容，适合做成长线更新流。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#8cbba5848f3149bb831c1a99a0b13756",
        ctaLabel: "Open archive",
      },
      {
        title: "Instagram / photography references",
        format: "Visual",
        description: "原站已经有照片入口，下一步应重做成更完整的视觉档案。",
        href: "https://www.instagram.com/jeremyjee/",
        ctaLabel: "Open Instagram",
      },
      {
        title: "Source library",
        format: "Research",
        description: "你收集的信息源可以作为个人知识结构的一部分，而不是隐藏的链接表。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#d91d641a9ba94741bf363c4fcb3499ea",
        ctaLabel: "Open source library",
      },
    ],
    starterKit: [
      {
        title: "無二無三",
        format: "Podcast",
        description: "比起单条文章，播客更能体现个人关系和语气，是很值得继续扩写的一层。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#210325f32bcd4eaa8d667ad8aab3f604",
        ctaLabel: "Open legacy episode",
      },
      {
        title: "Photos archive",
        format: "Visual",
        description: "原站已经把照片独立成一块，说明你原本就把图像当成内容，而不是点缀。",
        href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#3593ec0cf7b648b7892d9fe930a2dba5",
        ctaLabel: "Open archive",
      },
      {
        title: "Source library / 信息源",
        format: "Research",
        description: "数据库标签包含播客、RSS、博客，说明你的输入系统也是网站内容的一部分。",
        href: "https://www.notion.so/d7a33b6f5c88492da091f8b7fb3605f2",
        ctaLabel: "Open Notion database",
      },
    ],
  },
];

export const domainMap = Object.fromEntries(domains.map((domain) => [domain.slug, domain]));

export const featuredFeedEntries: FeedEntry[] = [
  {
    title: "Zhihu profile and article archive",
    format: "Zhihu",
    domain: "Japan / Marketing / Notes",
    description: "公开主页显示 143 个回答、57 篇文章、3 个专栏，是目前最明确的长线公开内容资产。",
    href: "https://www.zhihu.com/people/ji-qing-qiu",
    image: "/zhihu-avatar.jpg",
    note: "Verified on 2026-03-16",
  },
  {
    title: "Jeremy 的日语教室 - 如何用日文说我爱你",
    format: "Bilibili",
    domain: "Japan",
    description: "早期日语系列里最有记忆点的一支，说明你会用更轻巧的形式输出内容。",
    href: "https://www.bilibili.com/video/BV1at411k71b",
    image: "/video-love-you.jpg",
  },
  {
    title: "Jeremy 的日语教室 - 在东京用得上的日语词",
    format: "Bilibili",
    domain: "Japan",
    description: "把语言内容做得更生活化、更可传播，而不是标准课堂表达。",
    href: "https://www.bilibili.com/video/BV18t411B7Bm",
    image: "/video-tokyo-words.jpg",
  },
  {
    title: "Jeremy 的日语教室 - 如何用日语打招呼",
    format: "Bilibili",
    domain: "Japan",
    description: "能看出你在视频表达上的节奏感和人物感。",
    href: "https://www.bilibili.com/video/BV1Et41147Bw",
    image: "/video-greetings.jpg",
  },
  {
    title: "Jeremy 的日语教室 - 如何用日语点星巴克",
    format: "Bilibili",
    domain: "Japan / City life",
    description: "生活场景切入，让语言内容更容易被记住，也更符合你的观察方式。",
    href: "https://www.bilibili.com/video/BV1mt41147hb",
    image: "/video-starbucks.jpg",
  },
  {
    title: "Jeremy 的日语教室 - 职场日语指南",
    format: "Bilibili",
    domain: "Japan / Work",
    description: "把工作语境和语言细节并到一起，这种跨语境翻译正好对应你的工作方式。",
    href: "https://www.bilibili.com/video/BV11t411T74H",
    image: "/video-office-japanese.jpg",
  },
  {
    title: "Jeremy 的日语教室 - 日语中骂人的话",
    format: "Bilibili",
    domain: "Japan / Culture",
    description: "不是教科书式选题，而是从真实语言使用和情绪反应切入。",
    href: "https://www.bilibili.com/video/BV1Ab411z7Bd",
    image: "/video-swearing.jpg",
  },
  {
    title: "新编日语故事 - 鲨鱼和自我陶醉",
    format: "Bilibili",
    domain: "Japan / Storytelling",
    description: "说明你不仅会做信息型内容，也会尝试把叙事和语言学习合在一起。",
    href: "https://www.bilibili.com/video/BV1ht41187PD",
    image: "/video-shark-story.jpg",
  },
  {
    title: "無二無三",
    format: "Podcast",
    domain: "Japan / Notes",
    description: "和 Darin 共创的播客，适合下一步重构成完整音频入口。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#210325f32bcd4eaa8d667ad8aab3f604",
  },
  {
    title: "Instagram / photography references",
    format: "Visual",
    domain: "Design / Notes",
    description: "照片和视觉记录目前散落在站外，后续应并进网站的 Field Notes。",
    href: "https://www.instagram.com/jeremyjee/",
    image: "/notion-hero-photo.jpg",
  },
  {
    title: "Source Library / 信息源",
    format: "Research",
    domain: "Notes / Research",
    description: "数据库标签包含播客、RSS、博客，说明输入结构本来就是你网站的一部分。",
    href: "https://www.notion.so/d7a33b6f5c88492da091f8b7fb3605f2",
  },
];

export const zhihuPortalLinks = [
  {
    title: "Zhihu profile",
    description: "主入口，公开可见的回答、文章、专栏统计都在这里。",
    href: "https://www.zhihu.com/people/ji-qing-qiu",
  },
  {
    title: "Zhihu answers",
    description: "从问题回答角度浏览你的输出。",
    href: "https://www.zhihu.com/people/ji-qing-qiu/answers",
  },
  {
    title: "Zhihu posts (articles)",
    description: "从文章流角度浏览你的输出。",
    href: "https://www.zhihu.com/people/ji-qing-qiu/posts",
  },
  {
    title: "Legacy Notion article bookmarks",
    description: "原站文章书签聚合入口，包含 Japan / Marketing / Design / 随笔四组。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#8cbba5848f3149bb831c1a99a0b13756",
  },
];

export const bilibiliPlaylistLinks = [
  {
    title: "Bilibili profile / Jtube",
    description: "视频主入口。",
    href: "https://space.bilibili.com/6963341",
  },
  {
    title: "如何用日文说我爱你",
    description: "Jeremy 的日语教室 / Lesson 1",
    href: "https://www.bilibili.com/video/BV1at411k71b",
  },
  {
    title: "在东京用得上的日语词",
    description: "Jeremy 的日语教室 / Lesson 2",
    href: "https://www.bilibili.com/video/BV18t411B7Bm",
  },
  {
    title: "如何用日语打招呼",
    description: "Jeremy 的日语教室 / Lesson 3",
    href: "https://www.bilibili.com/video/BV1Et41147Bw",
  },
  {
    title: "如何用日语点星巴克",
    description: "Jeremy 的日语教室 / Lesson 4",
    href: "https://www.bilibili.com/video/BV1mt41147hb",
  },
  {
    title: "日语中骂人的话",
    description: "Jeremy 的日语教室 / Lesson 6",
    href: "https://www.bilibili.com/video/BV1Ab411z7Bd",
  },
  {
    title: "职场日语指南",
    description: "Jeremy 的日语教室 / Lesson 11",
    href: "https://www.bilibili.com/video/BV11t411T74H",
  },
  {
    title: "鲨鱼和自我陶醉",
    description: "新编日语故事系列",
    href: "https://www.bilibili.com/video/BV1ht41187PD",
  },
  {
    title: "Legacy Notion video section",
    description: "原站视频区总入口。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#6ace4cb37d1e4c21be9327a467faa17b",
  },
];

export const instagramToolOptions: ToolOption[] = [
  {
    name: "Instaloader",
    type: "Open-source CLI",
    link: "https://instaloader.github.io/",
    note: "支持命令行批量下载；私有账号需要登录后抓取。",
  },
  {
    name: "gallery-dl",
    type: "Open-source CLI",
    link: "https://gdl-org.github.io/docs/",
    note: "多站点统一下载器，支持 Instagram 抽取器与细粒度配置。",
  },
  {
    name: "Apify Instagram Scraper",
    type: "Managed cloud actor",
    link: "https://apify.com/apify/instagram-scraper",
    note: "托管型抓取服务，适合不想维护本地爬虫时使用。",
  },
  {
    name: "PhantomBuster Instagram Profile Scraper",
    type: "Managed automation",
    link: "https://phantombuster.com/automations/instagram/2236/instagram-profile-scraper",
    note: "自动化导出方案，适合做周期性同步任务。",
  },
];

export const instagramFallbackPhotos: GalleryPhoto[] = [
  {
    src: "/notion-hero-photo.jpg",
    alt: "Jeremy visual note from legacy site",
    href: "https://www.instagram.com/jeremyjee/",
  },
  {
    src: "/jeremy-portrait.jpg",
    alt: "Jeremy illustration from legacy site",
    href: "https://www.instagram.com/jeremyjee/",
  },
  {
    src: "/stephen-shore-cover.jpg",
    alt: "Design reference cover",
    href: "https://www.instagram.com/jeremyjee/",
  },
  {
    src: "/studio-note.jpg",
    alt: "Studio note visual",
    href: "https://www.instagram.com/jeremyjee/",
  },
];

export const instagramSyncNote =
  "Instagram profile currently reports private visibility in public API checks on 2026-03-16, so latest post media requires authenticated sync.";

export const instagramSyncCommand =
  ".venv/bin/instaloader --login <your_instagram_username> --dirname-pattern public/instagram --no-videos --no-captions --no-metadata-json --fast-update jeremyjee";

export const legacyArchiveLinks = [
  {
    title: "Legacy articles archive",
    format: "Notion",
    domain: "Cross-domain",
    description: "原站的文章归档入口，包含 Japan、Marketing Insights、Design 和随笔内容。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#8cbba5848f3149bb831c1a99a0b13756",
  },
  {
    title: "Legacy video archive",
    format: "Notion",
    domain: "Japan",
    description: "原站的视频区入口，保留了 Jeremy 的日语教室和其它视频内容。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#6ace4cb37d1e4c21be9327a467faa17b",
  },
  {
    title: "Legacy photo archive",
    format: "Notion",
    domain: "Field Notes",
    description: "原站照片入口，下一步适合重做成更完整的 visual journal。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#3593ec0cf7b648b7892d9fe930a2dba5",
  },
  {
    title: "Legacy source library",
    format: "Notion",
    domain: "Research",
    description: "原站的私藏信息源与精神食粮区，可演化为公开知识地图。",
    href: "https://www.notion.so/b72a6318b89f4fd9970583f379fff585#d91d641a9ba94741bf363c4fcb3499ea",
  },
];

export const sourceModes = [
  {
    title: "Podcasts",
    description: "原信息源数据库标签之一，说明你会把声音类输入当作长期研究来源，而不是随便收藏。",
  },
  {
    title: "RSS",
    description: "原数据库明确存在 RSS 标签，这说明输入结构是系统性的，而不是偶发式搜索。",
  },
  {
    title: "Blogs",
    description: "博客类输入和长文阅读，是你网站应该保留的“慢内容”底层。",
  },
];

export const proofMetrics: ProofMetric[] = [
  {
    value: "7+ years",
    label: "media strategy and communication",
    detail: "覆盖食品饮料、零售、服装、汽车、游戏等行业。",
  },
  {
    value: "RMB 150M",
    label: "annual budget scope managed",
    detail: "在 Range Rover 相关工作中管理年度预算规模 1.5 亿元。",
  },
  {
    value: "RMB 55M+",
    label: "annual cost led on key accounts",
    detail: "在 Nintendo / Bicester 等项目中主导年度成本与单项目预算控制。",
  },
  {
    value: "+30%",
    label: "brand recall uplift",
    detail: "任天堂新品商圈裸眼 3D 大屏广告带来品牌回忆率提升。",
  },
  {
    value: "-20%",
    label: "customer acquisition cost",
    detail: "Bicester Village 项目通过区域与内容重组降低获客成本。",
  },
  {
    value: "+20%",
    label: "sales above target",
    detail: "Nintendo CNY 项目销量超出预定目标。",
  },
  {
    value: "+50%",
    label: "offline store visits",
    detail: "Nintendo CNY 项目带动线下到店提升。",
  },
  {
    value: "+20%",
    label: "click-through rate",
    detail: "Bicester 项目中用更原生的 KOC 素材优化广告点击率。",
  },
];

export const proofCases: ProofCase[] = [
  {
    title: "Nintendo Game Console CNY Campaign",
    client: "Nintendo",
    period: "2022.12 - 2023.01",
    role: "Project Lead",
    summary:
      "围绕春节节点，把用户画像、点评搜索、线下门店和 KOL 攻略内容串成一条完整转化链。",
    results: [
      "Sales exceeded target by 20%",
      "Offline flagship store visits increased by 50%",
      "10+ KOL store-visit and guide-style posts amplified the campaign",
    ],
    approach: [
      "从 WeChat / ByteDance 历史投放数据回看搜索与购买历史，完成用户画像拆分",
      "利用大众点评品牌专区搜索广告，把强意图流量直接导向线下门店",
      "围绕探店、攻略和打卡内容设计达人素材，而不是单纯做曝光",
    ],
    stack: ["WeChat", "ByteDance", "Dianping", "KOL", "Retail activation"],
  },
  {
    title: "Bicester Village Growth Restructure",
    client: "Bicester Village",
    period: "2022.09 - 2023.04",
    role: "Project Lead",
    summary:
      "把微信和抖音的投放从粗放型购买改成按区域、内容和素材表达切分的增长结构。",
    results: [
      "Customer acquisition cost decreased by about 20%",
      "Click-through rate improved by 20%+ with more native KOC-style materials",
      "Built the annual WeChat Moments and Douyin planning logic for the account",
    ],
    approach: [
      "根据用户画像独立制定全年推广策略，规划 WeChat Moments 与 Douyin 信息流配比",
      "引入 district attack 和 content segmentation，让区域与内容表达一起变化",
      "针对点评信息流优化更原生的 KOC 素材和利益点文案",
    ],
    stack: ["WeChat Moments", "Douyin", "Dianping", "Programmatic", "Creative fit"],
  },
  {
    title: "Nintendo Launch and Recall Lift",
    client: "Nintendo",
    period: "2021.09 - 2023.09",
    role: "Planning Manager",
    summary:
      "围绕产品发售和节假日节点，匹配媒介场景化种草与高记忆度户外资源，提高新品认知。",
    results: [
      "Brand recall lifted by 30%+ through commercial district 3D OOH placement",
      "Annual spend led exceeded RMB 55M across key projects",
      "Built a repeatable framework for launch timing, scene choice, and follow-up media pacing",
    ],
    approach: [
      "根据产品发售和节假日营销节点设计项目排期，而不是均匀摊预算",
      "把 OOH、social、竞价和 SEO 放进同一节奏管理里",
      "用媒介分析和舆情预警共同支持传播决策",
    ],
    stack: ["OOH", "Social", "Bidding", "SEO", "Media diagnostics"],
  },
  {
    title: "Range Rover Integrated Planning",
    client: "Range Rover",
    period: "2023.12 - 2024.04",
    role: "Senior Media Planning Manager",
    summary:
      "协助管理 1.5 亿元年度预算，在数字、户外、杂志和 IP 合作之间建立统一规划节奏。",
    results: [
      "Managed an annual budget scope of RMB 150M",
      "Coordinated digital, OOH, magazine, and IP collaboration planning in one system",
      "Mentored 2 junior planners while maintaining delivery quality",
    ],
    approach: [
      "协助总监管理客户 / 代理商关系和团队日常媒介策划工作",
      "确保各渠道之间的无缝整合，以最大化覆盖和参与度",
      "把策略、执行和团队指导一起纳入项目管理范围",
    ],
    stack: ["Digital", "OOH", "Magazine", "IP partnership", "Team leadership"],
  },
  {
    title: "PUMA New Product Launch",
    client: "PUMA",
    period: "2021.03 - 2021.06",
    role: "Project Lead",
    summary:
      "围绕新品足篮跑发售节奏，整合球员、跑团、直播赛事和测评内容，追击年轻运动人群。",
    results: [
      "Led launch communication work on budgets above RMB 10M",
      "Built resource combinations across sports media, athletes, run clubs, and event streams",
      "Focused exposure on core sports users rather than broad awareness alone",
    ],
    approach: [
      "从用户偏好与兴趣圈出发，设计跑步 app、赛事直播和球员测评的组合",
      "统筹 brief、执行节奏、素材制作、打卡路线和二次传播",
      "让场景化内容和横纵测评内容成为资源使用的核心判断标准",
    ],
    stack: ["Sports media", "Run clubs", "Live streams", "Athlete KOL", "Briefing"],
  },
  {
    title: "Iced Dew and Tea House Media Evaluation",
    client: "Coca-Cola portfolio brands",
    period: "2019.10 - 2021.03",
    role: "Assistant Planning Manager",
    summary:
      "参与纯悦和淳茶舍等品牌传播，把媒体价值评估方法论接回真实投放效率。",
    results: [
      "Ad placement efficiency improved by about 10%",
      "Built evaluation logic across visibility, intensity, interactivity, and influence",
      "Supported annual planning, competitor research, and project scheduling in one role",
    ],
    approach: [
      "跟进品牌、市场及竞品传播动态，协助年度方案制定",
      "把代言人资源、线上娱乐和内容场景放进同一传播路径",
      "定期独立完成竞品项目报告，为后续投放决策提供依据",
    ],
    stack: ["Annual planning", "Media evaluation", "Competitor research", "FMCG"],
  },
];

export const careerTimeline: CareerStep[] = [
  {
    company: "OMG / Hearts & Science",
    role: "Senior Media Planning Manager",
    period: "2023.12 - 2024.04",
    summary: "负责 Range Rover 相关媒介传播与线索收集，管理 1.5 亿元年度预算。",
    bullets: [
      "协助总监统筹客户关系、代理协作和团队日常策划工作",
      "覆盖 digital、OOH、杂志合作和 IP 合作",
      "指导两名应届毕业生完成媒介策划和执行工作",
    ],
  },
  {
    company: "EssenceMediacom / GroupM",
    role: "Planning Manager",
    period: "2021.09 - 2023.09",
    summary: "重点负责 Nintendo、Bicester Village 等项目，预算与结果都最扎实。",
    bullets: [
      "主导年度费用 5500 万+，单项目最高 500 万+",
      "Recall +30%、CAC -20%、CTR +20%、SEO 非负率 +20%",
      "强项在全媒体投放、舆情监测、素材方向和平台适配",
    ],
  },
  {
    company: "Havas",
    role: "Planning Manager",
    period: "2021.03 - 2021.09",
    summary: "主要服务 PUMA、Hoka、Lycra 等鞋服品牌，负责年轻运动人群传播。",
    bullets: [
      "主导 1000 万+ 项目推广费用",
      "搭建跑团、赛事直播、球员测评和垂媒合作组合",
      "统筹执行排期、物料、路线和二次传播",
    ],
  },
  {
    company: "Dentsu Aegis",
    role: "Assistant Planning Manager",
    period: "2019.10 - 2021.03",
    summary: "参与纯悦、淳茶舍、美汁源等快消项目，建立了方法论底子。",
    bullets: [
      "帮助广告投放效率提升约 10%",
      "负责媒体资源收集、预算、排期与竞品研究",
      "用更结构化的方法评估广告位价值",
    ],
  },
];

export const credentialGroups: CredentialGroup[] = [
  {
    title: "Education",
    items: [
      "Communication University of China / Japanese Language / Bachelor's degree",
      "Public exchange study at Josai International University in Japan / Media Intelligence",
    ],
  },
  {
    title: "Languages",
    items: [
      "Japanese Language Proficiency Test Level 1 (JLPT-1)",
      "TEM-8",
      "TOEFL 93",
    ],
  },
  {
    title: "Certificates",
    items: [
      "Bytedance Brand Advertising Marketing Specialist",
      "Tencent Advertising Certified Marketing Assistant",
    ],
  },
  {
    title: "Tools",
    items: [
      "Telmar",
      "CNRS",
      "Kantar Media (TNS)",
      "Infosys",
      "Adex Power",
      "QuestMobile",
      "CODC",
      "GroupM proprietary tools",
    ],
  },
];

export const playgroundExperiments: PlaygroundExperiment[] = [
  {
    title: "Campaign Teardown",
    summary: "把一个品牌传播项目拆成 audience、channel、pacing、creative fit 和 actual result。",
    prompt: "Why is this campaign visible but not persuasive?",
    output: "问题定义、场景拆解、渠道冲突、下一轮修正建议。",
    status: "Best next step for an interactive V2",
  },
  {
    title: "Audience Mapper",
    summary: "把模糊的人群定义拆成兴趣群、意图群、场景群、区域群和内容偏好群。",
    prompt: "Who are we actually trying to reach, and where do they reveal intent?",
    output: "人群分层、优先级排序、媒介建议、内容切面。",
    status: "Content structure ready",
  },
  {
    title: "Media Mix Reframer",
    summary: "不是按平台列清单，而是判断每一类渠道在整个漏斗里的工作职责。",
    prompt: "Are we overbuying one channel because the brief is poorly framed?",
    output: "渠道职责图、预算重配建议、节奏建议。",
    status: "Concept designed",
  },
  {
    title: "Japan Trend Scan",
    summary: "把日本相关观察转成内容、品牌和平台灵感，而不是停留在信息搬运。",
    prompt: "What is culturally interesting here, and what is actually transferable?",
    output: "文化观察、内容启发、适用边界、传播切口。",
    status: "Strongest personality module",
  },
  {
    title: "Content-Channel Fit",
    summary: "判断内容风格是不是和媒介环境匹配，而不是默认同一条素材到处投。",
    prompt: "Why does the same message feel dead on one platform and alive on another?",
    output: "素材方向、语气建议、平台适配和优化提示。",
    status: "Close to demo-ready",
  },
  {
    title: "Creative Brief Generator",
    summary: "把一句模糊需求翻译成目标、受众、素材方向、媒介分工和执行约束。",
    prompt: "Turn this vague ask into a brief someone can actually make from.",
    output: "可执行 brief、制作约束、发布节奏、协作清单。",
    status: "Useful for collaboration intake",
  },
];

export const interfaceTracks: InterfaceTrack[] = [
  {
    title: "媒介策略诊断",
    summary: "适合已经在投，但感觉方向散、内容弱、转化不稳定的品牌或团队。",
    goodFor: [
      "投放效率下滑但原因不清楚",
      "预算不小，但渠道和内容互相打架",
      "需要判断是 brief、渠道还是素材的问题",
    ],
    deliverables: ["诊断框架", "问题分层", "下一轮修正优先级"],
  },
  {
    title: "用户与平台研究",
    summary: "适合问题本身还没被定义清楚，需要先看人群、平台和市场信号的时候。",
    goodFor: [
      "新品牌或新品类想先看市场切口",
      "需要把 cultural insight 接回真实平台行为",
      "想知道内容应该从什么场景入手",
    ],
    deliverables: ["用户拆分", "平台观察", "内容方向建议"],
  },
  {
    title: "内容方向校准",
    summary: "适合已经有预算和渠道，但内容形式和媒介环境不匹配的传播项目。",
    goodFor: [
      "素材做得很全，但就是不动人",
      "需要判断什么是平台原生，什么只是自说自话",
      "想把品牌调性和真实观看习惯接起来",
    ],
    deliverables: ["内容切面", "语气建议", "素材筛选规则"],
  },
  {
    title: "对谈 / 分享 / Workshop",
    summary: "适合围绕日本、营销、设计、AI 工作流和内容系统的合作邀约。",
    goodFor: [
      "团队内部分享或外部活动",
      "需要一个更系统而不空泛的视角",
      "希望内容既有方法，也保留个人气质",
    ],
    deliverables: ["分享框架", "讨论提纲", "定制化案例素材"],
  },
];

export const interfaceRules: InterfaceRule[] = [
  {
    title: "Bring the actual problem",
    detail: "最好直接给背景、目标、卡点、时间要求，而不是只说“聊聊合作”。",
  },
  {
    title: "Show current material early",
    detail: "如果已经有 brief、投放数据、deck 或内容草稿，越早给越好，判断会更准。",
  },
  {
    title: "Concrete beats abstract",
    detail: "我更适合处理具体问题，而不是替一个没有边界的问题发散到太远。",
  },
  {
    title: "Cross-domain is welcome",
    detail: "日本、营销、内容、设计、AI workflow 这些主题可以混搭，但要有真实问题连接它们。",
  },
];

export const contactEndpoints: ContactEndpoint[] = [
  {
    label: "Email",
    value: "jidashuang@outlook.com",
    href: "mailto:jidashuang@outlook.com",
    note: "最适合项目背景比较完整、需要留档的合作沟通。",
  },
  {
    label: "Telegram",
    value: "@JeremyJi",
    href: "https://t.me/JeremyJi",
    note: "如果已经明确问题，Telegram 会是更直接的入口。",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jeremyji",
    href: "https://www.linkedin.com/in/jeremyji/",
    note: "适合职业合作、介绍和背景核验。",
  },
  {
    label: "Zhihu",
    value: "zhihu.com/people/ji-qing-qiu",
    href: "https://www.zhihu.com/people/ji-qing-qiu",
    note: "想先看长期公开表达，从这里进最合适。",
  },
  {
    label: "Instagram",
    value: "instagram.com/jeremyjee",
    href: "https://www.instagram.com/jeremyjee/",
    note: "如果你更想从图像和气质理解这个人，可以先看这里。",
  },
];

export const agentPrompts = [
  "Jeremy 做过哪些和日本、零售、游戏有关的项目？",
  "他的内容系统里哪些最能代表个人风格？",
  "如果一个品牌传播效率在下滑，他会怎么诊断？",
  "哪些文章、视频、播客最适合先看？",
  "Japan / Marketing / Design 这三条线是怎么接起来的？",
];

export const agentCapabilities: AgentCapability[] = [
  {
    title: "Answer from Jeremy's archive",
    description: "先从文章、视频、播客、案例和 operating principles 里检索，再组织答案。",
    sources: ["Thinking Feed", "Zhihu archive", "Bilibili archive"],
    prompt: "Show me Jeremy's strongest Japan-related content first.",
  },
  {
    title: "Explain project history fast",
    description: "把 Nintendo、Bicester、Range Rover、PUMA 等项目翻成外部人也能迅速理解的版本。",
    sources: ["Proof of Work", "Resume", "Case summaries"],
    prompt: "What work proves he can handle retail and gaming campaigns?",
  },
  {
    title: "Recommend a reading path",
    description: "根据访客关心的是 Japan、marketing、design 还是 notes，给出最短浏览路径。",
    sources: ["Domain pages", "Featured feed entries"],
    prompt: "I care about design and photography first. Where should I start?",
  },
  {
    title: "Diagnose communication problems",
    description: "用 Jeremy 的方法论去判断 brief、channel、creative fit 和 pacing 的问题。",
    sources: ["Playground modules", "Interface protocol", "Career cases"],
    prompt: "If a campaign is visible but weak on conversion, how would he debug it?",
  },
];

export const agentSources: AgentSource[] = [
  {
    title: "Operating principles",
    detail: "首页和领域页里关于观察、系统、文化翻译的部分，定义了这位人的工作方式。",
    image: "/studio-note.jpg",
  },
  {
    title: "Proof cases",
    detail: "Nintendo、Bicester、Range Rover、PUMA 等项目提供可验证的工作样本。",
    image: "/notion-hero-photo.jpg",
  },
  {
    title: "Thinking Feed",
    detail: "知乎、B 站、播客、照片、信息源，共同构成站点的知识库底层。",
    image: "/video-office-japanese.jpg",
  },
  {
    title: "Field Notes",
    detail: "照片、随笔、音乐和 source library 让 agent 更接近一个真实的人，而不是 FAQ。",
    image: "/jeremy-portrait.jpg",
  },
];

export type ZhihuArticle = {
  title: string;
  url: string;
  category: "All About Japan" | "Essay" | "Marketing Insights" | "Design";
  image: string;
  description: string;
};

export const zhihuArticles: ZhihuArticle[] = [
  // All About Japan
  { title: "鬼冢虎商品目录册和日本现代主义", url: "https://zhuanlan.zhihu.com/p/354068325", category: "All About Japan", image: "https://pica.zhimg.com/v2-2eba8c5d59613a1cb6473035f9d0e567_720w.jpg?source=172ae18b", description: "\"现代主义\"在平面设计中是个承载了众多意义的词。有些人认为，它是平庸的美学，造成了企业世界设计的Helvetica化…" },
  { title: "动漫歌曲简明历史", url: "https://zhuanlan.zhihu.com/p/399998531", category: "All About Japan", image: "https://pic1.zhimg.com/v2-f6d8ad38fa8cbf94fb1522785d6cf2d2_720w.jpg?source=172ae18b", description: "我来介绍一下有关anime song，也就是动漫音乐的历史。日语里所谓的动漫音乐就是アニメソング，或者アニソン…" },
  { title: "清水混凝土简介", url: "https://zhuanlan.zhihu.com/p/349671912", category: "All About Japan", image: "https://pic1.zhimg.com/v2-1ba0dc0360dacae552e9745b065a0585_r.jpg?source=172ae18b", description: "东京可能是\"混凝土丛林\"的终极体现——不仅因为东京都以不可思议的速度大规模进行都市蔓延，还因为大量时髦的住宅使用了不加修饰的混凝土外墙。" },
  { title: "日本的双十一──Pocky Day", url: "https://zhuanlan.zhihu.com/p/340307769", category: "All About Japan", image: "https://picx.zhimg.com/v2-384d94bb7a9261abbad32b99b53762ce_720w.jpg?source=172ae18b", description: "众所周知，每年双十一是国人的购物狂欢节，但你是否知道，在我们的邻国日本，双十一这一天也是一个独特而有趣的节日呢？" },
  { title: "同人是什么？", url: "https://zhuanlan.zhihu.com/p/269867771", category: "All About Japan", image: "https://picx.zhimg.com/v2-5ce2a33c95f7f0b2cc6dbc1c022678ea_720w.jpg?source=172ae18b", description: "同人（doujin）：\"同一类人\"，指有共同兴趣的一群人。把这两个词语放在一起就得到了同人誌…" },
  { title: "有钱人家的小孩", url: "https://zhuanlan.zhihu.com/p/126666195", category: "All About Japan", image: "https://static.zhihu.com/heifetz/assets/apple-touch-icon-152.81060cab.png", description: "一篇关于阶层与教育的观察文章。" },
  { title: "在计算器上输入5318008并倒过来看", url: "https://zhuanlan.zhihu.com/p/126604889", category: "All About Japan", image: "https://pic1.zhimg.com/v2-13046ace5afbacb4c29716caaebfea18_720w.jpg?source=172ae18b", description: "这几天我一直在想乳房的事。不，不是你想的那样，和性事无关。这要从星野亚希说起，她是个不太招人喜欢的写真偶像…" },
  { title: "为什么日本人拍照要比V字Peace手势？", url: "https://zhuanlan.zhihu.com/p/126297563", category: "All About Japan", image: "https://pica.zhimg.com/v2-333cfa6cafdced66fdf33d74548ed6b9_720w.jpg?source=172ae18b", description: "\"为什么日本人拍照会习惯性比出V字手势？\"是一个一直令我疑惑的问题。这篇文章试图总结了目前已知的可靠信息…" },
  { title: "御宅族·猫耳朵·AKB48", url: "https://zhuanlan.zhihu.com/p/52969291", category: "All About Japan", image: "https://picx.zhimg.com/v2-cbf8fdcda7ec92f25c4043642045dfe6_l.jpg?source=172ae18b", description: "如今，许多消费成人漫画和\"girl game\"的日本御宅族，很可能将生殖器需求与主观意义上的\"性\"分离开…" },
  { title: "（未）受过教育的精英的国度", url: "https://zhuanlan.zhihu.com/p/52686659", category: "All About Japan", image: "https://picx.zhimg.com/v2-f00e070abbc7c0b2cf7ffd51a1e51a9a_720w.jpg?source=172ae18b", description: "最近读柏拉图的著作《理想国》，我不由自主地注意到书中关于政府的理想的观念与日本的政治结构有着惊人的相似之处。" },
  { title: "中银胶囊塔--复古的未来居住空间", url: "https://zhuanlan.zhihu.com/p/43276098", category: "All About Japan", image: "https://picx.zhimg.com/v2-582c4cc3fe7450fbab0f1f4a4869d4b4_720w.jpg?source=172ae18b", description: "第一眼看上去，整个大楼就像一大堆堆在一起的滚筒洗衣机。而实际上，整座公寓都是由一个个胶囊房间所组成的…" },
  { title: "3D Logo", url: "https://zhuanlan.zhihu.com/p/42677902", category: "All About Japan", image: "https://picx.zhimg.com/v2-65ebc44bec8c07a4f33557962ebc422b_720w.jpg?source=172ae18b", description: "日本设计师大村卓经营着一个有趣的项目，他称之为\"试错\"（trial and error）。大村将常见的公司logo通过3D打印机打印出原型。" },
  { title: "Shin Noguchi的古怪街头写真", url: "https://zhuanlan.zhihu.com/p/42770946", category: "All About Japan", image: "https://pic1.zhimg.com/v2-34fc0a96b9ead9e786f331398a05b76d_720w.jpg?source=172ae18b", description: "马克·吐温有句名言叫：\"事实比小说更离奇。但这是因为小说需要坚持合理性，事实却并不需要。\"" },
  { title: "日本辣妹（Gyaru）文化--第一部分", url: "https://zhuanlan.zhihu.com/p/41480177", category: "All About Japan", image: "https://picx.zhimg.com/v2-c79f6e9db724d17832cb2df7921454cc_720w.jpg?source=172ae18b", description: "日本人是这样理解他们自己的街头文化历史的，即认为历史是由一群年轻的\"群体\"不断演进而来。" },
  { title: "恋爱的行星", url: "https://zhuanlan.zhihu.com/p/42306187", category: "All About Japan", image: "https://pic1.zhimg.com/v2-c293613b307356921196a0122683bef5_720w.jpg?source=172ae18b", description: "在日本，几乎不可能做到的一件事就是和日本人谈论外国电影。并不是说日本人不看外国电影，只是他们需要花很长时间才能搞清楚…" },
  { title: "ミーハー", url: "https://zhuanlan.zhihu.com/p/41023676", category: "All About Japan", image: "https://static.zhihu.com/heifetz/favicon.ico", description: "关于日本流行文化和追星现象的深度观察。" },
  { title: "被狭隘定义的日本", url: "https://zhuanlan.zhihu.com/p/40714575", category: "All About Japan", image: "https://pic1.zhimg.com/v2-cbf8fdcda7ec92f25c4043642045dfe6_l.jpg?source=172ae18b", description: "《周刊playboy》杂志曾经做了一个对比专题，专题叫\"日本偶像vs世界性感美女\"。对日本形象的单一化解读…" },
  { title: "工作生活平衡--在日本没可能", url: "https://zhuanlan.zhihu.com/p/40373608", category: "All About Japan", image: "https://pic1.zhimg.com/v2-ee304e81b95dc22e4c061a74f2886115_720w.jpg?source=172ae18b", description: "日本政府组建过一个特别工作组，以解决国民工作与生活获得平衡的难题。任何关注日本人工作生活的人士，都会哀叹日本公司员工的工作时间长得离谱。" },
  { title: "功能饮料和日本工薪族的政治正确", url: "https://zhuanlan.zhihu.com/p/40351056", category: "All About Japan", image: "https://pic1.zhimg.com/v2-1531051f48eb4d9c5e646a7dcbf5c45c_720w.jpg?source=172ae18b", description: "与许多日本广告一样，\"リゲイン\"的TV广告以一种戏谑的夸张手法强化了产品信息。让我们来揣度一下整个CM情节…" },
  // Essay
  { title: "丢伞", url: "https://zhuanlan.zhihu.com/p/74540343", category: "Essay", image: "https://pic1.zhimg.com/v2-a5e2b62fbd6f4af62167a230eecb6367_720w.jpg?source=172ae18b", description: "俗话说得好：当天气变化时，你的生活也会产生变化。上海的雨季总是那么的漫长，作为一个懒人，我以前没有出门带伞的习惯…" },
  // Marketing Insights
  { title: "让产品使你变更好", url: "https://zhuanlan.zhihu.com/p/43046650", category: "Marketing Insights", image: "https://pic1.zhimg.com/v2-a1748ab56a22603e830fee36b7cbd1e1_720w.jpg?source=172ae18b", description: "1957年，百事可乐公司陷入了品牌创始以来最大的认同危机。尽管百事的市场营销人员做出了很多努力，百事可乐的销量还是被可口可乐超越了将近六倍。" },
  { title: "日本7-11的品牌重塑", url: "https://zhuanlan.zhihu.com/p/42845707", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-0ad518bad20e89e6caa5e15c062488c7_720w.jpg?source=172ae18b", description: "2010年，7-11日本找到知名平面设计师佐藤可士和，希望他能够帮助完成7-11品牌重塑的计划。" },
  { title: "跨界合作", url: "https://zhuanlan.zhihu.com/p/39000141", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-d904bf51180ebcf2a7421cc29e1ef624_720w.jpg?source=172ae18b", description: "阿迪达斯最近出人意料地宣布了和宜家的品牌合作伙伴关系。这俩个貌似风马牛不相及品牌进行合作，是不是一个不好的主意呢？" },
  { title: "体验式营销关乎广告的未来", url: "https://zhuanlan.zhihu.com/p/37010326", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-5456f3a5490de67b764036025ac5675e_720w.jpg?source=172ae18b", description: "随着传统的广告形式持续失去影响力，品牌管理者不得不开始重新构建他们的营销方式，以反映消费者和品牌之间的新关系。" },
  { title: "六个糟糕的品牌名称", url: "https://zhuanlan.zhihu.com/p/36830823", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-c3ef40f9d4494ddfe394ab3eef3b97e3_720w.jpg?source=172ae18b", description: "乍一看，这6个品牌名看起来非常糟糕，但仔细琢磨一下，在某种程度上它们都是容易记忆和联想的。" },
  { title: "品牌面临的数据隐私困境", url: "https://zhuanlan.zhihu.com/p/34955220", category: "Marketing Insights", image: "https://pic1.zhimg.com/v2-e06a105423e2f696a7c6943af709228d_720w.jpg?source=172ae18b", description: "1999年，甲骨文公司当时的CEO斯科特·麦克尼利曾有一句名言：\"无论在何种情况下，你都没有隐私可言，忘了它吧。\"" },
  { title: "在正确的渠道和语境中露出品牌", url: "https://zhuanlan.zhihu.com/p/34828563", category: "Marketing Insights", image: "https://pic1.zhimg.com/v2-3346aee342fdf5a7c8842e6826f33045_720w.jpg?source=172ae18b", description: "下回你在剧院中听到震耳欲聋的掌声时，一定要多思考一下。因为这掌声可能是表演十足精彩的证明，也可能仅仅是因为剧院专门雇佣的喝彩者。" },
  { title: "峰终定律--让品牌更容易被记得", url: "https://zhuanlan.zhihu.com/p/34507499", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-d410d9d59c97fd5bd8f0a2ef52b0ca98_720w.jpg?source=172ae18b", description: "显而易见地，我们的许多消费决策都受到过去的影响。想象一下你是如何选择一家餐厅的。你会回想一下你上次造访时候的经历…" },
  { title: "营销中的颜色运用", url: "https://zhuanlan.zhihu.com/p/33638286", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-51ab89b8e4b8be816d2acb5cc5ef6c86_720w.jpg?source=172ae18b", description: "你选择何种颜色来作为营销活动中的主色调？你做这个选择的理由是什么？是因为你喜欢那些特定的颜色，还是你有一个特定的营销信息想要传达？" },
  { title: "技术如何帮助建立以人为本的品牌", url: "https://zhuanlan.zhihu.com/p/33318844", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-c26e7ec795b3d605a115a0cf4fda73db_720w.jpg?source=172ae18b", description: "不少品牌都被技术的可能性所吸引，想象着技术在现实世界发挥不同作用的场景。Jucero是一家被众多人嘲笑的创业公司…" },
  { title: "声音营销", url: "https://zhuanlan.zhihu.com/p/32989334", category: "Marketing Insights", image: "https://picx.zhimg.com/v2-f23e29e0185d2150e605f26bc0320eb7_720w.jpg?source=172ae18b", description: "声音是一种可以触发特定的记忆或情绪的强大工具，这对于营销人员来说是必不可少的，随着亚马逊Echo和谷歌家庭助理等语音技术的推广…" },
  // Design
  { title: "电影电视剧中的平面设计", url: "https://zhuanlan.zhihu.com/p/31907603", category: "Design", image: "https://picx.zhimg.com/v2-d51d42dd905498f2580b51a74f14d53a_r.jpg?source=172ae18b", description: "当一部新电影上映时，大多数人的关注都会集中在导演、制片人和主演身上，但这之外还有很多其他的人直接或间接地参与了这部电影的制作。" },
  { title: "办公环境演化--从开放空间到小隔间再重回开放空间", url: "https://zhuanlan.zhihu.com/p/31562777", category: "Design", image: "https://static.zhihu.com/heifetz/favicon.ico", description: "办公室设计的百年演化史，从泰勒主义的开放式大厅，到20世纪中期隔间办公室的兴起，再到今天重回开放式的流变。" },
  { title: "\"不舒服\"设计", url: "https://zhuanlan.zhihu.com/p/30370030", category: "Design", image: "https://pic1.zhimg.com/v2-e7a8d2f3e281fdc2c19af66cce35d094_720w.jpg?source=172ae18b", description: "设计师经常被要求为日常生活中的问题开发创新产品。一位设计师突破思维定势，以一种反向创新的方式来创造\"令人烦恼的设计\"。" },
  { title: "绿皮书", url: "https://zhuanlan.zhihu.com/p/29991503", category: "Design", image: "https://picx.zhimg.com/v2-2ca6217e1ae7e183bb69f948894df353_720w.jpg?source=172ae18b", description: "二十世纪中叶是美国公路旅行的黄金时代。那时，汽车已经变得便宜又宽敞，足以满足一个家庭舒适地进行数百英里旅行的要求。" },
  { title: "相似的LOGO", url: "https://zhuanlan.zhihu.com/p/29785469", category: "Design", image: "https://picx.zhimg.com/v2-a2868dfa7f35cd60ee01458765e07f51_720w.jpg?source=172ae18b", description: "设计一个新的Logo看上去还是很难的。即使设计师想出了一些他们以前从未见过的Logo，但这并不意味着他们的设计是完全原创。" },
  { title: "消灭十字路口的左转弯", url: "https://zhuanlan.zhihu.com/p/24765159", category: "Design", image: "https://picx.zhimg.com/v2-227eadfddde7994332cfd95649c3c36d_720w.jpg?source=172ae18b", description: "自2004年以来，联合包裹服务（UPS）的物流部门已开始指示物流司机避免左转弯。该公司的工程师经过大量研究，发现左转会使得行程时间、燃料成本和事故风险增加。" },
  { title: "Barcelona's Superblocks", url: "https://zhuanlan.zhihu.com/p/24698327", category: "Design", image: "https://picx.zhimg.com/v2-9e2e64c5bcc76834ba60c3b9d820e4df_720w.jpg?source=172ae18b", description: "巴塞罗那的Superblock计划彰显出一种前卫的、步行者优先的城市规划理念。这种创新的街区构造被设计出用来减少城市车辆的出行量、噪声以及污染。" },
  { title: "石墙酒吧", url: "https://zhuanlan.zhihu.com/p/21544143", category: "Design", image: "https://pic1.zhimg.com/942bf9478e12912002d925530b418f2a_720w.jpg?source=172ae18b", description: "1969年6月28日凌晨，来自纽约市警察局的风化纠察小分队来到了位于曼哈顿格林威治村的石墙酒吧。" },
];
