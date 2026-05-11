# Personal Site V2 Build Plan · 2026-05-11

**Date:** 2026-05-11
**Project:** `jeremy-personal-site` (https://github.com/Jidashuang/JeremyJi)
**Working branch:** `worktree-redesign-2026-05` → 即将合入 `main`
**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · MDX · Vitest
**Prior context:**
- `docs/superpowers/specs/2026-05-04-personal-site-design.md` (设计系统 + IA 规范,已实现)
- `docs/superpowers/plans/2026-05-04-personal-site.md` (3752 行执行计划,~80% 已完成)
- `docs/superpowers/reviews/2026-05-04-final-review.md` (Final review 验证 launch-ready)

---

## 1. 背景与缘由

`worktree-redesign-2026-05` 分支已经把 5-4 implementation plan 推进到 ~80%:33 页全部预渲染、9/9 测试通过、lint 干净、4 篇案例 MDX 与 7 篇 field-note MDX 已起骨架。剩下的是内容深度、双语支撑、1 个真交互模块,以及上线和宣发。

这份 plan 把这些剩下的工作压缩到 8 周硬节奏 + 2 周浮动,执行策略是 **vertical slice**:周 2 先把一个最小可信版本(1 案例 + 1 真交互 + 1 FAQ)挂到 vercel.app,之后每周横向加内容,周 8 收口宣发。

## 2. 决策记录

| 主题 | 选择 | 替代选项 |
|---|---|---|
| 受众 | 招聘 / 业界 + 学术副产品(教授可看不丢人) | 内容粉丝、品牌合作 |
| 时间窗 | 完整 AI-era 形态,8 周硬 + 2 周浮动 | MVP (1-2 周) / 编辑级 (3-4 周) |
| Live Agent | 静态问答路由(FAQ + 跳转) | 自建 RAG / 商业 chatbot / 全上下文 |
| Playground | 1 个真交互(Campaign Teardown) + 5 个静态卡 + walkthrough | 0 / 2 / 改成代码 demo 列表 |
| 双语 | 中英独立路由(`/` 与 `/en`) | 仅关键页双语 / 维持现状 |
| 内容创作 | AI 起草 + 你定稿 | 你亲写 / 不补 / 采访合写 |
| 部署 | Vercel + 默认 `jeremyji.vercel.app`,自定义域名晚一步 | Vercel + 自定义域名 / 国内服务器 |
| 仓库基线 | 把 `worktree-redesign-2026-05` 合到 `main`,master 与 copilot 分支留作 archive | 保持现状 / 全部清理 |

## 3. 8 周执行表

| 周 | 落地物 | 关键产出 | 风险开关 |
|---|---|---|---|
| **W1** | 基线整理 + Vercel 上线中文版 | worktree 合入 main、`.claude/` 加入 gitignore、`hi@jeremyji.dev` 占位邮箱替换、`feed-card.tsx` 的硬编码 brand-gradient 移至 token、CV PDF 占位文件接入、Vercel 项目接通 | 若 build 失败,卡在 W1 直至绿灯 |
| **W2** | Campaign Teardown v1 真交互 + Live Agent FAQ v1 | 输入框 / 5 块结构化输出 / 选 Nintendo CNY 作 demo case;10 条核心 FAQ + 静态跳转路由 | 真交互如复杂超时,降级为 "Try a demo with our preset case" 单按钮 |
| **W3** | 第 1 篇深度案例 Range Rover(中英) | 2000 字中文 + 2000 字英文,接 `/proof-of-work/range-rover-flagship`;统一模板 Context / Challenge / Strategy / Execution / Result | AI 起草后留 2 天给本人定稿 |
| **W4** | 第 2 + 第 3 篇案例 Nintendo + Bicester(中英) | 复用 W3 模板,提速到双周一篇节奏 | 若两篇太挤,优先 Nintendo,Bicester 顺延 |
| **W5** | `/en` 路由上线 + 语言切换 + Noto 字体加载 | 顶导加 EN / 中 切换、Lighthouse 检查字体 LCP、第一次发链接给 Cambridge 教授 | 路由表如有重叠,先用 `app/[locale]/[...slug]` 结构 |
| **W6** | 第 4 篇案例 PUMA(中英) + 3-4 篇 field notes 双语 | Thinking Feed 真正有内容,不是占位 | field notes 若太多,优先 3 篇高质 |
| **W7** | Campaign Teardown v2 + Live Agent FAQ v2 + Gallery 接真 Instagram | 加保存 / 分享 / 错误处理;FAQ 扩到 30 条;`scripts/sync-instagram.sh` 跑通 | Instagram 拉取若需登陆,临时人工导出 |
| **W8** | 正式发布 | (可选)接自定义域名、发到 X / 知乎、招聘联系人邮件签名换上新链接 | 域名未买则用 vercel.app |

## 4. 模块状态地图

```
状态记号: ✅ launch-ready  ⚠️ 起骨架/需扩展  ❌ 未开始
```

### 4.1 工程层
- ✅ Next.js 16 + React 19 + TS + Tailwind 4 骨架
- ✅ App Router · 33 个预渲染页面
- ✅ MDX + remark-gfm + rehype-slug
- ✅ Vitest + 9 个单元测试
- ✅ Component 分层(primitives / sections / cards / feed / shell)
- ✅ Editorial Warm v2 视觉系统
- ✅ Zod 数据校验
- ⚠️ `feed-card.tsx` 硬编码 gradient(W1 修)
- ❌ Vercel 部署接通(W1)
- ❌ `/en` 双语路由(W5)

### 4.2 内容层
- ⚠️ Hero / 导航文案(已有,W1 校对一次)
- ⚠️ Operating System / 4 条 principle(已有,W1 校对)
- ⚠️ Range Rover MDX 42 行 → 2000 字(W3)
- ⚠️ Nintendo MDX 37 行 → 2000 字(W4)
- ⚠️ Bicester / PUMA MDX → 2000 字(W4 / W6)
- ⚠️ 7 篇 field notes,平均 16 行 → 至少 3 篇扩至 600-800 字(W6)
- ❌ 所有以上的英文版(W3 起,与中文同步)
- ❌ Campaign Teardown 的 demo case 内容(W2)
- ❌ Live Agent FAQ 词典(W2 + W7)
- ❌ CV PDF 中英两版(W1 占位 → W3 替换正式)

### 4.3 交互层
- ❌ Campaign Teardown 真交互(W2)
- ⚠️ Gallery Instagram 同步(脚本在,实际跑通需 W7)
- ❌ Live Agent 静态路由跳转逻辑(W2)
- ❌ 语言切换(W5)

### 4.4 运维层
- ❌ Vercel 项目(W1)
- ❌ 自定义域名(W8 可选)
- ❌ analytics(可推迟到 V3)
- ❌ 邮箱替换 `hi@jeremyji.dev`(W1)

## 5. 模块决策与约束

### 5.1 Campaign Teardown(W2 唯一真交互)

**输入**:用户在文本框输入(a)品牌/产品名,或(b)真实 campaign URL,或(c)简短描述。

**输出**:5 块结构化卡片
1. Problem framing — 这次传播在解决什么问题
2. Audience — 谁是真正要打动的人
3. Channel mix — 媒介组合的取舍
4. Pacing — 节奏与节点
5. Creative fit — 内容跟环境合不合

**实现**:V1 纯前端 + 静态词典,先用预设 case(Nintendo CNY、Range Rover)展示输出形态。V2 视情况接 Claude / GPT API,但 V0-V8 不做这一步,**留 webhook 入口**留给未来。

**约束**:输出口吻必须像 Jeremy 本人在拆解,不出现"AI generated"字样。Demo case 的"Result"块必须能链到 Proof of Work 对应案例页。

### 5.2 Live Agent V0 静态路由

**输入**:用户在 mock terminal 输入预设 prompt(或自由提问关键词匹配)

**输出**:静态文本回答 + 路由到对应深度页

**词典结构**:
```ts
interface FAQEntry {
  triggers: string[]      // 关键词数组
  answer: string          // 短回答 < 300 字
  followUp: { label: string, href: string }[]  // 跳转项
  language: 'zh' | 'en' | 'both'
}
```

**约束**:词典手工维护,30 条以内。视觉上保留 terminal 样式让人误以为是 AI,但不撒谎说接了 LLM。下面挂一行小字:`Static knowledge router · LLM integration pending`。

### 5.3 双语策略

- 路由:`/` 中文 / `/en` 英文,所有页面 1:1 镜像
- 切换:顶导右侧加 `中文 / EN`,基于 `cookies-next` 或 Next.js 内置 i18n
- 字体:已加 Noto Serif SC + Noto Sans SC,W5 验证 LCP < 2.5s
- 内容:每篇 MDX 拆为 `case-name.zh.mdx` + `case-name.en.mdx`,共享 frontmatter

## 6. 风险与决策点

| 风险 | 触发条件 | 应对 |
|---|---|---|
| 内容拖期 | W4 末 Range Rover + Nintendo 未完成 | 砍掉 W6 PUMA,W6 改为补内容周 |
| 双语翻译质量 | 英文版被教授指出明显机翻感 | W5 留 1 天给专业校对,或单独请人 review |
| Campaign Teardown 形似而不神 | W2 demo 出来后觉得没说服力 | 退化为"3 个 case 横向对照"静态展示 |
| 部署被 Vercel 限流(中国访问慢) | W1 国内访问 > 5s | W8 之前接 Cloudflare Pages 备用 |
| 内容定稿停滞 | AI 起草后本人不改 | 每周设固定 1.5 小时改稿时段 |

## 7. 范围外(V0 不做)

- LLM 接入(Campaign Teardown 与 Live Agent 都不接)
- 评论 / 互动
- Newsletter 订阅
- 搜索(站内全文)
- Motion 系统 / 滚动动画
- 暗色模式
- 国内服务器部署 + 备案
- 自定义域名(若 W8 决定买再做)

## 8. 验收标准

W8 结束时,以下全部为真:

1. https://jeremyji.vercel.app(或自定义域名)可以打开,中英双语切换正常
2. 顶导 5 个主入口(Operating System / Proof / Playground / Feed / Interface)全部可点
3. Proof of Work 4 篇案例每篇 1500 字以上,中英齐备
4. Playground Campaign Teardown 可输入并返回结构化输出,demo case 至少 1 个
5. Live Agent FAQ 30 条以上,每条都能正确路由
6. Lighthouse Performance ≥ 85,Accessibility ≥ 90
7. CV PDF 中英两版可下载,链接不死
8. 没有占位邮箱 / 占位文本残留

## 9. 后续步骤

完成 spec → 用户审核 → 接 `superpowers:writing-plans` 把 8 周表展开成 task 级 implementation plan(每周 5-10 个 task,带验收门)。
