# W2 Implementation Plan · Campaign Teardown v1 + Live Agent FAQ v1

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two W2 deliverables: (a) Campaign Teardown gets a real interactive widget with two preset cases (Nintendo CNY 2022 + Range Rover Flagship) returning 5 structured output blocks; (b) Live Agent FAQ v1 grows from 6 hand-written Q&A buttons to 10 entries with a `FAQEntry` shape + keyword-routed answer lookup + a static knowledge-router disclaimer.

**Architecture:**
- Campaign Teardown becomes a client component on `/playground/campaign-teardown` rendered conditionally from the existing `[slug]` page (no new route). Presets live in a typed data file; the component is pure presentation over preset data; a `lookupPreset(input, presets)` pure function handles keyword matching and is unit-tested.
- Live Agent FAQ data migrates from `AgentPrompt[]` (question/answer) to `FAQEntry[]` (triggers/answer/followUp/language). A pure `matchFAQ(input, entries)` function does keyword matching and is unit-tested. The page adds a text input wired to the matcher; existing click-to-expand button list stays as the "browse preset prompts" mode.
- A commented webhook constant (`CAMPAIGN_TEARDOWN_WEBHOOK_URL`) is reserved for V2 backend integration. No real API call in W2.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind 4 inline tokens · Zod 4 (schemas) · Vitest (unit tests).

**Spec:** `docs/superpowers/specs/2026-05-11-personal-site-build-plan.md` §3 W2 row, §5.1 Campaign Teardown, §5.2 Live Agent V0.

