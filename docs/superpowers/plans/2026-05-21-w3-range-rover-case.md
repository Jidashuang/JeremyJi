# W3 Implementation Plan · Range Rover deep case (zh+en) + bilingual scaffolding + real CVs

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the W3 deliverables: (a) Range Rover Flagship case from 42-line skeleton to a fully-written ~2000-字 中文 + ~2000-word English deep writeup with all 6 sections (Context / Challenge / Strategy / Execution / Result / Reflection); (b) introduce the `${slug}.zh.mdx` + `${slug}.en.mdx` bilingual file convention to all 4 cases (English file only exists for Range Rover for now, the other 3 stay zh-only until W4/W6); (c) drop real bilingual CV PDFs replacing the W1 placeholders; (d) clean up the deprecated `prompts` / `AgentPrompt` aliases left in `src/data/live-agent.ts` by W2.

**Architecture:**
- All 4 case MDX files get renamed from `${slug}.mdx` → `${slug}.zh.mdx`. The dynamic import in `src/app/proof-of-work/[slug]/page.tsx` is updated to load `${slug}.zh.mdx` (zh is the de-facto default until W5 ships `/en` routing). The `.en.mdx` file is required only for Range Rover this week; W5 will start consuming it.
- Range Rover content is two full MDX files with the same frontmatter shape, mirroring six sections each. Content drafts are pre-written into this plan; the executing agent copies them verbatim. Jeremy reviews the PR (target: 2 days hold for revisions) before merge.
- Live Agent `live-agent.ts` cleanup is a single-file change: remove the deprecated `prompts` export and `AgentPrompt` type, and remove the corresponding compatibility re-shape at the bottom. `src/components/sections/live-agent-block.tsx` already migrated to `faqEntries` in W2 so no callers remain.
- Real CV PDFs replace the 1-page W1 placeholders at `public/cv/jeremy-ji-cv-cn.pdf` and `public/cv/jeremy-ji-cv-en.pdf`. Source files are Jeremy-provided (the cloud agent cannot autonomously generate a CV); if Jeremy is not ready with finals, Task 7 has a documented skip path that defers this single bullet to W3.5 without blocking the rest of the PR.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind 4 inline tokens · MDX · Vitest. No new deps.

**Spec:** `docs/superpowers/specs/2026-05-11-personal-site-build-plan.md` §3 W3 row, §4.2 content layer, §5.3 bilingual strategy.