**Prerequisites:**
- Working dir for all commands: `/Users/jidashuang/Documents/Personal site/.claude/worktrees/redesign-2026-05`
- Current branch: `worktree-redesign-2026-05` (already 1 commit ahead of `origin/worktree-redesign-2026-05` carrying the W1 plan doc)
- W1 PR (#3) merge state does not block W2 — work continues on the same worktree branch
- `npm install` already run; node_modules present

**Style guard (project-level):** Do NOT use the AI-pattern `不是……而是……` or any variant (`并非……而是`, `不仅……还……`) in any new Chinese prose written into preset block text, FAQ answers, or UI copy. Reuse the existing Editorial Warm v2 voice from `src/data/live-agent.ts` as the reference register.

---

## File Map

**Create:**
- `src/data/playground/campaign-teardown-presets.ts` — `CampaignPreset[]` with Nintendo CNY 2022 + Range Rover Flagship, each carrying 5 structured blocks
- `src/components/playground/campaign-teardown.tsx` — client component: input field + preset chip selector + 5 output cards + fallback message + commented webhook constant
- `src/lib/faq-router.ts` — `matchFAQ(input, entries): FAQEntry | null` pure function
- `src/lib/faq-router.test.ts` — Vitest cases covering empty input, exact trigger match, multi-trigger match, no match, language filter
- `src/lib/playground-presets.ts` — `lookupPreset(input, presets): CampaignPreset | null` pure function
- `src/lib/playground-presets.test.ts` — Vitest cases covering preset id match, brand name match, no match

**Modify:**
- `src/lib/schemas.ts` — add `FAQEntrySchema` + `CampaignPresetSchema` (with nested `TeardownBlocksSchema`)
- `src/lib/schemas.test.ts` — add cases for the two new schemas
- `src/data/live-agent.ts` — migrate `AgentPrompt` → `FAQEntry`, port existing 6 prompts to the new shape (filling `triggers` + `followUp`), add 4 new entries (total = 10); export a re-shaped const named `faqEntries` and keep a deprecated alias `prompts` for the homepage section so it can be removed in a focused commit
- `src/components/sections/live-agent-block.tsx` — read `faqEntries` instead of `prompts`; render question text using `entry.answer.split("\n")[0]` is NOT needed — keep the 6-line button list pulling `entry.question` (we add `question` back to FAQEntry — see Task 1)
- `src/app/live-agent/page.tsx` — read `faqEntries`; add `<input>` element + `useState` for query; on submit run `matchFAQ`; render matched answer + followUp links; keep the preset list below; append the disclaimer line `Static knowledge router · LLM integration pending`
- `src/app/playground/[slug]/page.tsx` — when `slug === "campaign-teardown"`, render `<CampaignTeardown />` instead of the MDX import; other slugs (`audience-mapper`) keep MDX
- `src/data/playground/campaign-teardown.mdx` — trim to a 3-line "What this demo does" header that renders ABOVE the widget (we keep the file because [slug] route may still load it for the descriptive section)

**Verify (no edits expected):**
- `src/styles/tokens.css` — confirm `--ink`, `--paper`, `--paper-2`, `--warm`, `--line` already exist (they do)
- `src/components/primitives/*` — `Eyebrow`, `Pill`, `Tag` available for reuse in output cards
- `package.json` — confirm `vitest`, `eslint` scripts are present (they are)

---

## Task 1: Add `FAQEntry` and `CampaignPreset` schemas

**Files:**
- Modify: `src/lib/schemas.ts` (append after the existing exports)
- Modify: `src/lib/schemas.test.ts` (append new describe blocks)

- [ ] **Step 1: Write failing tests in `src/lib/schemas.test.ts`**

Append to the existing test file:

```ts
import { FAQEntrySchema, CampaignPresetSchema } from "./schemas";

describe("FAQEntrySchema", () => {
  it("validates a complete entry with both languages", () => {
    const valid = {
      id: "brief-thinking",
      question: "他怎么思考一个新品牌的传播 brief?",
      triggers: ["brief", "新品牌", "传播 brief"],
      answer: "三步:先质疑 brief 里的假设,再拆决策路径,最后定补洞优先级。",
      followUp: [{ label: "看 Range Rover 案例", href: "/proof-of-work/range-rover-flagship" }],
      language: "both",
    };
    expect(() => FAQEntrySchema.parse(valid)).not.toThrow();
  });

  it("rejects an entry with empty triggers", () => {
    expect(() =>
      FAQEntrySchema.parse({
        id: "x", question: "x", triggers: [], answer: "x", followUp: [], language: "zh",
      })
    ).toThrow();
  });

  it("rejects an entry with bad language enum", () => {
    expect(() =>
      FAQEntrySchema.parse({
        id: "x", question: "x", triggers: ["x"], answer: "x", followUp: [], language: "jp",
      })
    ).toThrow();
  });
});

describe("CampaignPresetSchema", () => {
  it("validates a preset with all 5 blocks", () => {
    const valid = {
      id: "nintendo-cny-2022",
      label: "Nintendo · 2022 春节",
      triggers: ["nintendo", "任天堂", "春节", "cny"],
      blocks: {
        problemFraming: "Switch 在中国市场需要把春节窗口当成情绪放大器。",
        audience: "家庭决策者 + 年轻玩家的双层人群,触点分别在朋友圈和 B 站。",
        channelMix: "朋友圈视频做 reach,B 站长内容做 consideration,京东自营页接 conversion。",
        pacing: "腊月廿三起 7 天预热,初一到初五日更,初六收口复盘。",
        creativeFit: "全家欢 IP 跟春节场景天然咬合,色彩用红+金对齐节日符号。",
      },
      resultLink: { label: "看完整复盘 →", href: "/proof-of-work/nintendo-cny-2022" },
    };
    expect(() => CampaignPresetSchema.parse(valid)).not.toThrow();
  });

  it("rejects a preset missing problemFraming", () => {
    expect(() =>
      CampaignPresetSchema.parse({
        id: "x", label: "x", triggers: ["x"],
        blocks: { audience: "x", channelMix: "x", pacing: "x", creativeFit: "x" },
      })
    ).toThrow();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- src/lib/schemas.test.ts
```

Expected: 5 new tests fail with `FAQEntrySchema is not exported` / `CampaignPresetSchema is not exported`.

- [ ] **Step 3: Implement schemas in `src/lib/schemas.ts`**

Append to the end of `src/lib/schemas.ts` (after the existing exports):

```ts
export const LanguageSchema = z.enum(["zh", "en", "both"]);

export const FollowUpSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const FAQEntrySchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  triggers: z.array(z.string().min(1)).min(1),
  answer: z.string().min(1),
  followUp: z.array(FollowUpSchema).default([]),
  language: LanguageSchema,
});
export type FAQEntry = z.infer<typeof FAQEntrySchema>;

export const TeardownBlocksSchema = z.object({
  problemFraming: z.string().min(1),
  audience: z.string().min(1),
  channelMix: z.string().min(1),
  pacing: z.string().min(1),
  creativeFit: z.string().min(1),
});
export type TeardownBlocks = z.infer<typeof TeardownBlocksSchema>;

export const CampaignPresetSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  triggers: z.array(z.string().min(1)).min(1),
  blocks: TeardownBlocksSchema,
  resultLink: FollowUpSchema.optional(),
});
export type CampaignPreset = z.infer<typeof CampaignPresetSchema>;
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- src/lib/schemas.test.ts
```

Expected: all schema tests pass, including the 5 new ones.

- [ ] **Step 5: Commit**

```bash
git add src/lib/schemas.ts src/lib/schemas.test.ts
git commit -m "feat(schemas): add FAQEntry and CampaignPreset schemas"
```

---

## Task 2: Migrate Live Agent data to `FAQEntry[]` and grow to 10 entries

**Files:**
- Modify: `src/data/live-agent.ts` (full rewrite — keep this file's responsibility but change the export shape)

**Decision note:** existing prompts live as 6 verbose Q&A strings in `src/data/live-agent.ts`. We port all 6 to the new shape (auto-filling `triggers` from question keywords), then add 4 fresh entries to reach 10. The new fresh entries target high-value queries the spec calls out: "what is Jeremy's CV like", "how does he choose tools", "what is his Japan POV", "can I get his slides/CV".

- [ ] **Step 1: Rewrite `src/data/live-agent.ts`**

Replace the entire file content with:

```ts
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
    answer: `他会先把 brief 拆成三个独立的问题,每个问完才进下一个:

第一个:这个品类的真实购买理由是什么。不是品牌方"希望大家觉得它怎么样",是消费者打开钱包之前心里 actually 想的那一句话。这一步通常会发现 brief 里已经埋了一个错的假设。

第二个:他们用什么平台做出决定。不同品类有完全不同的决策路径——美妆走小红书种草、3C 走知乎评测、母婴走垂类社群。这一步决定了媒介组合的骨架。

第三个:过去的传播在哪一步漏了。如果是新品牌,这一步换成"竞品在哪一步成功"。这一步决定了今年要补的洞。

三个答完之后,brief 通常会被改一遍——而不是按原样执行。这种"先质疑 brief"的习惯,是他在 EssenceMediacom 做 Range Rover 那年学会的。`,
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
    answer: `他通常会反问三件事再回答:

—— 你的品类是新进入还是要重塑?
—— 你的预算是百万级、千万级、还是亿级?
—— 你的时间窗是 campaign 周期(4-8 周)还是常态运营?

四个 case 大致对应四种问题形状:

Range Rover(旗舰新车上市)适合"小受众、高客单价、需要文化叙事"的项目。

Nintendo(春节传播)适合"IP 已有认知、要在特定节点放大"的项目,时间窗紧。

Bicester Village(用户拉新)适合"线上拉新打到店转化"的本地零售类项目。

PUMA(新品上市)适合"品类竞争激烈、内容方向需要重新锚定"的项目。

把你的项目跟这四个比一下,一般能定位到一个最近的对照组。`,
    followUp: [
      { label: "看四个 proof-of-work →", href: "/proof-of-work" },
    ],
  },
  {
    id: "japan-touchpoints",
    question: "他在日本研究里最受触动的三件事是什么?",
    triggers: ["日本", "japan", "受触动", "便利店"],
    language: "zh",
    answer: `第一件:便利店收银台后面的灯光。日本便利店把"日常感"做成了一种被精确控制的视觉系统——色温、亮度、货架反光、收银员动线,每一项都对应一个消费心理判断。看完之后你会重新理解"日常营销"——它从来都不是"接地气",而是被设计过的视觉舒适。

第二件:JR 月台的广告排版。日本平面广告对版式的克制,源于一个朴素假设:"看广告的人是匆忙的"。所以信息层级要在 0.5 秒内被读完,色块的对比要在低光环境下不刺眼。这个假设迁移到中国地铁场景一样成立,但很少有人这么做。

第三件:大阪小店的 menu 设计。手写 menu 在日本不是"复古",是商家与顾客之间建立信任的视觉信号——"这家店是真人在经营"。当你理解这个信号之后,你会突然看到中国本地店铺的 menu 在向哪个方向演化、为什么有些品牌需要刻意"去标准化"才能赢回信任。

这三件事都指向同一个判断:日本提供的不是文化奇观,是商业系统的可观察样本。`,
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

具体来说:把上一波 campaign 表现"中等"的渠道——既没明显失败也没明显成功的那一档——挪出预算。原因是:中等表现的渠道往往是因为目标人群刚好对一半,看起来在工作其实在浪费一半钱。这类渠道留着是出于"上次也用了"的惯性,不是策略选择。

砍完之后再补两类:一类是上一波明显跑出 ROI 但预算给少了的(加 30-50%),一类是数据空白但跟产品逻辑契合的小渠道(放 10% 做试验)。

这套做法的前提是要做媒介复盘,这一步很多团队跳过了。`,
    followUp: [
      { label: "看 Marketing area →", href: "/areas/marketing" },
    ],
  },
  {
    id: "creative-vs-brief",
    question: "他怎么判断一个 creative 偏离了 brief?",
    triggers: ["creative", "偏离", "判断 creative", "brief"],
    language: "zh",
    answer: `他用三个问题快速测:

一,这条 creative 抽掉品牌 logo 之后,还能立刻看出在卖什么品类吗?能,说明它讲清了品类问题;不能,说明它在自 high。

二,把这条 creative 放到目标受众真实使用的内容场景里(比如刷小红书、刷抖音、看 B 站),它会被滑过还是会被点开?不需要测试,凭经验过一遍。

三,如果三个月后回看,这条 creative 让品牌资产积累了一点点,还是只是消费了一次媒介预算?

三个里两个答"不行",就要 push back。`,
    followUp: [
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "data-vs-instinct",
    question: "数据和直觉冲突的时候他怎么选?",
    triggers: ["数据", "直觉", "instinct", "冲突"],
    language: "zh",
    answer: `他会先问:这个直觉的来源是什么。

如果直觉来自"我跟这个人群长期接触、我知道他们怎么想",那它本质是没被结构化的数据——值得跟报表上的数据并列权衡。这种情况下他会做小预算试验来调和两边。

如果直觉来自"我觉得应该这样",没有具体接触做支撑——那它就是偏好,不是判断。这种情况下他会偏向数据。

判断直觉是不是"伪装成洞察的偏好",是他给自己设的一道闸门。`,
    followUp: [
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "cv-ask",
    question: "可以看他的 CV 吗?",
    triggers: ["cv", "简历", "履历", "resume"],
    language: "both",
    answer: `可以。中英两版都在 /interface 页底部下载区,PDF 不到 200KB。

CV 上的关键信息:剑桥 Judge 在读 / EssenceMediacom Range Rover 媒介策略 / Nintendo 中国春节传播 / Bicester Village 上海拉新 / PUMA 新品方向重锚。

更详细的项目复盘在 /proof-of-work,内容比 CV 长 10 倍。`,
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
    answer: `日常三件套:

Notion 做 brief 拆解和阶段性 memo——它的 toggle 适合做"假设/证据/结论"三层结构。

Figma 做内容方向的视觉拼盘——把竞品 5-10 个 creative 横向铺出来比写文字快。

Claude / GPT 做信息密度高的初稿草稿——他不让 LLM 给结论,只让它把 5 篇文章压成 1 页要点。结论由他自己写。

不用的:营销自动化平台、SaaS dashboard。原因是它们的数据维度通常滞后于真实的人群行为变化,看了反而被误导。`,
    followUp: [
      { label: "看四条工作原则 →", href: "/#operating-system" },
    ],
  },
  {
    id: "japan-pov",
    question: "他对日本市场最想说的一句话是什么?",
    triggers: ["日本市场", "pov", "japan pov", "一句话"],
    language: "zh",
    answer: `日本不是用来"学品牌的",日本是用来"看商业基础设施怎么稳定运行十年以上"的。

很多中国品牌从日本学的是表层视觉(极简、留白、克制),但忽略了背后是供应链稳定 + 渠道分层成熟 + 消费者忠诚长尾这三件硬基础设施。脱开这些去抄视觉,会做出"日式皮、中国体"的拧巴产品。

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
    answer: `公开版本没有放在站点上。原因是 PPT 里大量数据是客户原数据,直接公开违反 NDA。

替代方案是 /proof-of-work 下的四篇深度复盘——那里把"提案讲过什么"用文字重写了一遍,数据脱敏。如果有具体项目想了解,可以发邮件,他会判断哪些可以在不违反 NDA 的前提下分享。

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
```

- [ ] **Step 2: Verify build still compiles**

```bash
npm run lint -- src/data/live-agent.ts
```

Expected: 0 errors. If `@/lib/schemas` import path resolution complains, confirm `tsconfig.json` paths and try absolute `../lib/schemas`.

- [ ] **Step 3: Verify schema parse runs at import time**

```bash
npx vitest run src/lib/schemas.test.ts
```

Expected: all tests pass. Then sanity-check the data parses by running:

```bash
node --input-type=module -e "import('./src/data/live-agent.ts').then(m => console.log('entries:', m.faqEntries.length))" 2>&1 | tail -5
```

Note: this Node run may fail if `next` aliasing is needed at runtime. The real validation is the schema test in Task 1 + the build in Task 8 — if those pass, the data parses.

- [ ] **Step 4: Commit**

```bash
git add src/data/live-agent.ts
git commit -m "data(live-agent): migrate to FAQEntry shape, grow to 10 entries"
```

---

## Task 3: Add `matchFAQ` keyword-routing function with tests

**Files:**
- Create: `src/lib/faq-router.ts`
- Create: `src/lib/faq-router.test.ts`

- [ ] **Step 1: Write failing tests in `src/lib/faq-router.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { matchFAQ } from "./faq-router";
import type { FAQEntry } from "./schemas";

const entries: FAQEntry[] = [
  {
    id: "brief", question: "Q1",
    triggers: ["brief", "新品牌"],
    answer: "A1", followUp: [], language: "zh",
  },
  {
    id: "japan", question: "Q2",
    triggers: ["日本", "japan", "便利店"],
    answer: "A2", followUp: [], language: "zh",
  },
  {
    id: "cv", question: "Q3",
    triggers: ["cv", "简历"],
    answer: "A3", followUp: [], language: "both",
  },
];

describe("matchFAQ", () => {
  it("returns null for empty input", () => {
    expect(matchFAQ("", entries)).toBeNull();
    expect(matchFAQ("   ", entries)).toBeNull();
  });

  it("matches a single trigger case-insensitively", () => {
    expect(matchFAQ("CV please", entries)?.id).toBe("cv");
    expect(matchFAQ("简历呢", entries)?.id).toBe("cv");
  });

  it("matches the entry whose trigger appears in the input", () => {
    expect(matchFAQ("聊聊日本便利店", entries)?.id).toBe("japan");
    expect(matchFAQ("japan?", entries)?.id).toBe("japan");
  });

  it("returns the first match when multiple entries hit", () => {
    // "brief" hits entry[0], "cv" hits entry[2]. First in source wins.
    expect(matchFAQ("brief and cv", entries)?.id).toBe("brief");
  });

  it("returns null when no trigger appears", () => {
    expect(matchFAQ("完全不相关的提问", entries)).toBeNull();
  });

  it("returns null when entries array is empty", () => {
    expect(matchFAQ("anything", [])).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/lib/faq-router.test.ts
```

Expected: FAIL with `Cannot find module './faq-router'`.

- [ ] **Step 3: Implement `src/lib/faq-router.ts`**

```ts
import type { FAQEntry } from "./schemas";

/**
 * matchFAQ runs a case-insensitive substring search over each entry's triggers
 * against the user input. The first entry with any trigger present in the input
 * wins (source order is intentional — author-curated priority).
 *
 * Returns null for empty/whitespace input or no match.
 */
export function matchFAQ(input: string, entries: FAQEntry[]): FAQEntry | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  for (const entry of entries) {
    for (const trigger of entry.triggers) {
      if (q.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  return null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/lib/faq-router.test.ts
```

Expected: all 6 cases PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/faq-router.ts src/lib/faq-router.test.ts
git commit -m "feat(lib): add matchFAQ keyword router with tests"
```

---

## Task 4: Wire `/live-agent` page to input + matcher + disclaimer

**Files:**
- Modify: `src/app/live-agent/page.tsx`
- Modify: `src/components/sections/live-agent-block.tsx`

- [ ] **Step 1: Rewrite `src/app/live-agent/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { faqEntries } from "@/data/live-agent";
import { matchFAQ } from "@/lib/faq-router";
import type { FAQEntry } from "@/lib/schemas";

export default function LiveAgentPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const matched: FAQEntry | null = submitted ? matchFAQ(submitted, faqEntries) : null;
  const noMatch = submitted !== null && submitted.trim() !== "" && matched === null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(query);
    setActiveIdx(null);
  }

  return (
    <SiteShell current="agent">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="06" label="Live Agent" trailing="Static knowledge router · LLM integration pending" />

        <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "12px", padding: "32px 36px", marginTop: "20px" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>$ ask jeremy</span>
          <h1 className="h-display-m" style={{ margin: "12px 0 22px", color: "var(--paper)" }}>
            一个读过我所有内容的 AI 分身。
          </h1>
          <p className="body" style={{ opacity: 0.75, color: "var(--paper)", maxWidth: "60ch" }}>
            建立在文章、案例、方法论之上。下面输入关键词,或者点开下方预设问题看示范回答。
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="试试 'brief'、'日本'、'CV'、'媒介'…"
              aria-label="Ask Jeremy"
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)", color: "var(--paper)",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px",
                padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "13px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--warm)", color: "var(--paper)", border: 0, borderRadius: "6px",
                padding: "0 18px", fontFamily: "var(--font-mono)", fontSize: "12px",
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >
              Ask
            </button>
          </form>

          {matched ? (
            <div style={{ marginTop: "22px", padding: "20px", background: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
              <p className="eyebrow" style={{ color: "var(--warm)" }}>Routed to · {matched.id}</p>
              <h2 className="h-3" style={{ color: "var(--paper)", margin: "8px 0 14px" }}>{matched.question}</h2>
              <div className="body" style={{ color: "var(--paper)", opacity: 0.92, whiteSpace: "pre-line" }}>
                {matched.answer}
              </div>
              {matched.followUp.length > 0 ? (
                <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {matched.followUp.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      style={{
                        color: "var(--warm)", fontFamily: "var(--font-mono)", fontSize: "12px",
                        border: "1px solid var(--warm)", padding: "6px 12px", borderRadius: "4px",
                      }}
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {noMatch ? (
            <div style={{ marginTop: "22px", padding: "16px 20px", background: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
              <p className="caption" style={{ color: "var(--paper)", opacity: 0.7 }}>
                没匹配到关键词。试试下方预设问题,或者把问题换个说法。
              </p>
            </div>
          ) : null}
        </div>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>预设问题</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
          {faqEntries.map((p, i) => (
            <li key={p.id} style={{ borderTop: "1px solid var(--line)" }}>
              <button
                type="button"
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", background: "transparent", border: 0,
                  padding: "16px 0", color: "var(--ink)",
                  fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "17px",
                  cursor: "pointer",
                  display: "flex", alignItems: "baseline", gap: "14px",
                }}
              >
                <span style={{ color: "var(--warm)", fontFamily: "var(--font-mono)", fontStyle: "normal" }}>?</span>
                <span>{p.question}</span>
                <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: "12px", fontFamily: "var(--font-mono)" }}>{activeIdx === i ? "−" : "+"}</span>
              </button>
              {activeIdx === i ? (
                <div className="body" style={{ padding: "0 0 22px 28px", whiteSpace: "pre-line" }}>
                  {p.answer}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>What this knows · What this won&apos;t do</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <div style={{ padding: "20px", border: "1px solid var(--line)", borderRadius: "8px" }}>
            <p className="eyebrow">Knows</p>
            <ul className="caption" style={{ paddingLeft: "16px", marginTop: "8px" }}>
              <li>Jeremy 的文章 / 公众号</li>
              <li>4 个完整 case writeup</li>
              <li>2 个 playground walkthrough</li>
              <li>4 个 area manifesto</li>
              <li>CV 内容</li>
            </ul>
          </div>
          <div style={{ padding: "20px", border: "1px solid var(--line)", borderRadius: "8px" }}>
            <p className="eyebrow">Won&apos;t do</p>
            <ul className="caption" style={{ paddingLeft: "16px", marginTop: "8px" }}>
              <li>不替 Jeremy 拍板</li>
              <li>不模仿 Jeremy 写作风格做新内容</li>
              <li>对未公开的项目 say nothing</li>
              <li>没看过的题目,会 routing 到 /interface</li>
            </ul>
          </div>
        </div>

        <p className="caption" style={{ marginTop: "24px", opacity: 0.6, fontFamily: "var(--font-mono)", fontSize: "11px" }}>
          Static knowledge router · LLM integration pending
        </p>
      </section>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Update `src/components/sections/live-agent-block.tsx` to consume `faqEntries`**

Replace the existing import:

```ts
// before
import { prompts } from "@/data/live-agent";

// after
import { faqEntries } from "@/data/live-agent";
```

Replace the slice + render:

```ts
// before
const homepagePrompts = prompts.slice(0, 4);
// ...
{homepagePrompts.map((p) => (
  <li key={p.question} ...>
    ... {p.question}
  </li>
))}

// after
const homepagePrompts = faqEntries.slice(0, 4);
// ...
{homepagePrompts.map((p) => (
  <li key={p.id} ...>
    ... {p.question}
  </li>
))}
```

(Visual layout, classes, and key change to `p.id`. Everything else stays.)

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: 0 errors. If `prompts` is now unused warning appears in `live-agent.ts`, that's expected — Task 7 cleans it up after this commit lands.

- [ ] **Step 4: Smoke-test in dev**

```bash
npm run dev
```

Then in a browser:
1. Open `http://localhost:3000/live-agent`
2. Type `CV` in the input → press Ask → expect routed card with "可以看他的 CV 吗?" and 2 follow-up links
3. Type `xyz123` → press Ask → expect "没匹配到关键词" notice
4. Click `?` button on the 3rd preset → expect Japan touchpoints answer to expand
5. Scroll to bottom → expect `Static knowledge router · LLM integration pending` caption
6. Open `http://localhost:3000/` → scroll to Live Agent block → expect first 4 questions still shown

Stop the dev server with Ctrl+C when satisfied.

- [ ] **Step 5: Commit**

```bash
git add src/app/live-agent/page.tsx src/components/sections/live-agent-block.tsx
git commit -m "feat(live-agent): input + matcher routing + disclaimer"
```

---

## Task 5: Add Campaign Teardown presets data + `lookupPreset` function

**Files:**
- Create: `src/data/playground/campaign-teardown-presets.ts`
- Create: `src/lib/playground-presets.ts`
- Create: `src/lib/playground-presets.test.ts`

- [ ] **Step 1: Create `src/data/playground/campaign-teardown-presets.ts`**

```ts
import { CampaignPresetSchema, type CampaignPreset } from "@/lib/schemas";

const raw: CampaignPreset[] = [
  {
    id: "nintendo-cny-2022",
    label: "Nintendo · 2022 春节",
    triggers: ["nintendo", "任天堂", "cny", "春节", "switch"],
    blocks: {
      problemFraming:
        "Switch 在中国市场的认知已有,但春节窗口需要一次情绪放大——把硬件叙事拉回到家庭场景,让购买理由从'我要玩什么'变成'我们一起玩什么'。",
      audience:
        "两层人群:18-28 岁年轻玩家自己决定买什么游戏,30-45 岁家庭决策者决定送什么礼。前者触点在 B 站和小红书,后者触点在朋友圈和京东 banner。两条触点要分头打,内容口吻不能复用。",
      channelMix:
        "朋友圈视频做大盘 reach,B 站三档 UP 主长内容做 consideration,京东自营页 + 抖音搜索词做 conversion 收口。RedBook 走 KOC 真实开箱,不走头部硬广。",
      pacing:
        "腊月廿三起 7 天预热(主投朋友圈视频),除夕到初一发布全家欢主片,初二到初五日更场景化短视频,初六做媒介复盘并准备元宵收口波次。节奏最怕的是初一一波打完就停。",
      creativeFit:
        "全家欢 IP 跟春节场景天然咬合,色彩以日式红 + 中国金调和,避开纯日式克制风。台词用'一起玩'而不是'独自享受',跟春节'团圆'语义对齐。Switch 硬件特性放在第二层,不抢情绪表达。",
    },
    resultLink: { label: "看完整复盘 →", href: "/proof-of-work/nintendo-cny-2022" },
  },
  {
    id: "range-rover-flagship",
    label: "Range Rover · 旗舰上市",
    triggers: ["range rover", "路虎", "揽胜", "旗舰"],
    blocks: {
      problemFraming:
        "豪华 SUV 旗舰在中国的购买理由已经从参数比较移到生活方式认同。Range Rover 这一波要解决的是'让目标受众觉得这台车配得上他想成为的那个人',而不是把零百加速再喊一次。",
      audience:
        "核心人群是 40+ 二次购车的高净值男性,精神受众扩到他们的另一半(决定家庭出行场景)。第一层触点是高端商场和高尔夫场,第二层是私人飞行和精品酒店的合作展位。",
      channelMix:
        "媒介组合刻意降权传统 OTV,把预算重压到三类:高端户外(机场 + CBD 数字大屏)、垂类深度(汽车之家长评 + 知乎专栏)、生活方式品牌联名(精品酒店 + 高端腕表)。展厅触点单独算预算。",
      pacing:
        "节奏拉到 12 周:首 4 周做生活方式叙事铺垫(不强提产品),中 4 周做媒介 + 试驾邀约,后 4 周做经销商体验和口碑收口。每 4 周设一次内部 review,允许调内容方向。",
      creativeFit:
        "Creative 主线是'宁静里的力量',跟揽胜的越野基因结合,但不放越野场景前置。视觉用低饱和度色彩 + 自然光,跟一线豪车的浮夸路线区隔。台词避免 power / luxury 这类已被用滥的词。",
    },
    resultLink: { label: "看完整复盘 →", href: "/proof-of-work/range-rover-flagship" },
  },
];

export const campaignPresets: CampaignPreset[] = raw.map((p) => CampaignPresetSchema.parse(p));
```

- [ ] **Step 2: Write failing tests in `src/lib/playground-presets.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { lookupPreset } from "./playground-presets";
import type { CampaignPreset } from "./schemas";

const presets: CampaignPreset[] = [
  {
    id: "nintendo-cny-2022",
    label: "Nintendo · 2022 春节",
    triggers: ["nintendo", "任天堂", "cny", "春节"],
    blocks: { problemFraming: "x", audience: "x", channelMix: "x", pacing: "x", creativeFit: "x" },
  },
  {
    id: "range-rover-flagship",
    label: "Range Rover",
    triggers: ["range rover", "路虎"],
    blocks: { problemFraming: "x", audience: "x", channelMix: "x", pacing: "x", creativeFit: "x" },
  },
];

describe("lookupPreset", () => {
  it("returns null for empty input", () => {
    expect(lookupPreset("", presets)).toBeNull();
    expect(lookupPreset("   ", presets)).toBeNull();
  });

  it("matches by preset id", () => {
    expect(lookupPreset("nintendo-cny-2022", presets)?.id).toBe("nintendo-cny-2022");
  });

  it("matches by trigger keyword case-insensitively", () => {
    expect(lookupPreset("NINTENDO", presets)?.id).toBe("nintendo-cny-2022");
    expect(lookupPreset("任天堂 春节", presets)?.id).toBe("nintendo-cny-2022");
    expect(lookupPreset("range rover 上市", presets)?.id).toBe("range-rover-flagship");
  });

  it("returns first match when multiple triggers hit", () => {
    expect(lookupPreset("nintendo and range rover", presets)?.id).toBe("nintendo-cny-2022");
  });

  it("returns null when no trigger matches", () => {
    expect(lookupPreset("starbucks holiday", presets)).toBeNull();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run src/lib/playground-presets.test.ts
```

Expected: FAIL with `Cannot find module './playground-presets'`.

- [ ] **Step 4: Implement `src/lib/playground-presets.ts`**

```ts
import type { CampaignPreset } from "./schemas";

/**
 * lookupPreset matches the user's input against preset ids and triggers
 * (case-insensitive substring). The first preset whose id or any trigger
 * appears in the input wins. Returns null for empty input or no match.
 */
export function lookupPreset(input: string, presets: CampaignPreset[]): CampaignPreset | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  for (const preset of presets) {
    if (q.includes(preset.id.toLowerCase())) return preset;
    for (const trigger of preset.triggers) {
      if (q.includes(trigger.toLowerCase())) return preset;
    }
  }
  return null;
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run src/lib/playground-presets.test.ts
```

Expected: all 5 cases PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/playground/campaign-teardown-presets.ts \
        src/lib/playground-presets.ts \
        src/lib/playground-presets.test.ts
git commit -m "feat(playground): add campaign teardown presets and lookup fn"
```

---

## Task 6: Build the Campaign Teardown client component

**Files:**
- Create: `src/components/playground/campaign-teardown.tsx`

- [ ] **Step 1: Create the directory if needed**

```bash
mkdir -p src/components/playground
```

- [ ] **Step 2: Create `src/components/playground/campaign-teardown.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { campaignPresets } from "@/data/playground/campaign-teardown-presets";
import { lookupPreset } from "@/lib/playground-presets";
import type { CampaignPreset, TeardownBlocks } from "@/lib/schemas";

// V2 placeholder: when a backend endpoint exists, POST { input } here for a
// dynamic teardown. W2 only uses the static preset path. Do NOT enable in V1.
// const CAMPAIGN_TEARDOWN_WEBHOOK_URL = "/api/playground/campaign-teardown";

const BLOCK_LABELS: Array<{ key: keyof TeardownBlocks; label: string; n: string }> = [
  { key: "problemFraming", label: "Problem framing", n: "01" },
  { key: "audience",       label: "Audience",        n: "02" },
  { key: "channelMix",     label: "Channel mix",     n: "03" },
  { key: "pacing",         label: "Pacing",          n: "04" },
  { key: "creativeFit",    label: "Creative fit",    n: "05" },
];

export function CampaignTeardown() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const matched: CampaignPreset | null = selectedId
    ? campaignPresets.find((p) => p.id === selectedId) ?? null
    : submitted
      ? lookupPreset(submitted, campaignPresets)
      : null;

  const noMatch = submitted !== null && submitted.trim() !== "" && !selectedId && matched === null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSelectedId(null);
    setSubmitted(query);
  }

  return (
    <div style={{ marginTop: "28px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入品牌/campaign 名(V1 支持 Nintendo CNY 和 Range Rover 旗舰)"
          aria-label="Campaign input"
          style={{
            flex: 1, background: "var(--paper-2)", color: "var(--ink)",
            border: "1px solid var(--line)", borderRadius: "6px",
            padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "13px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "var(--ink)", color: "var(--paper)", border: 0, borderRadius: "6px",
            padding: "0 18px", fontFamily: "var(--font-mono)", fontSize: "12px",
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Teardown
        </button>
      </form>

      <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <span className="eyebrow" style={{ alignSelf: "center" }}>Or pick a preset:</span>
        {campaignPresets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => { setSelectedId(p.id); setSubmitted(null); setQuery(""); }}
            style={{
              background: selectedId === p.id ? "var(--ink)" : "transparent",
              color: selectedId === p.id ? "var(--paper)" : "var(--ink)",
              border: "1px solid var(--line)", borderRadius: "20px",
              padding: "6px 14px", fontFamily: "var(--font-mono)", fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {noMatch ? (
        <div style={{ marginTop: "22px", padding: "16px 20px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "8px" }}>
          <p className="caption">
            V1 没匹配到这个 campaign 的预设拆解。点上面任意一个 preset chip 看一遍示范输出。
          </p>
        </div>
      ) : null}

      {matched ? (
        <div style={{ marginTop: "28px" }}>
          <p className="eyebrow" style={{ color: "var(--warm)" }}>Teardown · {matched.label}</p>
          <div style={{ display: "grid", gap: "16px", marginTop: "14px" }}>
            {BLOCK_LABELS.map((b) => (
              <article
                key={b.key}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  padding: "20px 22px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px" }}>
                  <span style={{ color: "var(--warm)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>{b.n}</span>
                  <span className="eyebrow">{b.label}</span>
                </div>
                <p className="body" style={{ whiteSpace: "pre-line" }}>{matched.blocks[b.key]}</p>
              </article>
            ))}
          </div>
          {matched.resultLink ? (
            <Link
              href={matched.resultLink.href}
              style={{
                display: "inline-block", marginTop: "20px",
                color: "var(--warm)", fontFamily: "var(--font-mono)", fontSize: "12px",
                border: "1px solid var(--warm)", padding: "8px 16px", borderRadius: "4px",
              }}
            >
              {matched.resultLink.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: 0 errors. The commented `CAMPAIGN_TEARDOWN_WEBHOOK_URL` is intentional documentation — should not trigger a lint failure since it's a comment.

- [ ] **Step 4: Commit**

```bash
git add src/components/playground/campaign-teardown.tsx
git commit -m "feat(playground): add CampaignTeardown client component"
```

---

## Task 7: Wire Campaign Teardown into the playground slug route

**Files:**
- Modify: `src/app/playground/[slug]/page.tsx`
- Modify: `src/data/playground/campaign-teardown.mdx` (trim to short intro)

- [ ] **Step 1: Trim `src/data/playground/campaign-teardown.mdx`**

Replace the entire file with:

```mdx
---
title: "Campaign Teardown"
slug: "campaign-teardown"
---

> 给我一个最近的品牌或 campaign,我把传播打法拆开:问题框定 / 受众 / 媒介组合 / 节奏 / 内容契合度。V1 支持两个预设 case,自定义 case 看 V2 上线。
```

(Keep this file because the slug page still loads it as the descriptive intro above the widget.)

- [ ] **Step 2: Update `src/app/playground/[slug]/page.tsx`**

Replace the entire file with:

```tsx
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { CampaignTeardown } from "@/components/playground/campaign-teardown";

const SLUGS = ["campaign-teardown", "audience-mapper"] as const;
type Slug = (typeof SLUGS)[number];

const TITLES: Record<Slug, string> = {
  "campaign-teardown": "Campaign Teardown",
  "audience-mapper": "Audience Mapper",
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function PlaygroundDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return notFound();
  const typedSlug = slug as Slug;
  const Body = (await import(`@/data/playground/${typedSlug}.mdx`)).default;

  return (
    <SiteShell current="playground">
      <article className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="04" label="Playground" trailing="Capability demo" />
        <h1 className="h-display-l">{TITLES[typedSlug]}</h1>
        <div className="measure" style={{ marginTop: "28px" }}>
          <Body />
        </div>
        {typedSlug === "campaign-teardown" ? <CampaignTeardown /> : null}
      </article>
    </SiteShell>
  );
}
```

- [ ] **Step 3: Smoke-test in dev**

```bash
npm run dev
```

Then in a browser:
1. Open `http://localhost:3000/playground/campaign-teardown`
2. Expect the trimmed MDX intro paragraph, then the input + 2 preset chips below
3. Click `Nintendo · 2022 春节` chip → expect 5 cards (Problem framing / Audience / Channel mix / Pacing / Creative fit) + "看完整复盘 →" link to `/proof-of-work/nintendo-cny-2022`
4. Type `任天堂` in the input → press Teardown → expect same Nintendo card set
5. Type `starbucks` → press Teardown → expect "V1 没匹配到这个 campaign 的预设拆解" notice
6. Click `Range Rover · 旗舰上市` chip → expect Range Rover preset block content
7. Open `http://localhost:3000/playground/audience-mapper` → expect MDX intact, no CampaignTeardown widget rendered

Stop the dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/app/playground/\[slug\]/page.tsx src/data/playground/campaign-teardown.mdx
git commit -m "feat(playground): wire CampaignTeardown into [slug] route"
```

---

## Task 8: W2 finalization — full test, lint, build, push, open PR

**Files:**
- No code edits unless failures surface

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: all tests pass. Should be the original 9 + at least:
- 5 new schema tests (Task 1)
- 6 new faq-router tests (Task 3)
- 5 new playground-presets tests (Task 5)

Total: ≥ 25 tests passing.

- [ ] **Step 2: Run lint over the full src**

```bash
npm run lint
```

Expected: 0 errors. If unused-import warnings appear in `live-agent.ts` for the deprecated `prompts`/`AgentPrompt` aliases, that is acceptable for W2 — flag as cleanup for W3 in the PR body.

- [ ] **Step 3: Run a production build**

```bash
npm run build
```

Expected: build succeeds, all 33+ pages still pre-render. The `/playground/campaign-teardown` page will become a client-rendered route (because `CampaignTeardown` uses `"use client"`); confirm Next.js still emits the page successfully. Watch for warnings about missing data — none expected.

- [ ] **Step 4: Push to origin**

```bash
git push origin worktree-redesign-2026-05
```

- [ ] **Step 5: Open a PR against `main`**

```bash
gh pr create --base main --head worktree-redesign-2026-05 \
  --title "feat(W2): Campaign Teardown v1 + Live Agent FAQ v1" \
  --body "$(cat <<'EOF'
## Summary
- Campaign Teardown becomes interactive on `/playground/campaign-teardown`: text input + 2 preset chips (Nintendo CNY 2022, Range Rover Flagship) → 5 structured output cards (Problem framing / Audience / Channel mix / Pacing / Creative fit) + result link to the matching proof-of-work case
- Live Agent FAQ grows from 6 click-to-expand prompts to 10, migrated to a typed `FAQEntry` shape with `triggers` + `followUp` links; `/live-agent` page gains a keyword input wired to `matchFAQ` + a "Static knowledge router · LLM integration pending" disclaimer
- Two new pure helpers with unit tests: `src/lib/faq-router.ts` (`matchFAQ`) and `src/lib/playground-presets.ts` (`lookupPreset`)
- Webhook constant reserved as a comment for V2 backend integration; no real API calls in W2

## Scope (per spec §3 W2)
- ✅ 5-block structured output for Campaign Teardown
- ✅ Nintendo CNY 2022 demo case with result link to `/proof-of-work/nintendo-cny-2022`
- ✅ ≥ 10 core FAQ entries with static routing
- ✅ Risk-switch fallback: when user input does not match any preset, the UI shows "V1 没匹配到这个 campaign 的预设拆解" + preset chips remain visible

## Test plan
- [x] `npm test` — all unit tests pass (≥ 25 total, ≥ 16 new)
- [x] `npm run lint` — 0 errors
- [x] `npm run build` — production build succeeds
- [x] Manual: `/playground/campaign-teardown` preset chip + typed-input paths return correct block content
- [x] Manual: `/live-agent` keyword input returns routed answer + follow-up links for `CV`, `日本`, `brief`
- [x] Manual: `/live-agent` returns "no match" notice for unknown input
- [x] Manual: homepage Live Agent block still shows 4 questions

## Out of scope (deferred per spec)
- LLM-backed teardown (V2)
- Custom campaign input that hits a webhook (V2)
- English-localized FAQ answers (W5)
- Cleanup of the deprecated `prompts` / `AgentPrompt` alias in `src/data/live-agent.ts` (W3)
EOF
)"
```

- [ ] **Step 6: Verify Vercel preview deploy**

After `gh pr create`, watch for the Vercel bot comment that posts the preview URL. Open it and repeat the manual smoke tests from Tasks 4 and 7. If preview deploy fails, fix locally and re-push to the same branch.

- [ ] **Step 7: Final session save**

```bash
# From the worktree
echo "W2 complete — PR opened, preview deploy verified" >> docs/superpowers/plans/2026-05-12-w2-teardown-and-agent.md
```

Then create or update `~/.claude/session-data/<date>-w2-complete-session.tmp` summarizing:
- Tasks completed: 1-8
- New files: `src/components/playground/campaign-teardown.tsx`, `src/data/playground/campaign-teardown-presets.ts`, `src/lib/faq-router.ts`, `src/lib/playground-presets.ts`, and their test files
- PR URL (from `gh pr view --json url`)
- Next step: W3 — Range Rover deep-dive case (2000 字 中 + 英)

---

## Validation Summary

After all 8 tasks, the following should be true (matches spec §3 W2 row):

1. `https://<vercel-preview>.vercel.app/playground/campaign-teardown` — input field + 2 preset chips + 5 structured output cards
2. Nintendo CNY 2022 preset returns 5 fully-written blocks + a working link to `/proof-of-work/nintendo-cny-2022`
3. `https://<vercel-preview>.vercel.app/live-agent` — keyword input matches `brief`, `CV`, `日本`, `媒介` and returns the right FAQ entry + follow-up links
4. Live Agent FAQ contains ≥ 10 entries
5. Homepage Live Agent block still shows 4 preset questions, no regression
6. No "AI generated" wording anywhere in new content; no `不是……而是` pattern in new prose
7. `npm test && npm run lint && npm run build` all green