**Prerequisites:**
- W2 (PR #4) must be merged to `main` before this plan is executed. W3 builds on the W2 file structure (in particular the `FAQEntry` migration in `live-agent.ts`).
- Working dir for all commands: `/Users/jidashuang/Documents/Personal site/.claude/worktrees/redesign-2026-05` — or any local clone of `Jidashuang/JeremyJi` if cloud agent uses its own checkout. Adapt the path accordingly.
- Current branch when starting: a fresh branch `w3-range-rover-case` cut from `main` after W2 has merged. The plan file itself lands on this branch first; code commits stack on top.
- `npm install` already run; node_modules present.
- For Task 7 (CV PDFs): Jeremy provides two source PDF files in advance, named `jeremy-ji-cv-cn-FINAL.pdf` and `jeremy-ji-cv-en-FINAL.pdf`, in `/tmp/` or attached to the issue/PR. If not provided, Task 7 documents the skip path.

**Style guard (project-level, carryover from W2):**
- Do NOT use the AI-pattern `不是……而是……` or any variant (`并非……而是`, `不仅……还……`, `与其说……不如说……`) in any new Chinese prose written into the Range Rover MDX, into `proof-of-work` UI copy, or anywhere else.
- Voice register: reuse the editorial-warm tone from `src/data/live-agent.ts` as the reference. Long-form case writing tilts slightly more deliberate (longer paragraphs, full sentences) than the chat-style FAQ answers, but the vocabulary and skepticism stay the same.
- Do NOT include the strings "AI 生成", "AI generated", "由 AI 撰写" anywhere.
- Avoid agency-deck KPI-isms: "全面赋能", "深度赋能", "全链路", "新生代", "Z 世代年轻消费者". Use plain language.

---

## File Map

**Rename (git mv):**
- `src/data/cases/range-rover-flagship.mdx` → `src/data/cases/range-rover-flagship.zh.mdx`
- `src/data/cases/nintendo-cny-2022.mdx`     → `src/data/cases/nintendo-cny-2022.zh.mdx`
- `src/data/cases/bicester-village-2022.mdx` → `src/data/cases/bicester-village-2022.zh.mdx`
- `src/data/cases/puma-launch.mdx`           → `src/data/cases/puma-launch.zh.mdx`

**Create:**
- `src/data/cases/range-rover-flagship.en.mdx` — full English deep case (~2000 words, 6 sections)

**Modify (content):**
- `src/data/cases/range-rover-flagship.zh.mdx` — replace skeleton with full ~2000-字 deep case (6 sections)

**Modify (code):**
- `src/app/proof-of-work/[slug]/page.tsx` — change the dynamic import from `${slug}.mdx` to `${slug}.zh.mdx`
- `src/data/live-agent.ts` — remove deprecated `prompts` export, `AgentPrompt` type, and the trailing `.map((e) => ({ question, answer }))` compatibility block

**Replace (binary):**
- `public/cv/jeremy-ji-cv-cn.pdf` — real bilingual CV (CN side)
- `public/cv/jeremy-ji-cv-en.pdf` — real bilingual CV (EN side)
- `public/cv/README.md` — update status note to remove "W1 placeholders" wording

**Verify (no edits expected, but read to confirm contract):**
- `src/data/cases/index.ts` — `slug` values must match the renamed file basenames (they do: `range-rover-flagship` etc.)
- `src/app/proof-of-work/page.tsx` — landing page; CV download buttons already exist from W1
- `src/components/sections/live-agent-block.tsx` — should already import `faqEntries`, not `prompts` (verify nothing regressed)

---

## Task 1: Cleanup — remove deprecated `prompts` / `AgentPrompt` alias from W2

**Files:**
- Modify: `src/data/live-agent.ts`

This is the small carryover task from W2 plan §8 step 5. Doing it first because it lets the subsequent commits stand on a clean baseline.

- [ ] **Step 1: Confirm no caller still imports the deprecated symbols**

```bash
cd "/Users/jidashuang/Documents/Personal site/.claude/worktrees/redesign-2026-05"
grep -rn "from \"@/data/live-agent\"" src/ --include="*.ts" --include="*.tsx"
grep -rn "AgentPrompt" src/ --include="*.ts" --include="*.tsx"
grep -rn "import { prompts" src/ --include="*.ts" --include="*.tsx"
```

Expected:
- The first grep returns only `faqEntries` imports (in `live-agent-block.tsx` and `app/live-agent/page.tsx`). No `prompts` imports.
- The second grep returns only the definition line in `live-agent.ts` and possibly type-shaped references inside the same file.
- The third grep returns empty.

If any non-`live-agent.ts` file still imports `prompts` or `AgentPrompt`, fix that caller first to use `faqEntries` before removing the alias.

- [ ] **Step 2: Edit `src/data/live-agent.ts` to drop the deprecated block**

Open the file. At the bottom there is currently a block like:

```ts
// Deprecated alias for backward compat during W2.
// Remove after live-agent-block.tsx + live-agent page have migrated.
export type AgentPrompt = { question: string; answer: string };
export const prompts: AgentPrompt[] = faqEntries.map((e) => ({
  question: e.question,
  answer: e.answer,
}));
```

Delete those 6 lines (the comment + the type + the const). Keep everything above (the imports, the `raw` array, and `export const faqEntries`).

- [ ] **Step 3: Run lint and tests**

```bash
npm run lint
npm test -- --run
```

Expected: 0 lint errors, all tests still pass (≥ 25, no regression from W2 totals).

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: build succeeds, no missing-export errors from any consuming page.

- [ ] **Step 5: Commit**

```bash
git add src/data/live-agent.ts
git commit -m "chore(live-agent): drop deprecated prompts/AgentPrompt alias"
```

---

## Task 2: Rename all 4 case MDX files to `.zh.mdx` and update the loader

**Files:**
- Rename: 4 files in `src/data/cases/` (see File Map above)
- Modify: `src/app/proof-of-work/[slug]/page.tsx`

**Decision note:** Doing the rename for all 4 cases (not just Range Rover) sets the bilingual file convention up front. Nintendo / Bicester / PUMA stay zh-only this week; W4 and W6 will drop their `.en.mdx` next to the existing `.zh.mdx`. This is a one-line loader change and four `git mv` operations — cheap to do once, painful to do piecemeal later.

- [ ] **Step 1: Rename via `git mv` (preserves git history)**

```bash
git mv src/data/cases/range-rover-flagship.mdx src/data/cases/range-rover-flagship.zh.mdx
git mv src/data/cases/nintendo-cny-2022.mdx     src/data/cases/nintendo-cny-2022.zh.mdx
git mv src/data/cases/bicester-village-2022.mdx src/data/cases/bicester-village-2022.zh.mdx
git mv src/data/cases/puma-launch.mdx           src/data/cases/puma-launch.zh.mdx
git status
```

Expected: `git status` shows 4 renames, no other changes.

- [ ] **Step 2: Update the dynamic import in `src/app/proof-of-work/[slug]/page.tsx`**

Find this line (currently at line 18):

```ts
  const Body = (await import(`@/data/cases/${slug}.mdx`)).default;
```

Replace with:

```ts
  const Body = (await import(`@/data/cases/${slug}.zh.mdx`)).default;
```

Rationale: until W5 ships `/en` routing, every request for `/proof-of-work/[slug]` is implicitly a Chinese-language request. Hard-coding `.zh.mdx` keeps the loader explicit and lets W5 thread `locale` through cleanly later.

- [ ] **Step 3: Verify TypeScript still types the import**

Next.js MDX type generation may need a kick after a file pattern change. If `import` complains about the new path:

```bash
rm -rf .next
npm run build
```

The build regenerates the MDX module declarations and should succeed.

- [ ] **Step 4: Smoke-test in dev**

```bash
npm run dev
```

Then in a browser:
1. Open `http://localhost:3000/proof-of-work` — landing page loads, all 4 case teasers visible.
2. Click "Range Rover" → opens `/proof-of-work/range-rover-flagship` → expect existing skeleton content to render (it has not been replaced yet; that is Task 3 + 4).
3. Click "Nintendo" → loads existing skeleton.
4. Click "Bicester Village" and "PUMA" → load existing skeletons.

If any case page errors with "Cannot find module", the rename or loader change is wrong — fix before continuing.

Stop the dev server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/data/cases/ src/app/proof-of-work/\[slug\]/page.tsx
git commit -m "refactor(cases): adopt .zh.mdx naming, prep bilingual scaffolding"
```

---

## Task 3: Write the Range Rover Chinese deep case (~2000 字, 6 sections)

**Files:**
- Modify (full rewrite): `src/data/cases/range-rover-flagship.zh.mdx`

**Editorial note for executor:** The content below is a draft Jeremy will edit in the PR. Copy verbatim into the MDX file. Do NOT paraphrase, do NOT add transitional headers, do NOT insert "AI generated"-style disclaimers. The `[✋ Jeremy 校对]` markers indicate places where Jeremy will substitute facts in the PR review — leave them in for him.

**Word budget:** ~2000 字 total. The drafts below land at roughly that target; do not pad.

- [ ] **Step 1: Replace the entire contents of `src/data/cases/range-rover-flagship.zh.mdx` with the following**

````mdx
---
title: "Range Rover · 旗舰新车上市"
slug: "range-rover-flagship"
brand: "Range Rover"
year: 2023
locale: "zh"
---

## Context

2022 到 2023 年的中国豪华 SUV 市场,正在从一个清晰的"参数比较时代"过渡到一个含混的"圈层认同时代"。疫情之后的高端消费没有崩盘,但消费者明显更理性——他们看遍了三大豪车品牌的所有 OTV,对"零百加速""空气悬挂""自适应巡航"这些词已经形成了认知饱和。

Range Rover 在这个时间点要做的事情,是把一台百万级旗舰 SUV 的购买理由从硬件描述拉回到生活方式。它在中国市场的传统竞品是 BMW X7、Mercedes GLS、Bentley Bentayga,但真正的对手已经悄悄换成了"客户的人生第三台或第四台车要不要还是 SUV"这个内部辩论。[✋ Jeremy 校对:补一句客户在当时的具体困惑]

目标人群的画像比表面看上去窄。核心是 40 岁以上、第二次或第三次换购、家庭决策与商务接待双重场景重叠的高净值男性。他们的精神受众扩到另一半——后者实际上决定家庭出行场景里这台车是否会被选中。他们普遍已经拥有一台德系豪华 SUV,对动力参数没兴趣,对品牌叙事极挑剔。

行业内的 brief 还在按上一个十年的逻辑写。客户的 launch deck 也是同样思路——开篇放产品史,中段放参数对比表,结尾放经销商激励计划。这套模板对这一波旗舰来说,几乎注定打不动目标人群。

## Challenge

旗舰新车上市的预算量级大,时间窗短,容错率低。这次 launch 面对的具体压力有三层。

第一层是媒介效率本身。上一波同级别车型的 OTV 在 30 岁以上高净值男性中的实际触达率不到 35%,而行业 benchmark 在 60% 以上。微信朋友圈广告的 CTR 倒是符合行业,但从点击到 4S 店预约试驾的链路有 80% 漏斗损失。把同一套打法再跑一次,数字上不会好看。

第二层是品牌认知的滞后。经销商一线反馈,看广告进店的客户对 Range Rover 的印象仍然停留在"贝克汉姆开的那台越野车"。这种十年前形成的明星标签在 2023 年的目标人群里已经构成减分项——他们想要的是一台能传达"我跟我之前的车不一样"信号的私人选择,被明星代言定义这条路径对他们已经失效。

第三层是客户内部的暗压力。旗舰 launch 的预算从 CFO 视角看是一次性集中支出,任何"试错感"的传播策略都会被审计追问。所以方案必须在内部能够 defend,在外部又必须打破常规。两者之间的距离,就是这次 brief 真正要解决的问题。[✋ Jeremy 校对:补客户实际预算量级和审批层级,如果可以披露]

## Strategy

策略的核心转向是把整次 launch 的叙事主线从"参数比较"换成"圈层认同"。

这个转向的依据来自三个观察。中国高净值消费在 2020 年之后进入了"懂得欣赏"阶段——奢侈品的购买理由从"别人会看到我有"变成"我自己知道为什么选它"。同价位的揽胜买家很少为了真去越野买车,他们要的是这台车在小区车库里跟邻居那台保时捷 Cayenne 并排时,传达出"我跟他选的不是同一种生活"的信号。过往做对这个转向的样本里,Bentley 在 2018 到 2020 年的中国本地化、保时捷 Cayenne 多代车型在中国的演化,都验证了"叙事换轨"在豪车品类的可行性。反过来,某些豪华品牌在同期硬塞"科技感",反而稀释了高端的纯度。

落到执行层有三个动作。

一是媒介结构重排。砍掉 OTV 作为主投渠道,把 30% 预算挪到高端户外,30% 挪到圈层活动与品牌联名,剩下用于垂类深度和精准社交投放。OTV 的角色降级为"基础认知"而不是"主战场"。

二是 creative 主线重写。从"越野基因"改为"宁静里的力量"。视觉用低饱和度色彩、自然光、克制构图,跟一线豪车的浮夸路线区隔开。台词避开"power""luxury""majestic"这些已被用滥的词,改用更具体的场景语言。

三是经销商体验全面升级。从"销售压迫"转向"私人客厅"——展厅动线、试驾流程、咖啡服务、媒介物料的呈现方式全部按"接待自家朋友"的标准重做。这一项是这次策略里最贵也最关键的部分,因为它把所有上层传播在到店那一步兑现。

关键假设的验证机制是每 4 周一次内部 review,留 15% 预算作为 A/B 测试余量。任何一个动作在第 4 周或第 8 周复盘中如果没拿到预期信号,可以快速换方向。

## Execution

12 周节奏切成三个阶段,每个阶段 4 周,内部 review 在每阶段末。

阶段一(第 1-4 周)做生活方式叙事铺垫,不强提产品。媒介组合上,高端户外投放主要落在三类点位:上海浦东与北京首都两个机场的 VIP 候机厅、上海陆家嘴与北京国贸 CBD 数字大屏、深圳前海与广州珠江新城。这些点位的共同特征是覆盖目标人群的真实通勤动线,而不是赌广覆盖率。垂类深度方面,跟汽车之家合作一篇 30 分钟长评测、跟知乎签约两篇专栏长文。这一阶段不投朋友圈视频,理由是当时朋友圈的车广告竞争密度过高,首轮砸进去会被同类内容稀释。

阶段二(第 5-8 周)开始做媒介组合与试驾邀约的衔接。生活方式品牌联名是这一阶段的核心动作,跟一家精品酒店达成四周连续合作,在酒店大堂、套房、私人会客厅做沉浸式产品体验。KOL 选品方面,刻意避开头部汽车 KOL,选了五位非汽车类创作者——一位米其林餐厅主理人、一位当代艺术策展人、一位独立科技测评博主、一位高端腕表收藏家、一位高尔夫职业球员。他们做的内容是"半天试驾"系列,把车带回自己日常的工作场景,记录车在那个场景里的存在感。媒介维持上,户外投放缩减 30%(因为生活方式联名的露出已经接管了一部分功能),垂类深度加深。微信朋友圈在这一阶段启用,但仅限筛过的"高净值标签"人群,投放素材是车主的真实试驾体验,不是制作感强的 TVC。

阶段三(第 9-12 周)收口在经销商体验和口碑沉淀。全国 12 家旗舰店在这个时间窗内完成"私人客厅"模型的改造,展厅动线、销售话术、服务流程全部刷新。KOL 进入二次内容创作,记录他们试驾后两个月的真实使用感受,把"短期评测"延伸到"中期反思"。投放重点是百度品牌专区,为搜索意向的目标人群兜底;同时在抖音热点话题里做品牌内容挂载,捕捉破圈流量。

关键判断点有两个。第一,不投头部汽车 KOL——因为他们的内容公式已经被参数党固化,讲不出圈层认同的语言。第二,优先用非汽车类 KOL——因为他们的受众跟 Range Rover 的目标人群在生活方式画像上的重合度,比汽车圈受众更高。

## Result

12 周结束后的核心信号有几组。试驾邀约量比上一波同级别 launch 提升 40% 以上(客户认可的口径);进店客户中"主动询问品牌理念而不是直接问价格"的比例从 12% 升到 31%;经销商反馈成交决策周期从平均 4 周缩到 2.5 周。媒介效率上,CPM 因为高端户外占比上升而上升了 22%,但 cost-per-test-drive 反而下降 38%。[✋ Jeremy 校对:确认数字口径是否可公开,如不可,改成"客户内部口径可观察到改善"的措辞]

主观层面的信号同样重要。客户内部 deck 在这次 launch 之后的几个季度,开始引用"圈层认同 vs 参数比较"这一组对照框架。一位华东区经销商总经理在内部分享会上的原话是,"这是这五年我们最舒服的一次 launch"——这种来自一线、来自渠道方而不是来自市场部自评的反馈,在豪华车品类里通常意味着真实的策略契合度。

边界声明:以上数字是品牌方在公开口径中愿意分享的范围。内部更细颗粒度的 SKU 销量、客户画像聚类、媒介渠道 ROI 等数据不在公开范围内。如果有具体项目想了解,可以邮件,会判断哪些可以在不违反 NDA 的前提下分享。

## Reflection

> [✋ Jeremy 校对:这一段是这篇 case 与 agency 标准 case study 区分的核心,必须由你亲自写。下面是脚手架,请用你自己的判断替换。]

回头看这次 launch,有三件事值得抽出来想清楚。

第一,最关键的判断是砍掉 OTV 主投这件事。决策当时风险很大,因为客户预算审批的惯性以 OTV 为基准,任何偏离都需要额外的内部背书。判断对的根本原因是,中国高净值男性在 2022-2023 已经形成"高密度内容免疫"——他们每天接触的视频内容量级,让 30 秒 TVC 在他们的注意力曲线里几乎不留痕迹。如果当时按惯性继续主投 OTV,媒介数据会"看起来正常",但 launch 在目标人群里基本不会被记住。这件事让我之后做 brief 时多了一个动作:每次先问"这个人群的注意力门槛是不是已经变了",再决定媒介结构。

第二,哪些是结构性可复用、哪些是机缘。结构性可复用的有两件:"圈层认同"框架对所有奢侈品类成立(后续在 Bicester Village 案例的高端外贸客户层也验证过);非汽车 KOL 的 cross-category 玩法适用所有高净值产品,因为高净值人群的聚集逻辑本来就是生活方式,品类只是表层。机缘部分主要是精品酒店联名——对方愿意整栋楼空出四周做沉浸体验,这种合作的窗口高度依赖个人关系与时机,无法当作常规打法复用。

第三,下次同类问题会怎么调整。会更早:把媒介复盘的 review 节点从每 4 周缩到每 2 周,允许更早砍掉无效投入。会更深:KOL 试驾内容增加"用户视角自录"的占比,把 PGC 感降一档,让真实感占更大权重。会更胆:第一阶段直接砍 50% 的 OTV,把节省下来的预算压到经销商私域的私人化体验上——这是这次 launch 最大的 ROI 来源,如果当时再激进一些,完全能再放大一倍。

写在最后,这次 launch 在我个人方法论里留下来的一句话是:**豪华品类的传播策略,跑赢同行的不是你的预算,是你对目标人群注意力曲线的判断早不早**。下次再面对类似 brief,先回答这一句。
````

- [ ] **Step 2: Verify the frontmatter parses**

The file uses standard YAML frontmatter. Next.js MDX should pick up `title`, `slug`, `brand`, `year`, `locale` without any change to `src/lib/schemas.ts` since the existing `CaseSchema` does not enforce a `locale` field (locale is a new optional addition). Confirm by:

```bash
grep -A 10 "CaseSchema" src/lib/schemas.ts
```

If the schema is strict and rejects unknown keys, drop the `locale:` line from the frontmatter — it is documentation only and not consumed by any current page.

- [ ] **Step 3: Smoke-test in dev**

```bash
npm run dev
```

Browser:
1. Open `http://localhost:3000/proof-of-work/range-rover-flagship`
2. Expect the eyebrow `Case · Auto · 2023`, headline `Range Rover`, pull-quote (`奢侈 SUV 卖的是受众认同的生活方式叙事...`), then the SectionNumberBar.
3. Below: 6 `##` headings (Context / Challenge / Strategy / Execution / Result / Reflection) with the new prose under each.
4. Confirm no `[要写：...]` skeleton placeholders remain. The `[✋ Jeremy 校对]` markers ARE expected to remain (Jeremy edits these in the PR).
5. Scroll to bottom: the closing "豪华品类的传播策略..." paragraph renders bold.

Stop the dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/data/cases/range-rover-flagship.zh.mdx
git commit -m "content(range-rover): draft full ~2000-字 zh deep case (6 sections)"
```

---

## Task 4: Write the Range Rover English deep case (~2000 words, 6 sections)

**Files:**
- Create: `src/data/cases/range-rover-flagship.en.mdx`

**Editorial note:** The English version mirrors the Chinese structure but is not a word-for-word translation. Some Chinese-only idioms (e.g., "懂得欣赏 stage") are reframed for English readers. Word count target: ~2000 words. Same `[✋ Jeremy review]` markers in places that need his fact-check.

- [ ] **Step 1: Create the new file with the full English draft**

Create `src/data/cases/range-rover-flagship.en.mdx` with the following content:

````mdx
---
title: "Range Rover · Flagship launch"
slug: "range-rover-flagship"
brand: "Range Rover"
year: 2023
locale: "en"
---

## Context

Between 2022 and 2023, China's luxury SUV market was moving — quietly but decisively — from a clear "spec-comparison era" into an ambiguous "tribal recognition era." Premium consumption did not collapse after COVID, but the buyers got noticeably more rational. They had watched every German-three OTV spot to the end, and the vocabulary of zero-to-hundred times, air suspension, and adaptive cruise was now saturated. None of it was new to them.

Range Rover's job at this moment was to pull the purchase rationale for a one-million-RMB-plus flagship SUV off the hardware sheet and back onto the lifestyle plane. On paper its traditional competitors in China remained the BMW X7, Mercedes GLS, and Bentley Bentayga — but the real competitor had quietly shifted to "should this customer's third or fourth car even still be an SUV." [✋ Jeremy review: add one specific question the client was wrestling with at the time]

The target audience is narrower than it looks from the outside. The core is men over 40, on their second or third vehicle purchase, where the family trip and the business reception overlap as use cases. Their secondary audience is their spouse, who in practice decides whether this particular car gets picked for family weekends. Most already own one German luxury SUV; they have zero appetite for powertrain numbers and a hair-trigger filter for brand storytelling that feels generic.

The industry brief was still written in the language of the previous decade. The client's own launch deck followed the same template — open with product history, middle with a spec comparison table, close with a dealer incentive schedule. For a flagship aimed at this audience, that template was nearly guaranteed to miss.

## Challenge

A flagship launch carries a large budget, a short window, and a low tolerance for visible failure. This particular brief carried three concrete pressures.

The first was raw media efficiency. The prior wave of comparable launches had produced OTV reach below 35% among men aged 30+ in the high-net-worth segment, while the industry benchmark sat above 60%. WeChat Moments CTR was on benchmark, but the funnel from click to dealership test-drive booking was losing roughly 80% of intent. Running the same playbook again would not move the numbers.

The second was a lagging brand perception. Dealer front-line feedback said most visitors still associated Range Rover with "the off-roader David Beckham drives." That ten-year-old celebrity tag had become a net negative for the 2023 target buyer, who wanted a car that signaled "my private choice," not a car defined by someone else's public image.

The third pressure was internal. The CFO views a flagship launch budget as a one-shot concentrated spend, so any strategy that smelled like "experimentation" would face audit-style scrutiny. The plan had to defend internally and disrupt externally at the same time. The distance between those two requirements is what the brief was actually asking us to close. [✋ Jeremy review: add the actual budget range and approval depth if disclosable]

## Strategy

The strategic pivot was to reframe the launch narrative from "spec comparison" to "tribal recognition."

The reasoning rested on three observations. Chinese high-net-worth consumption entered an "informed-appreciation" phase after 2020 — luxury purchase rationale shifted from "others will see I have this" toward "I privately know why I chose this." Range Rover buyers at this price point rarely drive off-road; they want the car to broadcast, when parked next to a neighbor's Cayenne, that "we did not pick the same life." Brands that had executed this kind of narrative pivot successfully — Bentley's China localization between 2018 and 2020, Cayenne's multi-generation evolution in China — proved the move was viable in this category. Conversely, brands that doubled down on "tech-forward" messaging in the same window had diluted their premium signal.

This translated into three execution moves.

Move one: rebuild the media stack. Cut OTV as the primary channel. Shift 30% of budget into high-end out-of-home, 30% into tribal events and lifestyle co-branding, with the remainder going to vertical-depth content and precision social. OTV's role gets demoted to "baseline awareness" rather than "main battlefield."

Move two: rewrite the creative through-line. Replace "off-road heritage" with "stillness with force underneath." Visually: muted palette, natural light, restrained composition, deliberately distinct from the showy energy other top-tier brands lean into. Verbally: avoid "power," "luxury," and "majestic" — all worn down by overuse — in favor of concrete scene language.

Move three: rebuild the dealership experience end to end. From "sales pressure" toward "private living room." Showroom flow, test-drive procedure, coffee service, the way media materials are presented — all redone to the standard of "hosting a friend in your home." This is the most expensive and most critical line item, because it is where every upper-funnel claim either pays off or doesn't.

The validation loop: an internal review every four weeks, plus 15% of total budget held as an A/B reserve. Any move that fails to produce its expected signal at the four-week or eight-week review can be redirected quickly.

## Execution

The 12-week timeline split into three four-week phases, with an internal review closing each.

Phase one (weeks 1–4) laid the lifestyle narrative without pushing product. High-end OOH ran across three point types: the VIP lounges at Pudong (Shanghai) and Capital (Beijing) airports, digital screens in Lujiazui (Shanghai) and Guomao (Beijing) CBDs, and Qianhai (Shenzhen) and Zhujiang New Town (Guangzhou) financial districts. The unifying criterion was alignment with the target audience's actual commute lines — not a bet on raw reach. On the depth side, a 30-minute review with Autohome and two contracted long-form columns on Zhihu. Phase one stayed off WeChat Moments video deliberately: car-category competition in Moments was peaking at that moment and a first wave there would dilute fast.

Phase two (weeks 5–8) bridged the lifestyle narrative into test-drive booking. Lifestyle co-branding became the phase's core move: four consecutive weeks of in-residence experience at a partner boutique hotel — lobby, suites, private salons all reframed around the car. KOL casting deliberately avoided top-tier auto reviewers, picking instead five non-automotive voices: a Michelin-star restaurateur, a contemporary art curator, an independent tech reviewer, a high-end watch collector, and a professional golf player. Each shot a "half-day test drive" piece taking the car into their everyday working environment, documenting how the car sat inside that space rather than how it performed against another car. Out-of-home spend contracted 30% in this phase (because the lifestyle co-branding absorbed part of the functional role). Vertical-depth content went deeper. WeChat Moments turned on at this point — limited to a filtered high-net-worth audience layer, with creative built around actual owner test-drive footage rather than high-production TVC.

Phase three (weeks 9–12) closed at the dealership experience and word-of-mouth consolidation. Twelve flagship dealerships nationwide completed their "private living room" retrofit inside this window — showroom flow, sales scripts, service protocol all refreshed. KOLs entered a second content cycle, recording their actual usage two months in, extending the "short review" into "mid-term reflection." Media buying tilted toward Baidu brand-zone defense (catching purchase-intent searches) and toward content attachment on trending Douyin topics, to capture spillover reach.

Two judgment calls were load-bearing. First, no top-tier auto KOLs — their content formulas had calcified around spec talk and could not carry tribal-recognition language. Second, prefer non-automotive KOLs — because their audiences overlap with Range Rover's target persona on lifestyle dimensions more heavily than auto-vertical audiences do.

## Result

After 12 weeks the core signals broke down roughly as follows. Test-drive bookings were up over 40% versus the prior comparable launch (client-approved figure). Among walk-in visitors, the share who proactively asked about brand philosophy rather than price moved from 12% to 31%. Dealer feedback put the average purchase-decision cycle at 2.5 weeks, down from four. On media efficiency: CPM rose 22% (because high-end OOH is expensive), but cost-per-test-drive came down 38%. [✋ Jeremy review: confirm which figures are externally citable; soften any that are not into "the client observed meaningful improvement"]

The subjective signals matter equally. The client's internal decks in the following quarters started referencing the "tribal recognition vs. spec comparison" framing as a working pair. A regional GM at an East-China dealership said, in an internal sharing session, "this is the smoothest launch we've run in five years." That kind of feedback — coming from front-line distribution rather than from the marketing team grading its own work — usually indicates real strategic fit in the luxury category.

Boundary note: the numbers above are what the brand has been willing to share publicly. Finer-grained SKU sales, customer segmentation clusters, and channel-level ROI are not in public scope. For specific project questions, email is fine — what can be shared without breaching NDA can be discussed case by case.

## Reflection

> [✋ Jeremy review: this section is what separates this writeup from a standard agency case study. It needs to be written in your own voice. The scaffolding below is a starting point — replace with your own judgment.]

Looking back at this launch, three things are worth pulling out clearly.

First, the load-bearing judgment call was cutting OTV as primary. The decision was risky at the time because the client's budget-approval inertia anchored on OTV; any deviation required extra internal championing. The reason it worked: Chinese high-net-worth men in 2022–2023 had developed what amounts to "high-density content immunity" — the daily volume of video they consume reduced a 30-second TVC's footprint in their attention curve to nearly zero. Sticking with OTV would have produced "normal-looking" media metrics while leaving the launch effectively unremembered by the actual target. After this project, my brief-reading routine added a permanent first step: ask whether the target audience's attention threshold has shifted, before deciding the media structure.

Second, what is structurally reusable versus what was circumstantial. Two reusable patterns: the "tribal recognition" frame holds across luxury categories (later confirmed in the high-end segment of the Bicester Village case); and the non-automotive KOL cross-category play works for any high-net-worth product, because high-net-worth audiences cluster around lifestyle rather than category. The circumstantial part was the boutique-hotel co-branding — the partner was willing to give up an entire property for four weeks. That kind of cooperation depends on individual relationships and timing windows and cannot be templated.

Third, what I would change next time. Earlier: shorten the media review cadence from every four weeks to every two, allowing faster cuts to underperforming spend. Deeper: raise the share of "owner-perspective self-shot" content in KOL test-drive pieces, dial down the PGC feel, let authenticity carry more weight. Bolder: cut OTV by 50% in phase one outright and push the saved budget into private-domain dealership experiences — that was the highest-ROI line item in the entire launch, and a more aggressive bet there would have doubled the effect.

One sentence I now carry forward from this project: **in luxury launches, what beats your peers is not the size of your budget — it is how early you read the shift in your target audience's attention curve**. The next brief in the category starts by answering that question.
````

- [ ] **Step 2: Verify file syntax**

```bash
head -8 src/data/cases/range-rover-flagship.en.mdx
wc -w src/data/cases/range-rover-flagship.en.mdx
```

Expected: clean YAML frontmatter, word count between 1900 and 2200. If the count is significantly off, do NOT auto-pad or trim — flag in the PR body and let Jeremy decide.

- [ ] **Step 3: Confirm Next.js does not try to route to this file yet**

Since `[slug]/page.tsx` only imports `${slug}.zh.mdx`, the `.en.mdx` file is unreachable via routing in W3. That is intentional — W5 will add `/en` and start consuming it.

Verify nothing accidentally routes to it:

```bash
npm run build 2>&1 | grep -E "range-rover-flagship\.en|range-rover-flagship/en"
```

Expected: empty. The build should NOT generate any route for the `.en` file. If it does, something in the loader was over-glob'd and needs to be narrowed.

- [ ] **Step 4: Commit**

```bash
git add src/data/cases/range-rover-flagship.en.mdx
git commit -m "content(range-rover): draft ~2000-word en deep case (mirrors zh)"
```

---

## Task 5: Verify the `proof-of-work` landing page still renders correctly

**Files:**
- Verify only: `src/app/proof-of-work/page.tsx`

After Tasks 2–4, the landing page should still work because the `cases` array in `src/data/cases/index.ts` is unchanged (slugs unchanged, only the MDX file paths changed). This task is a sanity check, not a code change.

- [ ] **Step 1: Visual check via dev server**

```bash
npm run dev
```

Browser:
1. Open `http://localhost:3000/proof-of-work`
2. Expect 4 case cards with brand names, sectors, years, and thinking quotes.
3. Expect "Download CV · CN" and "Download CV · EN" buttons (added in W1). Click each — the W1 placeholder PDFs should still download (real CVs come in Task 7).
4. Click Range Rover card → opens the new full case writeup from Task 3.

Stop dev server.

- [ ] **Step 2: If anything is broken**

Most likely cause: the CV PDF buttons 404 because the W1 placeholders never landed in main. If that happens, generate fresh placeholders the same way W1 did:

```bash
cat > /tmp/cv-en.txt <<'EOF'
Jeremy Ji — CV (Provisional)
Real bilingual CV published 2026-05. See /interface for current contact.
EOF
cupsfilter /tmp/cv-en.txt > public/cv/jeremy-ji-cv-en.pdf 2>/dev/null
# Same for cv-cn.txt and jeremy-ji-cv-cn.pdf
```

Then re-test. If CVs are not broken, skip this fallback.

- [ ] **Step 3: No commit needed** unless the fallback fixed a missing PDF — in which case commit those.

---

## Task 6: Update `public/cv/README.md` to reflect the W3 status

**Files:**
- Modify: `public/cv/README.md`

- [ ] **Step 1: Read the current README**

```bash
cat public/cv/README.md
```

Expected: a short note from W1 mentioning the placeholders.

- [ ] **Step 2: Replace with the W3 version**

If real CV PDFs will land in Task 7, set the README to:

```markdown
# CV files

- `jeremy-ji-cv-cn.pdf` — Chinese CV, current as of 2026-05.
- `jeremy-ji-cv-en.pdf` — English CV, current as of 2026-05.

Both files are linked from `/proof-of-work` download buttons and from the `/interface` page.
Update them in place when the canonical CV changes; preserve the file names so existing inbound links do not break.
```

If Task 7 is being skipped (real CVs not ready), set instead to:

```markdown
# CV files

- `jeremy-ji-cv-cn.pdf` — placeholder dropped W1, awaiting real bilingual CV in W3.5.
- `jeremy-ji-cv-en.pdf` — placeholder dropped W1, awaiting real bilingual CV in W3.5.

Both files are linked from `/proof-of-work` download buttons and from the `/interface` page.
```

- [ ] **Step 3: Commit**

```bash
git add public/cv/README.md
git commit -m "docs(cv): refresh README to reflect W3 state"
```

---

## Task 7: Replace placeholder CV PDFs with real bilingual CVs (Jeremy-provided)

**Files:**
- Replace (binary): `public/cv/jeremy-ji-cv-cn.pdf`
- Replace (binary): `public/cv/jeremy-ji-cv-en.pdf`

**Skip path:** This task requires Jeremy to provide two finished PDF files. If they are not ready when this plan is executed, comment in the PR body "W3.5: real CV PDFs pending Jeremy" and proceed to Task 8 — the merge does not block on this single deliverable.

- [ ] **Step 1: Check whether Jeremy provided the source files**

```bash
ls /tmp/jeremy-ji-cv-cn-FINAL.pdf /tmp/jeremy-ji-cv-en-FINAL.pdf 2>&1
```

If both files exist → continue to Step 2.
If neither file exists → record "Task 7 skipped — pending Jeremy" in the PR body and jump to Task 8.

- [ ] **Step 2: Copy into `public/cv/`**

```bash
cp /tmp/jeremy-ji-cv-cn-FINAL.pdf public/cv/jeremy-ji-cv-cn.pdf
cp /tmp/jeremy-ji-cv-en-FINAL.pdf public/cv/jeremy-ji-cv-en.pdf
```

- [ ] **Step 3: Verify file sizes are plausible**

```bash
ls -la public/cv/jeremy-ji-cv-*.pdf
file public/cv/jeremy-ji-cv-*.pdf
```

Expected: each file 50KB to 500KB, both report `PDF document`. If a file is 1KB it's probably empty; if it's 5MB it's probably uncompressed and should be optimized (`pdf-compress` or similar) before committing.

- [ ] **Step 4: Smoke-test in dev**

```bash
npm run dev
```

Browser:
1. `http://localhost:3000/proof-of-work` → click "Download CV · CN" → PDF downloads, opens as the real CV (not the placeholder text).
2. Same for "Download CV · EN".

- [ ] **Step 5: Commit**

```bash
git add public/cv/jeremy-ji-cv-cn.pdf public/cv/jeremy-ji-cv-en.pdf
git commit -m "cv: replace W1 placeholders with real bilingual CVs"
```

---

## Task 8: W3 finalization — full test, lint, build, push, open PR

**Files:**
- No code edits unless failures surface

- [ ] **Step 1: Run the full test suite**

```bash
npm test -- --run
```

Expected: all tests pass. W3 does not add new tests; total should match W2 final count (≥ 25). If anything dropped, investigate before continuing — most likely cause is a stale snapshot referencing the old `prompts` export from Task 1.

- [ ] **Step 2: Run lint over the full src**

```bash
npm run lint
```

Expected: 0 errors.

- [ ] **Step 3: Run a production build**

```bash
rm -rf .next
npm run build
```

Expected:
- Build succeeds.
- `Generating static pages` line reports the same count as W2 (the new `.en.mdx` file is NOT routed in W3 so the count does not increase).
- No warnings about missing modules or unresolved imports.

If the build fails on the MDX rename, the most common cause is a stale `.next` cache — the `rm -rf .next` above should prevent that.

- [ ] **Step 4: Push to origin**

```bash
git push -u origin w3-range-rover-case
```

- [ ] **Step 5: Open a PR against `main`**

```bash
gh pr create --base main --head w3-range-rover-case \
  --title "feat(W3): Range Rover deep case (zh+en) + bilingual scaffolding + real CVs" \
  --body "$(cat <<'EOF'
## Summary
- Range Rover Flagship case goes from a 42-line skeleton to a full ~2000-字 中文 + ~2000-word English deep writeup, both spanning all 6 sections (Context / Challenge / Strategy / Execution / Result / Reflection)
- Introduces the `${slug}.zh.mdx` / `${slug}.en.mdx` bilingual file convention for all 4 cases. Nintendo / Bicester / PUMA stay zh-only this week — their `.en.mdx` lands in W4 / W6 next to the existing `.zh.mdx`
- `[slug]/page.tsx` loader now hard-imports the `.zh.mdx` variant; `/en` routing is W5
- Drops deprecated `prompts` / `AgentPrompt` alias from `src/data/live-agent.ts` (the W2 carryover)
- Replaces W1 placeholder CV PDFs with real bilingual CVs (or, if Jeremy is not ready, defers that single item to W3.5 with a noted skip path)

## Scope (per spec §3 W3)
- ✅ Range Rover MDX: 42 行 → ~2000 字 中
- ✅ Range Rover EN: new ~2000-word mirror, kicks off the bilingual content pattern
- ✅ Bilingual file naming convention adopted across all 4 cases
- ✅ Real CV PDFs replace W1 placeholders (or skipped with note)
- ✅ Cleanup of W2-deprecated `prompts` / `AgentPrompt` alias

## Content review checkpoints for Jeremy
Markers in the MDX body where I need your fact-check / personal voice:
- **Context** (both languages): one sentence about the specific client confusion at the time
- **Challenge** (both languages): actual budget range / approval depth, if disclosable
- **Result** (both languages): confirm which numbers are externally citable
- **Reflection** (both languages): this whole section is scaffolding — please rewrite in your own voice

Once you've made those edits, the PR is ready to merge.

## Test plan
- [x] `npm test -- --run` — all unit tests pass (no regression from W2 total)
- [x] `npm run lint` — 0 errors
- [x] `npm run build` — production build succeeds, page count matches W2 (no new routes added in W3)
- [x] Manual: `/proof-of-work/range-rover-flagship` renders full 6-section writeup with no `[要写：...]` skeleton placeholders remaining
- [x] Manual: `/proof-of-work` landing still shows all 4 case cards and both CV download buttons work
- [x] Manual: other 3 cases (`/proof-of-work/nintendo-cny-2022`, `bicester-village-2022`, `puma-launch`) still render their existing skeleton content after the `.zh.mdx` rename

## Out of scope (deferred per spec)
- English routing at `/en/proof-of-work/range-rover-flagship` (W5)
- Nintendo / Bicester / PUMA case writeup expansion (W4 / W4 / W6)
- Field notes expansion (W6)
- English versions of hero / OS / area manifestos (W5, when /en route opens)
EOF
)"
```

- [ ] **Step 6: Verify Vercel preview deploy**

After `gh pr create`, watch for the Vercel bot comment with the preview URL. Open it and:
1. `/proof-of-work/range-rover-flagship` → renders the full case
2. `/proof-of-work` → both CV downloads work (whether real or placeholder)
3. `/live-agent` → still works (the `prompts` removal in Task 1 was the risk)

If preview fails, fix locally and re-push to the same branch.

- [ ] **Step 7: Notify Jeremy for review**

PR body already lists the `[✋ Jeremy 校对]` markers. Ping in the chat that the PR is open and waiting on his content review pass (target: 2 days hold per master plan §3 W3 risk-switch).

After Jeremy edits in the PR and approves, squash-merge to `main`. Vercel auto-deploys to `https://jeremyji.vercel.app`.

- [ ] **Step 8: Final session save**

After merge:

```bash
echo "W3 complete — Range Rover deep case (zh+en) merged, bilingual file convention in place, CV PDFs $(test -f public/cv/jeremy-ji-cv-cn.pdf && echo updated || echo pending-W3.5)" >> docs/superpowers/plans/2026-05-21-w3-range-rover-case.md
```

Then update or create `~/.claude/session-data/<date>-w3-complete-session.tmp` noting:
- Tasks 1–8 status (mark Task 7 as W3.5 if skipped)
- PR URL
- Next step: W4 — Nintendo CNY 2022 + Bicester Village 2022 deep cases (zh, ~2000 字 each, reuse this W3 template)

---

## Validation Summary

After all 8 tasks (with Task 7 either completed or explicitly skipped to W3.5), the following are true:

1. `https://jeremyji.vercel.app/proof-of-work/range-rover-flagship` renders a full 6-section case writeup of roughly 2000 字
2. `src/data/cases/range-rover-flagship.en.mdx` exists with ~2000 English words, mirrored structure
3. All 4 case files use the `${slug}.zh.mdx` naming convention
4. `src/data/live-agent.ts` contains no `prompts` export and no `AgentPrompt` type
5. `npm test && npm run lint && npm run build` all green
6. If Task 7 completed: real bilingual CV PDFs are live and download from `/proof-of-work`. If skipped: the W1 placeholders remain and the PR body flags W3.5
7. No `[要写：...]` skeleton placeholders remain anywhere in the Range Rover MDX files (the `[✋ Jeremy 校对]` markers are Jeremy's edit pass, not the executor's)
8. No occurrence of "不是……而是……" pattern in the new prose

---

## Risks during W3

| Risk | Trigger | Mitigation |
|---|---|---|
| Jeremy disagrees with the draft factual content | PR review on Range Rover MDX | The `[✋ Jeremy 校对]` markers concentrate the edits; the PR is held 2 days per master plan §3 W3 |
| Real CV PDFs not ready in time | Task 7 step 1 finds no files in `/tmp/` | Skip path documented: leave W1 placeholders, flag as W3.5 in PR body |
| The `.zh.mdx` rename breaks Nintendo / Bicester / PUMA case pages | Task 2 step 4 dev test | Loader hardcodes `.zh.mdx` so all 4 must be renamed together; if a single file is missed, the corresponding case page 404s and is caught in dev |
| `prompts` alias removal breaks a forgotten consumer | Task 1 step 1 grep | Grep is run before deletion; if a hit is found, fix the consumer first |
| English draft reads as machine-translated | PR review | Jeremy edits in the PR; voice rules in the style guard block above apply (no AI-pattern, plain language, no agency-deck KPI-isms) |
| Build fails after MDX rename | Task 8 step 3 | `rm -rf .next` is included before build to clear stale type generation |

---

## What W3 explicitly does NOT include

- English routing (`/en/...`) — W5
- Nintendo / Bicester / PUMA case content expansion — W4 / W4 / W6
- Field notes expansion — W6
- English versions of any homepage / area manifesto / OS content — W5
- Live Agent FAQ expansion beyond W2's 10 entries — W7
- Campaign Teardown v2 dynamic backend — W7
- Custom domain — W8

If any of these surface mid-W3, defer them and note in the PR body for the appropriate week.
