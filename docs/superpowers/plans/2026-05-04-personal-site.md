# Personal Site Redesign · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the existing Next.js personal site into an editorial-quality publication implementing the Editorial Warm v2 visual system, the Approach 3 hybrid IA, the seven primitives + section components decomposition, and Phase 1-4 content per `docs/superpowers/specs/2026-05-04-personal-site-design.md`.

**Architecture:** Next.js 16 App Router with statically generated routes. UI is decomposed into `primitives/`, `sections/`, `cards/`, `feed/`, and `live-agent/` component groups. Long-form content (cases, walkthroughs, area manifestos, field notes) is authored as MDX in `src/data/`. Structured content (lists, metadata, endpoints) lives in TypeScript modules validated at module load via Zod. Styling is split into `tokens.css` / `reset.css` / `primitives.css` / `globals.css` four-layer system.

**Tech Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Zod 4 (existing) · `@next/mdx` + `remark-gfm` + `rehype-slug` (new) · `vitest` (new, for logic tests) · Google Fonts (Playfair Display · Space Grotesk · IBM Plex Mono · Noto Serif SC · Noto Sans SC)

**Spec:** `docs/superpowers/specs/2026-05-04-personal-site-design.md`
**Visual references:** `.superpowers/brainstorm/59252-1777880011/content/*.html`

---

## File Structure

### Created

```
src/
├── app/
│   ├── styleguide/page.tsx                          (Phase 1 internal QA)
│   ├── proof-of-work/[slug]/page.tsx                (Phase 4 SSG)
│   └── playground/[slug]/page.tsx                   (Phase 4 SSG)
│
├── components/
│   ├── shell/
│   │   ├── topbar.tsx
│   │   └── footer.tsx
│   ├── primitives/
│   │   ├── section-number-bar.tsx
│   │   ├── pull-quote.tsx
│   │   ├── hairline-rule.tsx
│   │   ├── pill.tsx
│   │   ├── tag.tsx
│   │   ├── eyebrow.tsx
│   │   └── download-button.tsx
│   ├── sections/
│   │   ├── hero-block.tsx
│   │   ├── operating-system-block.tsx
│   │   ├── proof-of-work-block.tsx
│   │   ├── thinking-feed-teaser.tsx
│   │   ├── playground-teaser.tsx
│   │   ├── interface-block.tsx
│   │   └── live-agent-block.tsx
│   ├── cards/
│   │   ├── case-card.tsx
│   │   ├── feed-card.tsx
│   │   ├── play-card.tsx
│   │   └── track-card.tsx
│   ├── feed/
│   │   ├── feed-grid.tsx
│   │   ├── tag-filter-bar.tsx
│   │   └── feed-item.tsx
│   └── live-agent/
│       ├── agent-terminal.tsx
│       └── prompt-list.tsx
│
├── data/
│   ├── site.ts
│   ├── domains.ts
│   ├── principles.ts
│   ├── interface.ts
│   ├── live-agent.ts
│   ├── gallery.ts
│   ├── feed/
│   │   ├── videos.ts
│   │   ├── podcasts.ts
│   │   └── field-notes/
│   │       ├── 2025-11-konbini-light.mdx
│   │       ├── 2025-12-tokyo-train-ad.mdx
│   │       ├── 2026-01-shopping-mall-japan.mdx
│   │       ├── 2026-02-platform-ux.mdx
│   │       ├── 2026-03-marketing-method.mdx
│   │       ├── 2026-04-design-observation.mdx
│   │       └── 2026-05-japan-signal.mdx
│   ├── cases/
│   │   ├── range-rover-flagship.mdx
│   │   ├── nintendo-cny-2022.mdx
│   │   ├── bicester-village-2022.mdx
│   │   └── puma-launch.mdx
│   └── playground/
│       ├── campaign-teardown.mdx
│       └── audience-mapper.mdx
│
├── lib/
│   ├── content.ts                                   (MDX loader)
│   ├── feed.ts                                      (aggregation + filter)
│   ├── feed.test.ts
│   ├── schemas.ts                                   (Zod)
│   └── schemas.test.ts
│
└── styles/
    ├── tokens.css
    ├── reset.css
    └── primitives.css

public/
└── cv/
    ├── jeremy-ji-cv-en.pdf
    └── jeremy-ji-cv-cn.pdf

vitest.config.ts                                     (test runner)
```

### Modified

```
package.json                  add deps + scripts
next.config.ts                wire MDX
src/app/layout.tsx            add Chinese fonts
src/app/page.tsx              compose section components
src/app/globals.css           slim to imports + body base
src/app/proof-of-work/page.tsx
src/app/thinking-feed/page.tsx
src/app/playground/page.tsx
src/app/areas/[slug]/page.tsx
src/app/gallery/page.tsx
src/app/interface/page.tsx
src/app/live-agent/page.tsx
src/components/site-shell.tsx use new Topbar/Footer
src/data/feed/articles.json   add tag field per item
```

### Deleted at end (after migration)

```
src/data/site-content.ts      replaced by data/{site,domains,principles,interface,live-agent,gallery,feed/*}.ts
```

---

## Verification Strategy

This is a content-heavy static site, not a business app. Test rigor scales with risk:

| Surface | Verification |
|---------|--------------|
| Pure logic (`lib/feed.ts`, `lib/schemas.ts`) | TDD with vitest |
| UI primitives (`components/primitives/*`) | Render in `/styleguide`, visual check vs wireframe HTML |
| Section components | Render in `/styleguide` showcase, then in homepage context |
| Pages | `npm run build` succeeds, `npm run lint` clean, manual navigation |
| Content (MDX) | Renders correctly at route, no console errors |

Before every commit: `npm run lint` passes, `npm run build` succeeds. Tests if they exist for the touched module.

---

## Pre-flight

### Task 0: Resolve existing uncommitted state

**Files:** none

The repo currently has uncommitted modifications from prior work (`next.config.ts`, `src/app/areas/[slug]/page.tsx`, `src/app/globals.css`, `src/app/playground/page.tsx`, `src/app/thinking-feed/page.tsx`, `src/components/site-shell.tsx`, `src/data/site-content.ts`). These will conflict with Phase 1-2 work.

- [ ] **Step 1: Inspect what's there**

```bash
git diff --stat
git diff src/components/site-shell.tsx src/data/site-content.ts
```

- [ ] **Step 2: Decide per file** — keep, commit separately, or discard. Do this with the user; do not delete unilaterally.

- [ ] **Step 3: Either commit those changes on a separate "WIP cleanup" commit, or stash them** before continuing.

```bash
# Option A: commit
git add <files-to-keep> && git commit -m "wip: pre-redesign in-progress work"
# Option B: stash
git stash push -m "pre-redesign WIP" <files>
```

- [ ] **Step 4: Confirm clean working tree**

```bash
git status
# Expected: working tree clean (untracked .claude/ is OK)
```

---

## Phase 1: Foundation

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add MDX, vitest, and Tailwind utility deps**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-slug gray-matter
npm install -D vitest @vitest/ui @testing-library/react @testing-library/dom jsdom @types/mdx
```

- [ ] **Step 2: Add test script to `package.json`**

In `package.json` under `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify install**

```bash
npm run build
# Expected: build succeeds (no use of new deps yet, but install must not break existing)
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add MDX, vitest, gray-matter for redesign"
```

---

### Task 2: Set up vitest

**Files:**
- Create: `vitest.config.ts`

- [ ] **Step 1: Write `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 2: Verify with a smoke test**

Create `src/lib/smoke.test.ts`:

```typescript
import { describe, it, expect } from "vitest";

describe("vitest setup", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run:

```bash
npm test
# Expected: 1 passed
```

- [ ] **Step 3: Delete smoke test, commit setup**

```bash
rm src/lib/smoke.test.ts
git add vitest.config.ts
git commit -m "chore: configure vitest"
```

---

### Task 3: Wire MDX into Next.js

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Update `next.config.ts`**

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}]],
  },
});

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
# Expected: build succeeds
```

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "build: enable MDX in Next config"
```

---

### Task 4: Add Chinese fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `layout.tsx` to load Noto Serif SC and Noto Sans SC**

Replace the contents of `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Playfair_Display,
  Space_Grotesk,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from "next/font/google";
import "./globals.css";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const cnSerif = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cn-serif",
  preload: false,
});

const cnSans = Noto_Sans_SC({
  weight: ["400", "500", "600"],
  variable: "--font-cn-sans",
  preload: false,
});

export const metadata: Metadata = {
  title: "Jeremy Ji | Operating System for Media Strategy",
  description:
    "A standalone personal site for Jeremy Ji, focused on media strategy, proof of work, cultural research, and AI-native workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} ${cnSerif.variable} ${cnSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Build and visit homepage in dev**

```bash
npm run dev
# Visit http://localhost:3000 — verify no font errors in network tab
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style: add Noto Serif SC + Noto Sans SC for Chinese editorial type"
```

---

### Task 5: Refactor styles into 4-file system

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/reset.css`, `src/styles/primitives.css`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  /* Surface */
  --bg: #f2eadf;
  --paper-2: #faf3e8;
  --paper: #fffaf2;

  /* Ink */
  --ink: #181512;
  --muted: #62574c;
  --line: rgba(24, 21, 18, 0.12);
  --line-strong: #181512;

  /* Accent (one primary, one dark hover, one semantic green) */
  --warm: #c66336;
  --warm-dark: #8b3c1d;
  --green: #1f6b63;

  /* Type families — fall through to CN fallback */
  --font-serif: var(--font-display), var(--font-cn-serif), Georgia, serif;
  --font-sans: var(--font-body), var(--font-cn-sans), -apple-system, sans-serif;
  --font-mono: var(--font-mono), "SF Mono", Menlo, monospace;

  /* Type scale (8 stops per spec §3.2) */
  --t-display-xl: 84px;
  --t-display-l: 56px;
  --t-display-m: 36px;
  --t-h3: 22px;
  --t-body-l: 18px;
  --t-body: 15px;
  --t-eyebrow: 11px;
  --t-caption: 13px;

  /* Layout */
  --container-max: 1180px;
  --measure: 60ch;
  --section-gap: 96px;
  --section-gap-mobile: 64px;
  --component-gap: 32px;
  --card-gap: 14px;
}

@media (max-width: 720px) {
  :root {
    --t-display-xl: 56px;
    --t-display-l: 40px;
    --t-display-m: 28px;
    --section-gap: 64px;
  }
}
```

- [ ] **Step 2: Create `src/styles/reset.css`**

```css
* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: var(--t-body);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button, a, input, textarea, select { font: inherit; }
img { display: block; max-width: 100%; }
```

- [ ] **Step 3: Create `src/styles/primitives.css`**

This holds the design-system class-level utilities that components reuse. Reference the wireframe HTML at `.superpowers/brainstorm/59252-1777880011/content/visual-system.html` for visual targets.

```css
/* === Type utilities === */
.h-display-xl { font-family: var(--font-serif); font-size: var(--t-display-xl); line-height: 0.98; font-weight: 500; letter-spacing: -0.015em; margin: 0; }
.h-display-l  { font-family: var(--font-serif); font-size: var(--t-display-l);  line-height: 1.04; font-weight: 500; letter-spacing: -0.01em;  margin: 0; }
.h-display-m  { font-family: var(--font-serif); font-size: var(--t-display-m);  line-height: 1.12; font-weight: 500;                            margin: 0; }
.h-3          { font-family: var(--font-sans);  font-size: var(--t-h3);         line-height: 1.30; font-weight: 600; letter-spacing: -0.005em; margin: 0; }
.body-l       { font-family: var(--font-sans);  font-size: var(--t-body-l);     line-height: 1.65; color: #2a221a; }
.body         { font-family: var(--font-sans);  font-size: var(--t-body);       line-height: 1.65; color: #2a221a; }
.eyebrow      { font-family: var(--font-mono);  font-size: var(--t-eyebrow);    letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.caption      { font-family: var(--font-sans);  font-size: var(--t-caption);    line-height: 1.50; color: var(--muted); }

/* === Layout shells === */
.section { width: min(var(--container-max), 100%); margin: 0 auto; padding: 0 clamp(0.9rem, 2vw, 2rem); }
.measure { max-width: var(--measure); }

/* === Pill button === */
.pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.1rem; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; font-family: var(--font-sans); transition: background 0.15s, color 0.15s; }
.pill:hover { background: var(--paper); }
.pill-solid { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.pill-solid:hover { background: var(--warm-dark); border-color: var(--warm-dark); }

/* === Tag === */
.tag { display: inline-block; padding: 0.25rem 0.7rem; border: 1px solid var(--line); border-radius: 999px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.tag-solid { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.tag-warm  { background: rgba(198, 99, 54, 0.1); color: var(--warm-dark); border-color: rgba(198, 99, 54, 0.3); }

/* === Hairline rules === */
.rule        { border: none; border-top: 1px solid var(--line); margin: 0; }
.rule-strong { border: none; border-top: 3px solid var(--ink); margin: 0; }
.rule-warm   { border: none; border-top: 1px solid var(--warm); margin: 0; }

/* === Pull quote === */
.pull-quote { padding: 0.5rem 0 0.5rem 1.4rem; border-left: 3px solid var(--warm); font-family: var(--font-serif); font-style: italic; font-size: var(--t-h3); line-height: 1.45; max-width: var(--measure); }
```

- [ ] **Step 4: Slim `src/app/globals.css`**

Replace the entire contents (the existing 1.3K-line file) with:

```css
@import "../styles/tokens.css";
@import "../styles/reset.css";
@import "../styles/primitives.css";

/* Page-level shell utilities live here only — component-scoped styles
   move into their respective component files via Tailwind classes. */

.page {
  position: relative;
  padding: 1.4rem clamp(0.9rem, 2vw, 2rem) 4rem;
}

.section + .section { margin-top: var(--section-gap); }
```

This is intentionally aggressive — the existing 1.3K lines of section-specific styles will not survive. They are replaced by component-scoped Tailwind/inline styles in Phase 2.

- [ ] **Step 5: Verify dev server**

```bash
npm run dev
# Visit http://localhost:3000 — homepage will look broken (component classes no longer styled).
# This is expected. We will rebuild homepage in Phase 2.
```

- [ ] **Step 6: Commit**

```bash
git add src/styles/ src/app/globals.css
git commit -m "refactor(css): split globals into tokens/reset/primitives layers"
```

---

### Task 6: Build primitive — `eyebrow.tsx`

**Files:**
- Create: `src/components/primitives/eyebrow.tsx`

- [ ] **Step 1: Write `eyebrow.tsx`**

```typescript
import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
};

export function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  return <Tag className={`eyebrow ${className ?? ""}`}>{children}</Tag>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/eyebrow.tsx
git commit -m "feat(primitives): add Eyebrow"
```

---

### Task 7: Build primitive — `section-number-bar.tsx`

**Files:**
- Create: `src/components/primitives/section-number-bar.tsx`

Reference: wireframe `.superpowers/brainstorm/59252-1777880011/content/visual-system.html` motif "Section number bar".

- [ ] **Step 1: Write `section-number-bar.tsx`**

```typescript
type SectionNumberBarProps = {
  number: string;        // e.g. "01"
  label: string;         // e.g. "My Operating System"
  trailing?: string;     // optional right-aligned em text, e.g. "How I observe, decide, execute"
};

export function SectionNumberBar({ number, label, trailing }: SectionNumberBarProps) {
  return (
    <div
      className="snb"
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "16px",
        borderTop: "1px solid var(--line-strong)",
        paddingTop: "10px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--t-eyebrow)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "var(--muted)",
        marginBottom: "28px",
      }}
    >
      <span style={{ color: "var(--ink)", fontWeight: 500, fontSize: "12px" }}>{number}</span>
      <span>{label}</span>
      {trailing ? <span style={{ marginLeft: "auto", color: "var(--warm)" }}>{trailing}</span> : null}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/section-number-bar.tsx
git commit -m "feat(primitives): add SectionNumberBar"
```

---

### Task 8: Build primitive — `pull-quote.tsx`

**Files:**
- Create: `src/components/primitives/pull-quote.tsx`

- [ ] **Step 1: Write `pull-quote.tsx`**

```typescript
import type { ReactNode } from "react";

type PullQuoteProps = {
  children: ReactNode;
  cite?: string;
};

export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      {children}
      {cite ? (
        <footer
          style={{
            fontFamily: "var(--font-mono)",
            fontStyle: "normal",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginTop: "12px",
          }}
        >
          — {cite}
        </footer>
      ) : null}
    </blockquote>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/pull-quote.tsx
git commit -m "feat(primitives): add PullQuote"
```

---

### Task 9: Build primitive — `hairline-rule.tsx`

**Files:**
- Create: `src/components/primitives/hairline-rule.tsx`

- [ ] **Step 1: Write `hairline-rule.tsx`**

```typescript
type HairlineRuleProps = {
  variant?: "default" | "strong" | "warm";
  className?: string;
};

export function HairlineRule({ variant = "default", className }: HairlineRuleProps) {
  const cls =
    variant === "strong" ? "rule-strong" :
    variant === "warm"   ? "rule-warm"   :
    "rule";
  return <hr className={`${cls} ${className ?? ""}`} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/hairline-rule.tsx
git commit -m "feat(primitives): add HairlineRule"
```

---

### Task 10: Build primitive — `pill.tsx`

**Files:**
- Create: `src/components/primitives/pill.tsx`

- [ ] **Step 1: Write `pill.tsx`**

```typescript
import Link from "next/link";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  href?: string;
  variant?: "default" | "solid";
  external?: boolean;
};

export function Pill({ children, href, variant = "default", external }: PillProps) {
  const cls = `pill ${variant === "solid" ? "pill-solid" : ""}`;
  const content = (
    <>
      {children}
      {variant === "solid" ? <span aria-hidden> →</span> : null}
    </>
  );
  if (!href) return <span className={cls}>{content}</span>;
  if (external) {
    return <a className={cls} href={href} target="_blank" rel="noreferrer">{content}</a>;
  }
  return <Link className={cls} href={href}>{content}</Link>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/pill.tsx
git commit -m "feat(primitives): add Pill"
```

---

### Task 11: Build primitive — `tag.tsx`

**Files:**
- Create: `src/components/primitives/tag.tsx`

- [ ] **Step 1: Write `tag.tsx`**

```typescript
import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  variant?: "default" | "solid" | "warm";
  onClick?: () => void;
  active?: boolean;
};

export function Tag({ children, variant = "default", onClick, active }: TagProps) {
  const base =
    variant === "solid" ? "tag tag-solid" :
    variant === "warm"  ? "tag tag-warm"  :
    "tag";
  const cls = `${base} ${active ? "tag-solid" : ""}`;
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} style={{ cursor: "pointer" }}>
        {children}
      </button>
    );
  }
  return <span className={cls}>{children}</span>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/tag.tsx
git commit -m "feat(primitives): add Tag"
```

---

### Task 12: Build primitive — `download-button.tsx`

**Files:**
- Create: `src/components/primitives/download-button.tsx`

- [ ] **Step 1: Write `download-button.tsx`**

```typescript
import type { ReactNode } from "react";

type DownloadButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  download?: boolean;
};

export function DownloadButton({ href, children, variant = "solid", download = true }: DownloadButtonProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    border: "1px solid var(--ink)",
    borderRadius: "6px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background: variant === "solid" ? "var(--ink)" : "transparent",
    color: variant === "solid" ? "var(--paper)" : "var(--ink)",
  };
  return (
    <a href={href} download={download} style={style}>
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/primitives/download-button.tsx
git commit -m "feat(primitives): add DownloadButton"
```

---

### Task 13: Build `/styleguide` showcase page

**Files:**
- Create: `src/app/styleguide/page.tsx`

This page is internal-only (will be removed at end of project, or left as a dev tool). It renders every primitive at every variant for visual QA.

- [ ] **Step 1: Write `styleguide/page.tsx`**

```typescript
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PullQuote } from "@/components/primitives/pull-quote";
import { HairlineRule } from "@/components/primitives/hairline-rule";
import { Pill } from "@/components/primitives/pill";
import { Tag } from "@/components/primitives/tag";
import { DownloadButton } from "@/components/primitives/download-button";

export default function StyleguidePage() {
  return (
    <main className="page">
      <section className="section" style={{ padding: "40px 0" }}>
        <h1 className="h-display-l">Styleguide</h1>
        <p className="body-l measure">Every primitive at every variant. Internal QA only.</p>

        <HairlineRule variant="strong" />
        <h2 className="h-display-m" style={{ marginTop: "32px" }}>Type</h2>
        <p className="h-display-xl">display-xl 84/0.95</p>
        <p className="h-display-l">display-l 56/1.04</p>
        <p className="h-display-m">display-m 36/1.12</p>
        <p className="h-3">h3 22/1.30</p>
        <p className="body-l">body-l 18/1.65 — 媒介策略师 · 日本文化观察者 · 内容创作者。</p>
        <p className="body">body 15/1.65 — Reading culture as signal, writing it into campaigns.</p>
        <Eyebrow>01 / Operating system — Eyebrow mono caps</Eyebrow>
        <p className="caption">caption 13/1.50 — Bicester Village · 2022 · KOC + local search</p>

        <HairlineRule variant="strong" />
        <h2 className="h-display-m" style={{ marginTop: "32px" }}>Section number bar</h2>
        <SectionNumberBar number="01" label="My Operating System" trailing="How I observe, decide, execute" />

        <h2 className="h-display-m">Pull quote</h2>
        <PullQuote cite="JJ — operating note">
          I don&apos;t write about Japan as a hobby — I read Japan as a market signal.
        </PullQuote>

        <h2 className="h-display-m">Hairline rules</h2>
        <HairlineRule variant="strong" />
        <p className="caption">strong (3px ink) ↑</p>
        <HairlineRule />
        <p className="caption">default (1px line) ↑</p>
        <HairlineRule variant="warm" />
        <p className="caption">warm (1px warm-orange) ↑</p>

        <h2 className="h-display-m">Pills</h2>
        <Pill variant="solid" href="/proof-of-work">Proof of Work</Pill>
        {" "}
        <Pill href="/thinking-feed">Thinking Feed</Pill>
        {" "}
        <Pill href="/live-agent">Talk to Live Agent</Pill>

        <h2 className="h-display-m">Tags</h2>
        <Tag>Default</Tag> <Tag variant="solid">Solid</Tag> <Tag variant="warm">Warm</Tag>

        <h2 className="h-display-m">Download buttons</h2>
        <DownloadButton href="/cv/jeremy-ji-cv-en.pdf">↓ Download CV · EN</DownloadButton>
        {" "}
        <DownloadButton href="/cv/jeremy-ji-cv-cn.pdf" variant="ghost">↓ CV · 中文</DownloadButton>

      </section>
    </main>
  );
}
```

- [ ] **Step 2: Visit `/styleguide` in dev**

```bash
npm run dev
# Visit http://localhost:3000/styleguide
# Verify against .superpowers/brainstorm/59252-1777880011/content/visual-system.html
```

- [ ] **Step 3: Commit**

```bash
git add src/app/styleguide/page.tsx
git commit -m "feat(styleguide): internal QA showcase for primitives"
```

---

### Task 14: Build new Topbar

**Files:**
- Create: `src/components/shell/topbar.tsx`

- [ ] **Step 1: Write `topbar.tsx`**

```typescript
import Link from "next/link";

type NavLink = { key: string; href: string; label: string };

type TopbarProps = {
  current: string;
  links: NavLink[];
};

export function Topbar({ current, links }: TopbarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: "0.9rem",
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        margin: "0 auto 1.3rem",
        padding: "0.95rem 1.05rem",
        width: "min(var(--container-max), 100%)",
        border: "1px solid var(--line)",
        borderRadius: "999px",
        background: "rgba(255, 250, 242, 0.82)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem" }}>
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            background: "var(--ink)",
            color: "var(--paper)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
          }}
        >
          JJ
        </span>
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 500 }}>Jeremy Ji</span>
          <span className="eyebrow">media · culture · systems</span>
        </span>
      </Link>

      <nav aria-label="Primary" style={{ display: "flex", gap: "20px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.key === current ? "page" : undefined}
            style={{ color: item.key === current ? "var(--warm)" : "var(--ink)" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shell/topbar.tsx
git commit -m "feat(shell): extract Topbar with current-page indicator"
```

---

### Task 15: Build new Footer with Vol. cue

**Files:**
- Create: `src/components/shell/footer.tsx`

- [ ] **Step 1: Write `footer.tsx`**

```typescript
const SOCIAL = [
  { href: "https://www.zhihu.com/people/ji-qing-qiu", label: "Zhihu" },
  { href: "https://space.bilibili.com/6963341", label: "Bilibili" },
  { href: "https://www.instagram.com/jeremyjee/", label: "Instagram" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="section"
      style={{
        marginTop: "var(--section-gap)",
        paddingTop: "28px",
        borderTop: "1px solid var(--line-strong)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "24px",
        alignItems: "center",
      }}
    >
      <span className="eyebrow">Vol. 01 — 2026 Spring · Shanghai</span>
      <span style={{ fontFamily: "var(--font-serif)", fontSize: "14px" }}>
        Jeremy Ji · © {year}
      </span>
      <nav aria-label="Social" style={{ textAlign: "right", display: "flex", gap: "16px", justifyContent: "flex-end" }}>
        {SOCIAL.map((s) => (
          <a key={s.href} className="eyebrow" href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shell/footer.tsx
git commit -m "feat(shell): Footer with Vol. 01 — 2026 Spring cue"
```

---

### Task 16: Refactor SiteShell to use new Topbar/Footer

**Files:**
- Modify: `src/components/site-shell.tsx`

- [ ] **Step 1: Replace `site-shell.tsx`**

```typescript
import type { ReactNode } from "react";
import { Topbar } from "./shell/topbar";
import { Footer } from "./shell/footer";
import { pageLinks } from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
  current: string;
};

export function SiteShell({ children, current }: SiteShellProps) {
  return (
    <main className="page">
      <Topbar current={current} links={pageLinks} />
      {children}
      <Footer />
    </main>
  );
}
```

Note: `pageLinks` will come from `@/data/site.ts` which is created in Task 18. This task is OK to commit ahead of that since `data/site.ts` is created in a follow-up; if the engineer is running tasks strictly sequentially, this import will not resolve until Task 18 — they should defer the build verification to Task 18.

- [ ] **Step 2: Commit**

```bash
git add src/components/site-shell.tsx
git commit -m "refactor(shell): SiteShell composes new Topbar + Footer"
```

---

### Task 17: Set up Zod schemas

**Files:**
- Create: `src/lib/schemas.ts`, `src/lib/schemas.test.ts`

- [ ] **Step 1: Write `schemas.test.ts` first (TDD)**

```typescript
import { describe, it, expect } from "vitest";
import { CaseSchema, FieldNoteSchema, FeedItemSchema } from "./schemas";

describe("schemas", () => {
  it("validates a complete case", () => {
    const valid = {
      slug: "range-rover-flagship",
      brand: "Range Rover",
      sector: "Auto",
      year: 2023,
      thinkingQuote: "把豪车 SUV 的传播从'参数比较'转向'生活方式叙事'。",
      heroBrandColor: "#2a4858",
    };
    expect(() => CaseSchema.parse(valid)).not.toThrow();
  });

  it("rejects a case missing brand", () => {
    expect(() =>
      CaseSchema.parse({ slug: "x", sector: "x", year: 2023, thinkingQuote: "x", heroBrandColor: "#000" })
    ).toThrow();
  });

  it("validates feed item with area+format tags", () => {
    const item = {
      id: "zhihu-001",
      title: "桥下彻",
      format: "article",
      area: "japan",
      href: "https://example.com",
      date: "2024-08-12",
    };
    expect(() => FeedItemSchema.parse(item)).not.toThrow();
  });

  it("rejects feed item with bad area", () => {
    expect(() =>
      FeedItemSchema.parse({
        id: "x", title: "x", format: "article", area: "not-a-real-area", href: "x", date: "2024-08-12",
      })
    ).toThrow();
  });

  it("validates a field note", () => {
    const note = {
      slug: "2025-11-konbini-light",
      title: "便利店收银台后面的灯光",
      area: "japan",
      date: "2025-11-04",
    };
    expect(() => FieldNoteSchema.parse(note)).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test, verify failure**

```bash
npm test src/lib/schemas.test.ts
# Expected: errors — schemas module does not exist
```

- [ ] **Step 3: Write `schemas.ts`**

```typescript
import { z } from "zod";

export const AREA_SLUGS = ["japan", "marketing", "design", "field-notes", "media"] as const;
export const FORMAT_VALUES = ["article", "video", "podcast", "note", "source"] as const;

export const AreaSlugSchema = z.enum(AREA_SLUGS);
export const FormatSchema = z.enum(FORMAT_VALUES);

export const CaseSchema = z.object({
  slug: z.string().min(1),
  brand: z.string().min(1),
  sector: z.string().min(1),
  year: z.number().int().gte(2000).lte(2100),
  thinkingQuote: z.string().min(1),
  heroBrandColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  heroBrandColorEnd: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});
export type Case = z.infer<typeof CaseSchema>;

export const FeedItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  format: FormatSchema,
  area: AreaSlugSchema,
  href: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().optional(),
  image: z.string().optional(),
});
export type FeedItem = z.infer<typeof FeedItemSchema>;

export const FieldNoteSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  area: AreaSlugSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.string().optional(),
});
export type FieldNote = z.infer<typeof FieldNoteSchema>;

export const PrincipleSchema = z.object({
  number: z.string(),                    // "P / 01"
  headline: z.string(),                  // English one-liner
  explanation: z.string(),               // Chinese one-liner
});
export type Principle = z.infer<typeof PrincipleSchema>;

export const DomainSchema = z.object({
  slug: AreaSlugSchema,
  name: z.string(),
  shortLabel: z.string(),
  manifesto: z.string().min(50),         // 200-300 word manifesto goes here
});
export type Domain = z.infer<typeof DomainSchema>;
```

- [ ] **Step 4: Run test, verify pass**

```bash
npm test src/lib/schemas.test.ts
# Expected: 5 passed
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/schemas.ts src/lib/schemas.test.ts
git commit -m "feat(lib): Zod schemas for case, feed item, field note, domain"
```

---

### Task 18: Extract `data/site.ts` and `data/principles.ts` and `data/domains.ts`

**Files:**
- Create: `src/data/site.ts`, `src/data/principles.ts`, `src/data/domains.ts`

These files are migrated out of the monolithic `src/data/site-content.ts`.

- [ ] **Step 1: Create `data/site.ts`**

```typescript
export const pageLinks = [
  { key: "home", href: "/", label: "Home" },
  { key: "proof", href: "/proof-of-work", label: "Proof" },
  { key: "feed", href: "/thinking-feed", label: "Feed" },
  { key: "playground", href: "/playground", label: "Playground" },
  { key: "interface", href: "/interface", label: "Interface" },
  { key: "agent", href: "/live-agent", label: "Agent" },
] as const;
```

- [ ] **Step 2: Create `data/principles.ts`**

```typescript
import type { Principle } from "@/lib/schemas";

export const principles: Principle[] = [
  {
    number: "P / 01",
    headline: "I study people through media behavior.",
    explanation: "不先写观点再找证据，先看用户怎么搜、停留、被说服。",
  },
  {
    number: "P / 02",
    headline: "I connect culture to execution.",
    explanation: "日本、设计、美学是会真实影响传播判断的输入源。",
  },
  {
    number: "P / 03",
    headline: "I like systems, not isolated campaigns.",
    explanation: "更关心品牌如何建立长期媒介逻辑，而不是一次爆款。",
  },
  {
    number: "P / 04",
    headline: "I work across strategy and making.",
    explanation: "从框架到 brief，从媒介组合到执行节奏，把链条拉通。",
  },
];
```

- [ ] **Step 3: Create `data/domains.ts` — placeholder manifestos**

The full manifestos are written in Task 32 (Phase 3). For now, write minimal placeholders so the rest of the build doesn't break. Each manifesto must be at least 50 chars to satisfy the schema.

```typescript
import { DomainSchema, type Domain } from "@/lib/schemas";

const raw: Domain[] = [
  {
    slug: "japan",
    name: "Japan",
    shortLabel: "Domain · 01",
    manifesto: "[Manifesto for Japan — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
  {
    slug: "marketing",
    name: "Marketing",
    shortLabel: "Domain · 02",
    manifesto: "[Manifesto for Marketing — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
  {
    slug: "design",
    name: "Design",
    shortLabel: "Domain · 03",
    manifesto: "[Manifesto for Design — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
  {
    slug: "field-notes",
    name: "Field Notes",
    shortLabel: "Domain · 04",
    manifesto: "[Manifesto for Field Notes — written in Phase 3 Task 32. This placeholder satisfies the 50-char minimum.]",
  },
];

export const domains: Domain[] = raw.map((d) => DomainSchema.parse(d));
```

- [ ] **Step 4: Verify build**

```bash
npm run build
# Expected: succeeds
```

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/data/principles.ts src/data/domains.ts
git commit -m "feat(data): extract site, principles, domains modules"
```

---

**Phase 1 checkpoint:** Visit `/styleguide`. Every primitive renders. Every type sample matches the wireframe `visual-system.html`. Build passes. All schemas validated.

---

## Phase 2: Homepage

### Task 19: Build CaseCard component

**Files:**
- Create: `src/components/cards/case-card.tsx`

- [ ] **Step 1: Write `case-card.tsx`**

Reference: wireframe `homepage-wireframe-v2.html`, the 4 case cards in PoW section. Card has 16:10 hero block, meta row, title, italic warm-rule thinking quote, "Read full case →" link. NO bullet list of metrics.

```typescript
import Link from "next/link";
import type { Case } from "@/lib/schemas";

type CaseCardProps = {
  c: Case;
  index: number;
};

export function CaseCard({ c, index }: CaseCardProps) {
  const heroBg = c.heroBrandColorEnd
    ? `linear-gradient(135deg, ${c.heroBrandColor}, ${c.heroBrandColorEnd})`
    : c.heroBrandColor;

  return (
    <article
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        aria-hidden
        style={{
          aspectRatio: "16 / 10",
          background: heroBg,
          display: "grid",
          placeItems: "center",
          color: "rgba(255,255,255,0.85)",
          fontFamily: "var(--font-serif)",
          fontSize: "32px",
          fontWeight: 500,
        }}
      >
        {c.brand}
      </div>
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <span className="eyebrow">{`Case ${String(index + 1).padStart(2, "0")} · ${c.sector} · ${c.year}`}</span>
          <span className="eyebrow">{c.brand}</span>
        </div>
        <h3 className="h-display-m" style={{ marginBottom: "14px" }}>{c.brand}</h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "var(--t-body-l)",
            lineHeight: 1.5,
            borderLeft: "2px solid var(--warm)",
            paddingLeft: "14px",
            margin: "0 0 14px",
          }}
        >
          &ldquo;{c.thinkingQuote}&rdquo;
        </p>
        <Link
          href={`/proof-of-work/${c.slug}`}
          className="eyebrow"
          style={{
            marginTop: "auto",
            paddingTop: "14px",
            borderTop: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        >
          Read full case →
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cards/case-card.tsx
git commit -m "feat(cards): CaseCard with thinking-quote pull style (no metrics)"
```

---

### Task 20: Create case data placeholders

**Files:**
- Create: `src/data/cases/index.ts`
- Create: `src/data/cases/range-rover-flagship.mdx`, `nintendo-cny-2022.mdx`, `bicester-village-2022.mdx`, `puma-launch.mdx`

Cases need TS metadata for the homepage cards AND MDX files for the `[slug]` pages. We create both. MDX bodies are placeholders here; written in Phase 4 Tasks 35-38.

- [ ] **Step 1: Create `data/cases/index.ts` with all 4 cases**

```typescript
import { CaseSchema, type Case } from "@/lib/schemas";

const raw: Case[] = [
  {
    slug: "range-rover-flagship",
    brand: "Range Rover",
    sector: "Auto",
    year: 2023,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — Range Rover.]",
    heroBrandColor: "#2a4858",
    heroBrandColorEnd: "#1a2e38",
  },
  {
    slug: "nintendo-cny-2022",
    brand: "Nintendo",
    sector: "Gaming",
    year: 2022,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — Nintendo.]",
    heroBrandColor: "#c41e3a",
    heroBrandColorEnd: "#8b1428",
  },
  {
    slug: "bicester-village-2022",
    brand: "Bicester Village",
    sector: "Retail",
    year: 2022,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — Bicester.]",
    heroBrandColor: "#d4a574",
    heroBrandColorEnd: "#a08560",
  },
  {
    slug: "puma-launch",
    brand: "PUMA",
    sector: "Apparel",
    year: 2021,
    thinkingQuote: "[Thinking quote written in Phase 3 Task 34 — PUMA.]",
    heroBrandColor: "#1f6b63",
    heroBrandColorEnd: "#145954",
  },
];

export const cases: Case[] = raw.map((c) => CaseSchema.parse(c));
```

- [ ] **Step 2: Create 4 MDX placeholder files**

Each MDX file at `src/data/cases/<slug>.mdx`:

```mdx
---
title: "[Case title — written in Phase 4]"
slug: "range-rover-flagship"
brand: "Range Rover"
year: 2023
---

## Context

[Written in Phase 4]

## Challenge

[Written in Phase 4]

## Strategy

[Written in Phase 4]

## Execution

[Written in Phase 4]

## Result

[Written in Phase 4]

## Reflection

[Written in Phase 4 — this section is the differentiator]
```

(Repeat for each slug, updating the frontmatter `slug` and `brand`.)

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
# Expected: build succeeds (MDX files compile but aren't rendered yet)
```

- [ ] **Step 4: Commit**

```bash
git add src/data/cases/
git commit -m "feat(data): scaffold 4 case files with placeholder MDX"
```

---

### Task 21: Build HeroBlock section

**Files:**
- Create: `src/components/sections/hero-block.tsx`

- [ ] **Step 1: Write `hero-block.tsx`**

Reference: wireframe `homepage-wireframe-v2.html` Hero section. 7-5 grid, no signal bar after hero.

```typescript
import Image from "next/image";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Pill } from "@/components/primitives/pill";

type HeroBlockProps = {
  eyebrow: string;
  headlineParts: { lead: string; emphasis: string; tail?: string }; // e.g. lead="把文化读成", emphasis="信号", tail=""
  subline: string;
  lede: string;
  ctas: Array<{ href: string; label: string; solid?: boolean }>;
  portraitSrc: string;
  portraitAlt: string;
};

export function HeroBlock(props: HeroBlockProps) {
  return (
    <section className="section" style={{ paddingBottom: "36px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "36px", alignItems: "end" }}>
        <div>
          <Eyebrow>{props.eyebrow}</Eyebrow>
          <h1 className="h-display-xl" style={{ marginTop: "14px" }}>
            {props.headlineParts.lead}
            <em style={{ fontStyle: "italic", color: "var(--warm)" }}>{props.headlineParts.emphasis}</em>
            {props.headlineParts.tail ?? ""}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--t-body-l)",
              fontStyle: "italic",
              color: "var(--warm-dark)",
              marginTop: "8px",
            }}
          >
            {props.subline}
          </p>
          <p className="body-l measure" style={{ marginTop: "22px" }}>{props.lede}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" }}>
            {props.ctas.map((c) => (
              <Pill key={c.href} href={c.href} variant={c.solid ? "solid" : "default"}>{c.label}</Pill>
            ))}
          </div>
        </div>
        <div
          style={{
            aspectRatio: "4 / 5",
            border: "1px solid var(--line)",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={props.portraitSrc}
            alt={props.portraitAlt}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/hero-block.tsx
git commit -m "feat(sections): HeroBlock — 7-5 grid, no signal bar"
```

---

### Task 22: Build OperatingSystemBlock section

**Files:**
- Create: `src/components/sections/operating-system-block.tsx`

- [ ] **Step 1: Write `operating-system-block.tsx`**

```typescript
import Link from "next/link";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PullQuote } from "@/components/primitives/pull-quote";
import type { Principle, Domain } from "@/lib/schemas";

type OSBlockProps = {
  principles: Principle[];
  domains: Domain[];
  pullQuote: string;
};

export function OperatingSystemBlock({ principles, domains, pullQuote }: OSBlockProps) {
  return (
    <section className="section">
      <SectionNumberBar number="01" label="My Operating System" trailing="How I observe, decide, execute" />
      <h2 className="h-display-l" style={{ maxWidth: "22ch", marginBottom: "18px" }}>
        长期关注的，真正擅长的，持续输出的。
      </h2>
      <p className="body-l measure">
        日本、营销、设计、Field Notes —— 这四条线不是独立爱好，而是互相渗透的认知系统。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginTop: "28px" }}>
        {principles.map((p) => (
          <div key={p.number} style={{ padding: "18px 0", borderTop: "1px solid var(--line)" }}>
            <span className="eyebrow" style={{ color: "var(--warm)" }}>{p.number}</span>
            <h3 className="h-3" style={{ margin: "8px 0" }}>{p.headline}</h3>
            <p className="caption">{p.explanation}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "28px" }}>
        {domains.map((d) => (
          <Link
            key={d.slug}
            href={`/areas/${d.slug}`}
            style={{
              padding: "14px 16px",
              border: "1px solid var(--line)",
              borderRadius: "6px",
              background: "var(--paper)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span className="eyebrow">{d.shortLabel}</span>
              <h4 className="h-display-m" style={{ fontSize: "18px", marginTop: "4px" }}>{d.name}</h4>
            </div>
            <span className="eyebrow">→</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "36px" }}>
        <PullQuote>{pullQuote}</PullQuote>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/operating-system-block.tsx
git commit -m "feat(sections): OperatingSystemBlock — principles + domains + pull quote"
```

---

### Task 23: Build ProofOfWorkBlock section (homepage)

**Files:**
- Create: `src/components/sections/proof-of-work-block.tsx`

- [ ] **Step 1: Write `proof-of-work-block.tsx`**

This is the homepage version. NO metric grid. Heading is "我做过的事，我学到的事。"

```typescript
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { DownloadButton } from "@/components/primitives/download-button";
import { CaseCard } from "@/components/cards/case-card";
import type { Case } from "@/lib/schemas";

type Job = { when: string; role: string; who: string };

type PoWBlockProps = {
  cases: Case[];
  timeline: Job[];
};

export function ProofOfWorkBlock({ cases, timeline }: PoWBlockProps) {
  return (
    <section className="section">
      <SectionNumberBar number="02" label="Proof of Work" trailing="Cases & career" />
      <h2 className="h-display-l" style={{ maxWidth: "18ch", marginBottom: "20px" }}>
        我做过的事，<br />我学到的事。
      </h2>
      <p className="body-l measure" style={{ marginBottom: "8px" }}>
        7 年代理商，从汽车到游戏到奥莱到 FMCG。下面是几个有代表性的项目，以及它们教会我的判断。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "28px" }}>
        {cases.map((c, i) => <CaseCard key={c.slug} c={c} index={i} />)}
      </div>

      <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--line)" }}>
        {timeline.map((j) => (
          <div key={j.when} style={{ padding: "18px 14px", borderRight: "1px solid var(--line)" }}>
            <span className="eyebrow">{j.when}</span>
            <h4 className="h-display-m" style={{ fontSize: "17px", margin: "6px 0 4px" }}>{j.role}</h4>
            <span className="caption">{j.who}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <DownloadButton href="/cv/jeremy-ji-cv-en.pdf">↓ Download CV · EN</DownloadButton>
        <DownloadButton href="/cv/jeremy-ji-cv-cn.pdf" variant="ghost">↓ CV · 中文</DownloadButton>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/proof-of-work-block.tsx
git commit -m "feat(sections): ProofOfWorkBlock — cases + timeline + CV (no metric grid)"
```

---

### Task 24: Build FeedCard component

**Files:**
- Create: `src/components/cards/feed-card.tsx`

- [ ] **Step 1: Write `feed-card.tsx`**

```typescript
import Image from "next/image";
import type { FeedItem } from "@/lib/schemas";

type FeedCardProps = {
  item: FeedItem;
};

const FORMAT_LABEL: Record<FeedItem["format"], string> = {
  article: "Article",
  video: "Video",
  podcast: "Podcast",
  note: "Field Note",
  source: "Source",
};

const FORMAT_ACCENT: Record<FeedItem["format"], string> = {
  article: "linear-gradient(135deg, #b8a584, #8b7757)",
  video:   "linear-gradient(135deg, #c66336, #8b3c1d)",
  podcast: "linear-gradient(135deg, #1f6b63, #145954)",
  note:    "var(--paper-2)",
  source:  "var(--paper-2)",
};

export function FeedCard({ item }: FeedCardProps) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "block",
        color: "var(--ink)",
      }}
    >
      <div style={{ aspectRatio: "4 / 3", background: FORMAT_ACCENT[item.format], position: "relative" }}>
        {item.image ? <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} /> : null}
        {item.format === "video" ? (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} aria-hidden />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "white", fontSize: "32px", opacity: 0.95 }} aria-hidden>▶</div>
          </>
        ) : null}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <span className="eyebrow">{FORMAT_LABEL[item.format]} · {item.area}</span>
        <h4 className="h-3" style={{ fontSize: "16px", margin: "6px 0 8px", lineHeight: 1.3, fontWeight: 500, fontFamily: "var(--font-serif)" }}>
          {item.title}
        </h4>
        {item.summary ? <p className="caption">{item.summary}</p> : null}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cards/feed-card.tsx
git commit -m "feat(cards): FeedCard with 5 format variants"
```

---

### Task 25: Build feed library — aggregation + filter

**Files:**
- Create: `src/lib/feed.ts`, `src/lib/feed.test.ts`

- [ ] **Step 1: Write `feed.test.ts` first**

```typescript
import { describe, it, expect } from "vitest";
import { filterByArea, sortByDateDesc } from "./feed";
import type { FeedItem } from "./schemas";

const items: FeedItem[] = [
  { id: "1", title: "A", format: "article", area: "japan",     href: "x", date: "2024-08-01" },
  { id: "2", title: "B", format: "video",   area: "marketing", href: "x", date: "2025-01-15" },
  { id: "3", title: "C", format: "podcast", area: "japan",     href: "x", date: "2025-03-20" },
  { id: "4", title: "D", format: "article", area: "design",    href: "x", date: "2024-11-30" },
];

describe("feed", () => {
  it("filterByArea returns all items when area is 'all'", () => {
    expect(filterByArea(items, "all")).toHaveLength(4);
  });

  it("filterByArea returns only matching area", () => {
    expect(filterByArea(items, "japan")).toHaveLength(2);
  });

  it("sortByDateDesc puts newest first", () => {
    const sorted = sortByDateDesc(items);
    expect(sorted[0].date).toBe("2025-03-20");
    expect(sorted[3].date).toBe("2024-08-01");
  });

  it("sortByDateDesc does not mutate the input", () => {
    const before = [...items];
    sortByDateDesc(items);
    expect(items).toEqual(before);
  });
});
```

- [ ] **Step 2: Run test, verify failure**

```bash
npm test src/lib/feed.test.ts
# Expected: errors — feed module does not exist
```

- [ ] **Step 3: Write `feed.ts`**

```typescript
import type { FeedItem } from "./schemas";
import type { AREA_SLUGS } from "./schemas";

export type AreaFilter = (typeof AREA_SLUGS)[number] | "all";

export function filterByArea(items: FeedItem[], area: AreaFilter): FeedItem[] {
  if (area === "all") return items;
  return items.filter((i) => i.area === area);
}

export function sortByDateDesc(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
```

- [ ] **Step 4: Run test, verify pass**

```bash
npm test src/lib/feed.test.ts
# Expected: 4 passed
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/feed.ts src/lib/feed.test.ts
git commit -m "feat(lib): feed filter/sort with TDD"
```

---

### Task 26: Migrate articles.json with tags

**Files:**
- Modify: `src/data/feed/articles.json`
- Create: `src/data/feed/videos.ts`, `src/data/feed/podcasts.ts`

The existing `src/data/articles.json` has 30+ items. Move it to `src/data/feed/articles.json` and add an `area` field to each item (one of `japan`, `marketing`, `design`, `field-notes`, `media`). For Phase 2, we tag a representative subset of 8-12 items (the rest happens in Phase 4 Task 47). Videos and podcasts are extracted from existing `site-content.ts` data.

- [ ] **Step 1: Move articles.json**

```bash
mkdir -p src/data/feed
git mv src/data/articles.json src/data/feed/articles.json
```

- [ ] **Step 2: Add `area` and `format` field to first 8-12 items**

Open `src/data/feed/articles.json`. For the first 8-12 items, add `"area": "japan" | "marketing" | "design" | "field-notes" | "media"` and `"format": "article"`. Use editorial judgment per item title.

- [ ] **Step 3: Create `videos.ts`**

```typescript
import { FeedItemSchema, type FeedItem } from "@/lib/schemas";

const raw: FeedItem[] = [
  { id: "bili-001", title: "如何用日文说我爱你", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV1at411k71b", date: "2020-05-12", image: "/video-love-you.jpg", summary: "Jeremy 的日语教室" },
  { id: "bili-002", title: "在东京用得上的日语词", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV18t411B7Bm", date: "2020-06-04", image: "/video-tokyo-words.jpg" },
  { id: "bili-003", title: "职场日语指南", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV11t411T74H", date: "2020-07-15", image: "/video-office-japanese.jpg" },
  { id: "bili-004", title: "日语中骂人的话", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV1Ab411z7Bd", date: "2020-08-22", image: "/video-swearing.jpg" },
  { id: "bili-005", title: "鲨鱼和自我陶醉", format: "video", area: "japan", href: "https://www.bilibili.com/video/BV1ht41187PD", date: "2020-09-30", image: "/video-shark-story.jpg" },
];

export const videos: FeedItem[] = raw.map((v) => FeedItemSchema.parse(v));
```

- [ ] **Step 4: Create `podcasts.ts` placeholder**

```typescript
import { FeedItemSchema, type FeedItem } from "@/lib/schemas";

// Podcast episodes — replace with actual episode metadata once available.
const raw: FeedItem[] = [];

export const podcasts: FeedItem[] = raw.map((p) => FeedItemSchema.parse(p));
```

- [ ] **Step 5: Verify build**

```bash
npm run build
# Expected: build succeeds — schemas validate at module load
```

- [ ] **Step 6: Commit**

```bash
git add src/data/feed/
git commit -m "data(feed): move articles.json + tag subset, add videos.ts/podcasts.ts"
```

---

### Task 27: Build ThinkingFeedTeaser section

**Files:**
- Create: `src/components/sections/thinking-feed-teaser.tsx`

- [ ] **Step 1: Write `thinking-feed-teaser.tsx`**

```typescript
import Link from "next/link";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { Tag } from "@/components/primitives/tag";
import { FeedCard } from "@/components/cards/feed-card";
import type { FeedItem } from "@/lib/schemas";

type ThinkingFeedTeaserProps = {
  items: FeedItem[];  // 4 items, one per format (article/video/podcast/note)
};

const TAG_LABELS = ["All", "Japan", "Marketing", "Design", "Field Notes", "Media"];

export function ThinkingFeedTeaser({ items }: ThinkingFeedTeaserProps) {
  return (
    <section className="section">
      <SectionNumberBar number="03" label="Thinking Feed" trailing="Articles · Videos · Podcasts · Field Notes" />
      <h2 className="h-display-l" style={{ maxWidth: "24ch", marginBottom: "14px" }}>
        文章、视频、播客、笔记 ——<br />不分开过日子。
      </h2>
      <p className="body-l measure" style={{ marginBottom: "24px" }}>一个混合 feed。tag 切，不按格式切。</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
        {TAG_LABELS.map((t, i) => <Tag key={t} active={i === 0}>{t}</Tag>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        {items.slice(0, 4).map((item) => <FeedCard key={item.id} item={item} />)}
      </div>

      <div style={{ marginTop: "22px" }}>
        <Link href="/thinking-feed" className="eyebrow">Open Feed Page →</Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/thinking-feed-teaser.tsx
git commit -m "feat(sections): ThinkingFeedTeaser with mixed-format card row"
```

---

### Task 28: Build PlayCard component and PlaygroundTeaser section

**Files:**
- Create: `src/components/cards/play-card.tsx`, `src/components/sections/playground-teaser.tsx`

- [ ] **Step 1: Write `play-card.tsx`**

```typescript
import Link from "next/link";

type PlayCardProps = {
  index: number;
  slug: string;          // links to /playground/<slug>
  title: string;
  description: string;
  sampleInput: string;
  sampleOutput: string;
};

export function PlayCard(p: PlayCardProps) {
  return (
    <article style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px 26px" }}>
      <span className="eyebrow" style={{ color: "var(--warm)" }}>DEMO / {String(p.index).padStart(2, "0")}</span>
      <h3 className="h-display-m" style={{ margin: "10px 0 12px", fontSize: "26px" }}>{p.title}</h3>
      <p className="body" style={{ marginBottom: "14px" }}>{p.description}</p>
      <div style={{
        background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "6px",
        padding: "14px", fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: 1.6, color: "var(--muted)",
      }}>
        <strong style={{ color: "var(--ink)" }}>Sample input:</strong> {p.sampleInput}<br />
        <strong style={{ color: "var(--ink)" }}>Output:</strong> {p.sampleOutput}
      </div>
      <Link href={`/playground/${p.slug}`} className="eyebrow" style={{ display: "inline-block", marginTop: "14px" }}>
        Try this demo →
      </Link>
    </article>
  );
}
```

- [ ] **Step 2: Write `playground-teaser.tsx`**

```typescript
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PlayCard } from "@/components/cards/play-card";

export function PlaygroundTeaser() {
  return (
    <section className="section">
      <SectionNumberBar number="04" label="Playground" trailing="Capability demos" />
      <h2 className="h-display-l" style={{ maxWidth: "22ch", marginBottom: "14px" }}>
        不是作品集 ——<br />是思维方式的演示区。
      </h2>
      <p className="body-l measure" style={{ marginBottom: "24px" }}>每个模块对应我实际工作中的拆解动作。</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <PlayCard
          index={1}
          slug="campaign-teardown"
          title="Campaign Teardown"
          description="给我一个最近上市的品牌，我把它的传播打法拆开给你看：媒介组合、内容路径、漏斗判断，哪里行哪里不行。"
          sampleInput="喜茶 × FENDI 联名"
          sampleOutput="6 段诊断 · 3 个不足 · 2 条改进建议"
        />
        <PlayCard
          index={2}
          slug="audience-mapper"
          title="Audience Mapper"
          description="一个品类 → 一张受众分层逻辑图。展示我做 segmentation 的实际推理路径，不是 PPT 里的圈层图。"
          sampleInput="30+ 女性身体护理"
          sampleOutput="4 层人群 · 各自痛点 · 媒介触点"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/cards/play-card.tsx src/components/sections/playground-teaser.tsx
git commit -m "feat(sections): PlaygroundTeaser with 2 PlayCards"
```

---

### Task 29: Build TrackCard and InterfaceBlock section

**Files:**
- Create: `src/components/cards/track-card.tsx`, `src/components/sections/interface-block.tsx`
- Create: `src/data/interface.ts`

- [ ] **Step 1: Create `data/interface.ts` with placeholder content**

The full content is written in Phase 3 Task 33. For now, scaffold:

```typescript
export type CollabTrack = { title: string; summary: string; goodFor: string[] };
export type Endpoint = { label: string; value: string; href: string };

export const protocolLine = "[Protocol line — written in Phase 3 Task 35.]";

export const tracks: CollabTrack[] = [
  { title: "Media Strategy Consult", summary: "媒介策略诊断 / 渠道与组合判断 / KPI 复盘", goodFor: ["[in Phase 3 Task 35]"] },
  { title: "Brief Refinement",       summary: "把模糊的业务诉求变成可执行 brief",          goodFor: ["[in Phase 3 Task 35]"] },
  { title: "Speaking · Partnership", summary: "分享 / 工作坊 / 内容合作",                    goodFor: ["[in Phase 3 Task 35]"] },
];

export const endpoints: Endpoint[] = [
  { label: "Email",    value: "[in Phase 3 Task 35]", href: "mailto:hello@example.com" },
  { label: "LinkedIn", value: "/in/jeremyji", href: "https://www.linkedin.com/in/jeremyji" },
  { label: "WeChat",   value: "by intro only", href: "#" },
  { label: "Telegram", value: "@jeremyjee",   href: "https://t.me/jeremyjee" },
];
```

- [ ] **Step 2: Write `track-card.tsx`**

```typescript
import type { CollabTrack } from "@/data/interface";

export function TrackCard({ track }: { track: CollabTrack }) {
  return (
    <article style={{ padding: "16px", border: "1px solid var(--line)", borderRadius: "6px", background: "var(--paper)" }}>
      <h4 className="h-3" style={{ fontSize: "14px", marginBottom: "6px" }}>{track.title}</h4>
      <p className="caption" style={{ margin: 0 }}>{track.summary}</p>
    </article>
  );
}
```

- [ ] **Step 3: Write `interface-block.tsx`**

```typescript
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { TrackCard } from "@/components/cards/track-card";
import { tracks, endpoints, protocolLine } from "@/data/interface";

export function InterfaceBlock() {
  return (
    <section className="section">
      <SectionNumberBar number="05" label="Interface" trailing="How to work with me" />
      <h2 className="h-display-l" style={{ maxWidth: "20ch", marginBottom: "14px" }}>
        联系我，<br />不如说是调用我。
      </h2>
      <p style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "19px",
        lineHeight: 1.5, maxWidth: "60ch", margin: "0 0 22px",
      }}>{protocolLine}</p>

      <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: "22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {tracks.map((t) => <TrackCard key={t.title} track={t} />)}
        </div>
        <aside style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "10px", padding: "22px 24px" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Endpoints</span>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
            {endpoints.map((e, i) => (
              <li key={e.label} style={{
                padding: "10px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.15)",
                display: "flex", justifyContent: "space-between",
              }}>
                <a href={e.href} style={{ color: "var(--paper)" }}>{e.label}</a>
                <span style={{ opacity: 0.6 }}>{e.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/cards/track-card.tsx src/components/sections/interface-block.tsx src/data/interface.ts
git commit -m "feat(sections): InterfaceBlock with tracks + endpoints panel"
```

---

### Task 30: Build LiveAgentBlock section

**Files:**
- Create: `src/components/sections/live-agent-block.tsx`
- Create: `src/data/live-agent.ts`

- [ ] **Step 1: Create `data/live-agent.ts` with placeholder prompts and answers**

Full prompts and answers written in Phase 3 Task 34. Scaffold 5 prompts now:

```typescript
export type AgentPrompt = {
  question: string;
  answer: string;  // 200-400 words, written in Phase 3
};

export const prompts: AgentPrompt[] = [
  { question: "他怎么思考一个新品牌的传播 brief？", answer: "[Answer written in Phase 3 Task 36.]" },
  { question: "哪个项目最像我现在要解决的问题？",   answer: "[Answer written in Phase 3 Task 36.]" },
  { question: "他在日本研究里最受触动的三件事是什么？", answer: "[Answer written in Phase 3 Task 36.]" },
  { question: "他做媒介组合的时候第一个砍的是什么？", answer: "[Answer written in Phase 3 Task 36.]" },
  { question: "他把 case study 里的 reflection 写成什么样？", answer: "[Answer written in Phase 3 Task 36.]" },
];
```

- [ ] **Step 2: Write `live-agent-block.tsx`**

```typescript
import Link from "next/link";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { prompts } from "@/data/live-agent";

export function LiveAgentBlock() {
  // Homepage shows 4 of 5 prompts as a teaser; full set lives on /live-agent.
  const homepagePrompts = prompts.slice(0, 4);

  return (
    <section className="section">
      <SectionNumberBar number="06" label="Live Agent" trailing="A version of Jeremy you can query · v0 static" />
      <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "12px", padding: "32px 36px" }}>
        <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>$ ask jeremy</span>
        <h3 className="h-display-m" style={{ margin: "12px 0 22px", color: "var(--paper)" }}>
          一个读过我所有内容的 AI 分身。
        </h3>
        <p style={{ opacity: 0.75, margin: "0 0 22px", fontSize: "14px", lineHeight: 1.6, maxWidth: "60ch" }}>
          建立在我的文章、案例、方法论之上。问它关于我的项目、内容、工作方式的任何问题。
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {homepagePrompts.map((p) => (
            <li key={p.question} style={{
              padding: "14px 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "17px",
              display: "flex", alignItems: "baseline", gap: "14px",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", color: "var(--warm)", fontSize: "14px" }}>?</span>
              {p.question}
            </li>
          ))}
        </ul>
        <Link href="/live-agent" style={{
          display: "inline-block", marginTop: "22px",
          padding: "10px 16px", borderRadius: "6px",
          border: "1px solid var(--paper)", color: "var(--paper)",
          fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
        }}>
          Open Live Agent →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/live-agent-block.tsx src/data/live-agent.ts
git commit -m "feat(sections): LiveAgentBlock — solid-ink terminal block, 4 teaser prompts"
```

---

### Task 31: Refactor `app/page.tsx` to compose sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
import { SiteShell } from "@/components/site-shell";
import { HeroBlock } from "@/components/sections/hero-block";
import { OperatingSystemBlock } from "@/components/sections/operating-system-block";
import { ProofOfWorkBlock } from "@/components/sections/proof-of-work-block";
import { ThinkingFeedTeaser } from "@/components/sections/thinking-feed-teaser";
import { PlaygroundTeaser } from "@/components/sections/playground-teaser";
import { InterfaceBlock } from "@/components/sections/interface-block";
import { LiveAgentBlock } from "@/components/sections/live-agent-block";
import { principles } from "@/data/principles";
import { domains } from "@/data/domains";
import { cases } from "@/data/cases";
import { videos } from "@/data/feed/videos";

const TIMELINE = [
  { when: "2023.12 — 2024.04", role: "Sr. Media Planning Mgr", who: "OMG · Hearts & Science" },
  { when: "2021.09 — 2023.09", role: "Planning Manager",       who: "EssenceMediacom" },
  { when: "2021.03 — 2021.09", role: "Planning Manager",       who: "Havas" },
  { when: "2019.10 — 2021.03", role: "Asst. Planning Mgr",     who: "Dentsu Aegis" },
];

const HERO_PULL = "I don't write about Japan as a hobby — I read Japan as a market signal.";

export default function Home() {
  // 4 mixed-format items for ThinkingFeedTeaser. In Phase 4 this becomes a real curated set.
  const teaserFeed = videos.slice(0, 4);

  return (
    <SiteShell current="home">
      <HeroBlock
        eyebrow="Shanghai · Media Strategy · Japan · Design · AI Workflows"
        headlineParts={{ lead: "把文化读成", emphasis: "信号", tail: "，写成战役。" }}
        subline="Reading culture as signal — writing it into campaigns."
        lede="媒介策略师 · 日本文化观察者 · 内容创作者。7 年代理商策略经验，加一个一直在跑的 personal research engine —— 日本、平台、消费、AI 工作流。"
        ctas={[
          { href: "/proof-of-work", label: "Proof of Work", solid: true },
          { href: "/thinking-feed", label: "Thinking Feed" },
          { href: "/live-agent",    label: "Talk to Live Agent" },
        ]}
        portraitSrc="/jeremy-portrait.jpg"
        portraitAlt="Jeremy Ji"
      />

      <OperatingSystemBlock principles={principles} domains={domains} pullQuote={HERO_PULL} />
      <ProofOfWorkBlock cases={cases} timeline={TIMELINE} />
      <ThinkingFeedTeaser items={teaserFeed} />
      <PlaygroundTeaser />
      <InterfaceBlock />
      <LiveAgentBlock />
    </SiteShell>
  );
}
```

- [ ] **Step 2: Build and visit homepage**

```bash
npm run build
npm run dev
# Visit http://localhost:3000
# Compare against .superpowers/brainstorm/59252-1777880011/content/homepage-wireframe-v2.html
```

The homepage should now render in full Editorial Warm v2. Some items (manifestos, case thinking quotes, protocol line, agent answers) still show placeholder text — those are filled in Phase 3.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): rewrite homepage to compose 7 section components"
```

---

**Phase 2 checkpoint:** Visit `/`. Homepage matches v2 wireframe. No metric grid, no signal bar, no portal grid, no page-glow gradients, no gold accent. Build and lint pass.

---

## Phase 3: Copywriting

Phase 3 tasks fill in the placeholder strings from Phase 1-2. They are content tasks, not code tasks. Each is "edit a TS or MDX file → save → commit".

### Task 32: Write 4 area manifestos

**Files:**
- Modify: `src/data/domains.ts`

Each manifesto is 200-300 words. Per the spec, they describe "what this thread means in Jeremy's thinking."

- [ ] **Step 1: Replace each placeholder manifesto in `src/data/domains.ts` with 200-300 word prose. Headers as guidance only — write in Jeremy's voice.**

```
Japan        — Why Jeremy reads Japan as a market signal, not a hobby.
                Touchpoints: media-platform behavior, retail/consumer
                culture, language, design lineage. Tone: curious, sharp,
                not romantic.

Marketing    — Marketing as consumer-behavior research, not advertising.
                Touchpoints: brief framing, audience truth, channel-fit
                judgment, measurement realism. Tone: skeptical of agency
                shorthand.

Design       — Design as the visualization of judgment. Touchpoints:
                editorial design, photography as observation, Japanese
                design lineage as input, taste as decision discipline.

Field Notes  — The place for raw observations that are too short for an
                article and too specific for a tweet. Touchpoints: lived
                detail, on-the-ground signals, fragments to be combined
                later.
```

Reminder: avoid "不是 ... 而是 ..." sentence pattern per user memory. Each manifesto should read as one continuous thought, not a definition.

- [ ] **Step 2: Verify Zod parse still passes**

```bash
npm run build
# Expected: build succeeds (each manifesto > 50 chars)
```

- [ ] **Step 3: Commit**

```bash
git add src/data/domains.ts
git commit -m "copy: 4 area manifestos for Japan / Marketing / Design / Field Notes"
```

---

### Task 33: Write Hero copy (final pass)

**Files:**
- Modify: `src/app/page.tsx`

The Phase 2 hero is already final-quality drafts. This task is a polish pass — read aloud, tighten where awkward, ensure no AI patterns ("不是 ... 而是 ..." or its variants).

- [ ] **Step 1: Re-read hero `eyebrow`, `headlineParts`, `subline`, `lede` in `app/page.tsx`. Polish as needed.**

- [ ] **Step 2: Confirm CTAs are right** — three pills: Proof of Work (solid), Thinking Feed, Talk to Live Agent. Adjust if this composition has changed.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "copy(hero): final polish on hero strings"
```

---

### Task 34: Write 4 case "thinking quotes"

**Files:**
- Modify: `src/data/cases/index.ts`

Each `thinkingQuote` is one sentence (40-80 chars) describing the strategic judgment Jeremy made on that case. Italic Playfair, displayed with warm-orange left rule.

- [ ] **Step 1: Replace each `thinkingQuote` placeholder. Style guide:**

```
Range Rover  — about luxury SUV positioning vs mass-market spec comparisons
Nintendo     — about timing, family-context, and CNY narrative discipline
Bicester     — about local + outlet + one-shot decision behavior synthesis
PUMA         — about content direction over channel weight in saturated apparel
```

- [ ] **Step 2: Verify schema still passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/data/cases/index.ts
git commit -m "copy: 4 case thinking quotes (homepage card display)"
```

---

### Task 35: Write Interface protocol line, FAQ, brief template

**Files:**
- Modify: `src/data/interface.ts`

- [ ] **Step 1: Update `src/data/interface.ts`**

```typescript
export type CollabTrack = { title: string; summary: string; goodFor: string[]; sendThis: string };
export type Endpoint = { label: string; value: string; href: string };
export type FAQ = { q: string; a: string };

export const protocolLine = "如果你有一个品牌、传播、市场或文化问题需要更锐利的 framing，发给我背景、目标、deadline。";

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
      "要发 RFP，但写出来 agency 都猜不到要什么",
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
  { label: "Email",    value: "hi@jeremyji.dev",       href: "mailto:hi@jeremyji.dev" },  // confirm address with Jeremy
  { label: "LinkedIn", value: "/in/jeremyji",          href: "https://www.linkedin.com/in/jeremyji" },
  { label: "WeChat",   value: "by intro only",         href: "#" },
  { label: "Telegram", value: "@jeremyjee",            href: "https://t.me/jeremyjee" },
];

export const faq: FAQ[] = [
  {
    q: "你接全职 in-house 吗？",
    a: "看公司、看团队、看具体岗位。直接发岗位 JD + 团队结构 + 上一任为什么离开，能省彼此的时间。",
  },
  {
    q: "你做长期顾问吗？",
    a: "做。每月固定时数 + 项目议题。先做 1-2 个 brief refinement 试试合作节奏。",
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
```

- [ ] **Step 2: Confirm Email address with Jeremy** — replace `hi@jeremyji.dev` with the actual address before commit.

- [ ] **Step 3: Commit**

```bash
git add src/data/interface.ts
git commit -m "copy(interface): protocol line, 3 tracks, FAQ, brief template"
```

---

### Task 36: Write 5 Live Agent prompts and pre-baked answers

**Files:**
- Modify: `src/data/live-agent.ts`

Each answer is 200-400 words, written in Jeremy's voice, demonstrating specific capability. Avoid generic AI prose. Avoid "不是 ... 而是 ..." patterns.

- [ ] **Step 1: Replace placeholder answers in `src/data/live-agent.ts`. Voice guide:**

```
Q1 "他怎么思考一个新品牌的传播 brief？"
   → walk through the 3 questions Jeremy asks first
     (who is buying / what platform / what evidence)

Q2 "哪个项目最像我现在要解决的问题？"
   → instructive: "depends — let me ask you 3 things first"
     then map the 4 cases to typical problem shapes

Q3 "他在日本研究里最受触动的三件事是什么？"
   → 3 specific moments with details (konbini, JR ad, retail)

Q4 "他做媒介组合的时候第一个砍的是什么？"
   → his actual first-cut heuristic + a counter-example

Q5 "他把 case study 里的 reflection 写成什么样？"
   → meta-commentary on the format, with one example excerpt
```

- [ ] **Step 2: Commit**

```bash
git add src/data/live-agent.ts
git commit -m "copy(live-agent): 5 prompts + 200-400 word pre-baked answers"
```

---

### Task 37: Final hero portrait

**Files:**
- May modify: `public/jeremy-portrait.jpg`

- [ ] **Step 1: Inspect existing `public/jeremy-portrait.jpg`** — current file is 32 KB, likely small.

```bash
file public/jeremy-portrait.jpg
identify public/jeremy-portrait.jpg 2>/dev/null || sips -g pixelWidth -g pixelHeight public/jeremy-portrait.jpg
```

- [ ] **Step 2: If too small for hero (<1000px tall), source a higher-res original. Crop to 4:5 aspect ratio. Optimize:**

```bash
# example using sips (macOS)
sips -c 2000 1600 source.jpg --out public/jeremy-portrait.jpg
```

- [ ] **Step 3: Commit**

```bash
git add public/jeremy-portrait.jpg
git commit -m "asset: hero portrait at 4:5 ratio for HeroBlock"
```

---

**Phase 3 checkpoint:** Visit `/`. Zero `[in Phase X]` placeholders remain on homepage. All content in Jeremy's voice. Build and lint pass.

---

## Phase 4: Subpage content

### Task 38: Set up MDX content loader

**Files:**
- Create: `src/lib/content.ts`

- [ ] **Step 1: Write `content.ts`**

```typescript
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DATA_ROOT = path.join(process.cwd(), "src", "data");

export type LoadedDoc<TFrontmatter> = {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
};

export function loadMdxDir<TFrontmatter>(rel: string): LoadedDoc<TFrontmatter>[] {
  const dir = path.join(DATA_ROOT, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const parsed = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        frontmatter: parsed.data as TFrontmatter,
        body: parsed.content,
      };
    });
}

export function loadMdxBySlug<TFrontmatter>(rel: string, slug: string): LoadedDoc<TFrontmatter> | null {
  const file = path.join(DATA_ROOT, rel, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return { slug, frontmatter: parsed.data as TFrontmatter, body: parsed.content };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat(lib): MDX content loader with frontmatter"
```

---

### Task 39: Build `/proof-of-work/[slug]` page

**Files:**
- Create: `src/app/proof-of-work/[slug]/page.tsx`

- [ ] **Step 1: Write the route**

```typescript
import { notFound } from "next/navigation";
import { cases } from "@/data/cases";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { Eyebrow } from "@/components/primitives/eyebrow";

type Params = { slug: string };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return notFound();

  // Dynamic import the MDX body
  const Body = (await import(`@/data/cases/${slug}.mdx`)).default;

  return (
    <SiteShell current="proof">
      <article className="section" style={{ paddingTop: "20px" }}>
        <Eyebrow>{`Case · ${c.sector} · ${c.year}`}</Eyebrow>
        <h1 className="h-display-l" style={{ marginTop: "12px" }}>{c.brand}</h1>
        <p style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "var(--t-h3)",
          borderLeft: "3px solid var(--warm)", paddingLeft: "20px", margin: "20px 0",
          maxWidth: "60ch",
        }}>{c.thinkingQuote}</p>
        <SectionNumberBar number="•" label="Full case" />
        <div className="measure">
          <Body />
        </div>
      </article>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
# Expected: build generates /proof-of-work/range-rover-flagship etc.
# Visit http://localhost:3000/proof-of-work/range-rover-flagship
# Should render the placeholder MDX
```

- [ ] **Step 3: Commit**

```bash
git add src/app/proof-of-work/[slug]/page.tsx
git commit -m "feat(routes): /proof-of-work/[slug] SSG with MDX body"
```

---

### Task 40-43: Write 4 case MDX writeups

**Files:**
- Modify: `src/data/cases/range-rover-flagship.mdx`, `nintendo-cny-2022.mdx`, `bicester-village-2022.mdx`, `puma-launch.mdx`

Each writeup is 600-1000 words. Six sections per spec: **Context · Challenge · Strategy · Execution · Result · Reflection**. Reflection is the differentiator — what Jeremy learned that he carries forward.

Numbers MAY appear in body prose (e.g. "predicted CTR uplift came in around 24%, which surprised me less than the geographic spread of where it landed"). They do NOT appear as standalone metric cards.

- [ ] **Step 1: Write `range-rover-flagship.mdx`** — luxury SUV launch, audience-as-identity vs spec-comparison
- [ ] **Step 2: Write `nintendo-cny-2022.mdx`** — IP family-context narrative discipline, time-window pressure
- [ ] **Step 3: Write `bicester-village-2022.mdx`** — outlet + local + one-shot decision combinatorics
- [ ] **Step 4: Write `puma-launch.mdx`** — content direction over channel weight, Gen-Z brand re-anchoring
- [ ] **Step 5: Build and verify all 4 routes render**

```bash
npm run build
# Visit each /proof-of-work/<slug> in dev
```

- [ ] **Step 6: Commit (once all 4 are written)**

```bash
git add src/data/cases/*.mdx
git commit -m "copy(cases): 4 case writeups with Reflection section"
```

---

### Task 44: Rewrite `/proof-of-work` landing page

**Files:**
- Modify: `src/app/proof-of-work/page.tsx`

Landing page has the same case grid as homepage (using `CaseCard`) plus expanded timeline and CV download row. Reuse the homepage section components where possible.

- [ ] **Step 1: Write the page**

```typescript
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { CaseCard } from "@/components/cards/case-card";
import { DownloadButton } from "@/components/primitives/download-button";
import { cases } from "@/data/cases";

const TIMELINE_DETAIL = [
  { when: "2023.12 — 2024.04", role: "Sr. Media Planning Mgr", who: "OMG · Hearts & Science",
    clients: "Range Rover, Jaguar — see CV for full list" },
  { when: "2021.09 — 2023.09", role: "Planning Manager",       who: "EssenceMediacom",
    clients: "Nintendo, Bicester Village — see CV for full list" },
  { when: "2021.03 — 2021.09", role: "Planning Manager",       who: "Havas",
    clients: "see CV for client list" },
  { when: "2019.10 — 2021.03", role: "Asst. Planning Mgr",     who: "Dentsu Aegis",
    clients: "PUMA — see CV for full list" },
];

// NOTE: replace each "see CV for full list" with actual client portfolio extracted from
// JeremyJi-Resume.docx before commit. Keep entries concise (3-5 brand names per role).

export default function ProofOfWorkPage() {
  return (
    <SiteShell current="proof">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="02" label="Proof of Work" trailing="Cases & career" />
        <h1 className="h-display-l" style={{ maxWidth: "18ch", marginBottom: "20px" }}>
          我做过的事，<br />我学到的事。
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "28px" }}>
          {cases.map((c, i) => <CaseCard key={c.slug} c={c} index={i} />)}
        </div>

        <h2 className="h-display-m" style={{ marginTop: "60px", marginBottom: "20px" }}>Career timeline</h2>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {TIMELINE_DETAIL.map((j) => (
            <div key={j.when} style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              padding: "20px 0",
              borderBottom: "1px solid var(--line)",
              gap: "24px",
            }}>
              <span className="eyebrow">{j.when}</span>
              <div>
                <h3 className="h-display-m" style={{ fontSize: "22px" }}>{j.role} · {j.who}</h3>
                <p className="caption" style={{ marginTop: "6px" }}>Clients: {j.clients}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <DownloadButton href="/cv/jeremy-ji-cv-en.pdf">↓ Download CV · EN</DownloadButton>
          <DownloadButton href="/cv/jeremy-ji-cv-cn.pdf" variant="ghost">↓ CV · 中文</DownloadButton>
        </div>
      </section>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proof-of-work/page.tsx
git commit -m "feat(routes): /proof-of-work landing — cases + detailed timeline + CV"
```

---

### Task 45: Generate CV PDFs

**Files:**
- Create: `public/cv/jeremy-ji-cv-en.pdf`, `public/cv/jeremy-ji-cv-cn.pdf`

The existing `JeremyJi-Resume.docx` (in repo root) is the source.

- [ ] **Step 1: Convert existing English `.docx` to PDF**

```bash
mkdir -p public/cv
# macOS — using Pages or LibreOffice; or open in Word and Save as PDF
soffice --headless --convert-to pdf JeremyJi-Resume.docx --outdir public/cv/
mv public/cv/JeremyJi-Resume.pdf public/cv/jeremy-ji-cv-en.pdf
```

- [ ] **Step 2: Author Chinese CV** — Jeremy translates / drafts a Chinese version, exports to PDF as `public/cv/jeremy-ji-cv-cn.pdf`.

- [ ] **Step 3: Verify links work in `/proof-of-work` Download buttons**

- [ ] **Step 4: Commit**

```bash
git add public/cv/
git commit -m "asset: CV PDFs (EN + CN)"
```

---

### Task 46: Build `/playground/[slug]` page

**Files:**
- Create: `src/app/playground/[slug]/page.tsx`

- [ ] **Step 1: Write the route**

```typescript
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";

const SLUGS = ["campaign-teardown", "audience-mapper"] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

const TITLES: Record<(typeof SLUGS)[number], string> = {
  "campaign-teardown": "Campaign Teardown",
  "audience-mapper":   "Audience Mapper",
};

export default async function PlaygroundDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as (typeof SLUGS)[number])) return notFound();
  const Body = (await import(`@/data/playground/${slug}.mdx`)).default;
  return (
    <SiteShell current="playground">
      <article className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="04" label="Playground" trailing="Capability demo" />
        <h1 className="h-display-l">{TITLES[slug as (typeof SLUGS)[number]]}</h1>
        <div className="measure" style={{ marginTop: "28px" }}>
          <Body />
        </div>
      </article>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/playground/[slug]/page.tsx
git commit -m "feat(routes): /playground/[slug] SSG with MDX walkthrough"
```

---

### Task 47-48: Write 2 playground walkthrough MDX files

**Files:**
- Create: `src/data/playground/campaign-teardown.mdx`, `audience-mapper.mdx`

Each is 1500-2500 words. Walkthrough format: Setup · Walkthrough (the actual reasoning) · What this reveals · Where this would fail.

- [ ] **Step 1: Write `campaign-teardown.mdx`** — pick a real recent brand campaign (e.g. 喜茶 × FENDI联名 or another), do the actual teardown. Include input prompt at top, sectioned reasoning, conclusion.

- [ ] **Step 2: Write `audience-mapper.mdx`** — pick a real category (e.g. 30+ 女性身体护理), show the 4-layer segmentation, with actual reasoning and counter-examples.

- [ ] **Step 3: Verify both routes render**

```bash
npm run dev
# Visit /playground/campaign-teardown and /playground/audience-mapper
```

- [ ] **Step 4: Commit**

```bash
git add src/data/playground/*.mdx
git commit -m "copy(playground): 2 walkthroughs (Campaign Teardown + Audience Mapper)"
```

---

### Task 49: Rewrite `/playground` landing page

**Files:**
- Modify: `src/app/playground/page.tsx`

Same 2 PlayCards as homepage teaser, plus a "Future demos" placeholder list (Media Mix Simulator / Japan Trend Scan / Creative Brief Generator) marked "deferred to V1".

- [ ] **Step 1: Write the page**

```typescript
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PlayCard } from "@/components/cards/play-card";

const FUTURE = [
  { title: "Media Mix Simulator",   note: "Channel choices by goal — interactive in V1" },
  { title: "Japan Trend Scan",      note: "Track and translate cultural signals — V1" },
  { title: "Creative Brief Generator", note: "Messy ask → clear brief — V1" },
];

export default function PlaygroundPage() {
  return (
    <SiteShell current="playground">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="04" label="Playground" trailing="Capability demos" />
        <h1 className="h-display-l" style={{ maxWidth: "22ch", marginBottom: "14px" }}>
          不是作品集 ——<br />是思维方式的演示区。
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "28px" }}>
          <PlayCard
            index={1}
            slug="campaign-teardown"
            title="Campaign Teardown"
            description="给我一个最近上市的品牌，我把它的传播打法拆开给你看。"
            sampleInput="喜茶 × FENDI 联名"
            sampleOutput="6 段诊断 · 3 个不足 · 2 条改进建议"
          />
          <PlayCard
            index={2}
            slug="audience-mapper"
            title="Audience Mapper"
            description="一个品类 → 一张受众分层逻辑图。"
            sampleInput="30+ 女性身体护理"
            sampleOutput="4 层人群 · 各自痛点 · 媒介触点"
          />
        </div>

        <h2 className="h-display-m" style={{ marginTop: "60px" }}>Future demos</h2>
        <p className="caption" style={{ marginBottom: "20px" }}>需要真接入 LLM 才有意义的，留给 V1。</p>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {FUTURE.map((f) => (
            <div key={f.title} style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <h3 className="h-3">{f.title}</h3>
              <p className="caption">{f.note}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/playground/page.tsx
git commit -m "feat(routes): /playground landing with 2 demos + V1 deferred list"
```

---

### Task 50: Tag every feed item

**Files:**
- Modify: `src/data/feed/articles.json`

- [ ] **Step 1: Open `src/data/feed/articles.json`. For every item, add or verify `area` and `format` fields.**

```json
{
  "id": "...",
  "title": "...",
  "format": "article",                   // or "video" | "podcast" | "note" | "source"
  "area": "japan",                       // one of japan | marketing | design | field-notes | media
  "href": "...",
  "date": "YYYY-MM-DD",
  "summary": "<one-line summary>"
}
```

- [ ] **Step 2: Build — Zod will fail at module load if any item has wrong shape**

The `feed-grid.tsx` module created in Task 52 already calls `FeedItemSchema.parse()` on each article via `getAllFeedItems()`. Run `npm run build` to surface any tagging mistakes before commit.

- [ ] **Step 3: Commit**

```bash
git add src/data/feed/articles.json
git commit -m "data(feed): tag every article with area + format"
```

---

### Task 51: Build TagFilterBar (client component)

**Files:**
- Create: `src/components/feed/tag-filter-bar.tsx`

- [ ] **Step 1: Write `tag-filter-bar.tsx`**

```typescript
"use client";

import { Tag } from "@/components/primitives/tag";
import type { AreaFilter } from "@/lib/feed";

type Props = {
  active: AreaFilter;
  onChange: (a: AreaFilter) => void;
};

const FILTERS: Array<{ value: AreaFilter; label: string }> = [
  { value: "all",         label: "All" },
  { value: "japan",       label: "Japan" },
  { value: "marketing",   label: "Marketing" },
  { value: "design",      label: "Design" },
  { value: "field-notes", label: "Field Notes" },
  { value: "media",       label: "Media" },
];

export function TagFilterBar({ active, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
      {FILTERS.map((f) => (
        <Tag key={f.value} active={active === f.value} onClick={() => onChange(f.value)}>
          {f.label}
        </Tag>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/feed/tag-filter-bar.tsx
git commit -m "feat(feed): TagFilterBar client component"
```

---

### Task 52: Rewrite `/thinking-feed` page

**Files:**
- Modify: `src/app/thinking-feed/page.tsx`
- Create: `src/components/feed/feed-grid.tsx`

- [ ] **Step 1: Write `feed-grid.tsx` (server-rendered, merges all sources)**

```typescript
import articles from "@/data/feed/articles.json";
import { videos } from "@/data/feed/videos";
import { podcasts } from "@/data/feed/podcasts";
import { FeedItemSchema, type FeedItem } from "@/lib/schemas";
import { sortByDateDesc } from "@/lib/feed";

export function getAllFeedItems(): FeedItem[] {
  const parsed = (articles as unknown[]).map((a) => FeedItemSchema.parse(a));
  return sortByDateDesc([...parsed, ...videos, ...podcasts]);
}
```

- [ ] **Step 2: Write `app/thinking-feed/page.tsx`**

```typescript
"use client";

import { useState, useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { FeedCard } from "@/components/cards/feed-card";
import { TagFilterBar } from "@/components/feed/tag-filter-bar";
import { filterByArea, type AreaFilter } from "@/lib/feed";
import { getAllFeedItems } from "@/components/feed/feed-grid";

const ALL = getAllFeedItems();

export default function ThinkingFeedPage() {
  const [active, setActive] = useState<AreaFilter>("all");
  const items = useMemo(() => filterByArea(ALL, active), [active]);

  return (
    <SiteShell current="feed">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="03" label="Thinking Feed" trailing="Articles · Videos · Podcasts · Field Notes" />
        <h1 className="h-display-l" style={{ maxWidth: "24ch", marginBottom: "14px" }}>
          文章、视频、播客、笔记 ——<br />不分开过日子。
        </h1>
        <p className="body-l measure" style={{ marginBottom: "24px" }}>一个混合 feed。tag 切，不按格式切。</p>

        <TagFilterBar active={active} onChange={setActive} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {items.map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      </section>
    </SiteShell>
  );
}
```

Note: because this page uses client-side state, the whole route is a client component. Acceptable for V0; if SEO becomes a concern, refactor to server component with URL-based filter state.

- [ ] **Step 3: Build, verify filter works**

```bash
npm run dev
# Visit /thinking-feed, click each tag, confirm grid filters
```

- [ ] **Step 4: Commit**

```bash
git add src/app/thinking-feed/page.tsx src/components/feed/feed-grid.tsx
git commit -m "feat(routes): /thinking-feed with client-side tag filter"
```

---

### Task 53: Rewrite `/areas/[slug]` page

**Files:**
- Modify: `src/app/areas/[slug]/page.tsx`

- [ ] **Step 1: Write the page**

```typescript
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { FeedCard } from "@/components/cards/feed-card";
import { domains } from "@/data/domains";
import { filterByArea, sortByDateDesc } from "@/lib/feed";
import { getAllFeedItems } from "@/components/feed/feed-grid";

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return notFound();

  const items = sortByDateDesc(filterByArea(getAllFeedItems(), domain.slug));
  const recent = items.slice(0, 12);

  return (
    <SiteShell current="feed">
      <article className="section" style={{ paddingTop: "20px" }}>
        <Eyebrow>{domain.shortLabel}</Eyebrow>
        <h1 className="h-display-l" style={{ marginTop: "12px" }}>{domain.name}</h1>
        <div className="body-l measure" style={{ marginTop: "24px", whiteSpace: "pre-line" }}>
          {domain.manifesto}
        </div>

        <SectionNumberBar number="•" label="Recent in this area" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {recent.map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      </article>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Verify all 4 area routes render**

```bash
npm run dev
# Visit /areas/japan, /areas/marketing, /areas/design, /areas/field-notes
```

- [ ] **Step 3: Commit**

```bash
git add src/app/areas/[slug]/page.tsx
git commit -m "feat(routes): /areas/[slug] with manifesto + recent feed"
```

---

### Task 54: Write 7 field note MDX files

**Files:**
- Create: `src/data/feed/field-notes/*.mdx` (7 files per file structure)

Each field note: photo + 1-2 paragraphs (~150 words). Publish-style: as if Jeremy was caught noticing something.

Frontmatter shape:

```yaml
---
slug: "2025-11-konbini-light"
title: "便利店收银台后面的灯光"
area: "japan"
date: "2025-11-04"
image: "/field-notes/konbini-light.jpg"     # optional, drop in /public/field-notes/
---
```

- [ ] **Step 1: Write 7 field notes (date-prefixed slugs)**
- [ ] **Step 2: For any field note that references an image, add the image to `public/field-notes/`**
- [ ] **Step 3: Add field notes to feed aggregation** — update `getAllFeedItems()` in `feed-grid.tsx` to include parsed field notes:

```typescript
import { loadMdxDir } from "@/lib/content";
import type { FieldNote } from "@/lib/schemas";

// inside getAllFeedItems():
const fieldNotes = loadMdxDir<FieldNote>("feed/field-notes").map((doc) => ({
  id: `note-${doc.slug}`,
  title: doc.frontmatter.title,
  format: "note" as const,
  area: doc.frontmatter.area,
  href: `/areas/field-notes/${doc.slug}`,
  date: doc.frontmatter.date,
  image: doc.frontmatter.image,
}));
```

- [ ] **Step 4: Commit**

```bash
git add src/data/feed/field-notes/ src/components/feed/feed-grid.tsx public/field-notes/
git commit -m "copy(field-notes): 7 initial field notes + feed integration"
```

---

### Task 55: Rewrite `/gallery` page

**Files:**
- Modify: `src/app/gallery/page.tsx`
- Create: `src/data/gallery.ts`

- [ ] **Step 1: Create `data/gallery.ts`**

```typescript
export type Photo = {
  src: string;
  alt: string;
  caption: string;     // 1-2 sentences connecting image to thinking
  area?: "japan" | "marketing" | "design" | "field-notes";
};

export const photos: Photo[] = [
  {
    src: "/gallery-tokyo-night.jpg",
    alt: "Tokyo at night",
    caption: "[Caption written in Phase 4 — Jeremy fills in.]",
    area: "japan",
  },
  // ... add 11-19 more from /public/gallery-*.jpg and beyond
];
```

- [ ] **Step 2: Write `app/gallery/page.tsx`**

```typescript
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { photos } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <SiteShell current="gallery">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="•" label="Gallery" trailing="Visual notes" />
        <h1 className="h-display-l">观察是另一种语言。</h1>
        <p className="body-l measure" style={{ marginTop: "12px", marginBottom: "32px" }}>
          看见的东西先于写出来的东西。
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {photos.map((p) => (
            <figure key={p.src} style={{ margin: 0 }}>
              <div style={{ aspectRatio: "4 / 3", position: "relative", border: "1px solid var(--line)", borderRadius: "4px", overflow: "hidden" }}>
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} />
              </div>
              <figcaption className="caption" style={{ marginTop: "10px" }}>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
```

- [ ] **Step 3: Author 12-20 captions in `data/gallery.ts`**

- [ ] **Step 4: Commit**

```bash
git add src/data/gallery.ts src/app/gallery/page.tsx
git commit -m "feat(routes): /gallery with editorial captions"
```

---

### Task 56: Rewrite `/interface` page

**Files:**
- Modify: `src/app/interface/page.tsx`

- [ ] **Step 1: Write the full page**

```typescript
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PullQuote } from "@/components/primitives/pull-quote";
import { tracks, endpoints, faq, briefTemplate, protocolLine } from "@/data/interface";

export default function InterfacePage() {
  const mailtoBody = encodeURIComponent(briefTemplate);
  const briefHref = `mailto:${endpoints[0].value}?subject=${encodeURIComponent("[Brief] ")}&body=${mailtoBody}`;

  return (
    <SiteShell current="interface">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="05" label="Interface" trailing="How to work with me" />
        <h1 className="h-display-l">联系我，<br />不如说是调用我。</h1>
        <PullQuote>{protocolLine}</PullQuote>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>Collaboration tracks</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
          {tracks.map((t) => (
            <article key={t.title} style={{ padding: "20px", border: "1px solid var(--line)", borderRadius: "8px", background: "var(--paper)" }}>
              <h3 className="h-3">{t.title}</h3>
              <p className="caption" style={{ margin: "8px 0 14px" }}>{t.summary}</p>
              <p className="eyebrow">Good for</p>
              <ul className="caption" style={{ paddingLeft: "16px", marginTop: "6px" }}>
                {t.goodFor.map((g) => <li key={g}>{g}</li>)}
              </ul>
              <p className="eyebrow" style={{ marginTop: "14px" }}>Send this</p>
              <p className="caption" style={{ marginTop: "4px" }}>{t.sendThis}</p>
            </article>
          ))}
        </div>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>Send a brief</h2>
        <p className="body-l measure">直接用模板发邮件给我，最省时间。</p>
        <a href={briefHref} className="pill pill-solid" style={{ marginTop: "16px" }}>Open mail composer →</a>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>Endpoints</h2>
        <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", borderTop: "1px solid var(--line)" }}>
          {endpoints.map((e) => (
            <li key={e.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
              <a href={e.href}>{e.label}</a>
              <span style={{ color: "var(--muted)" }}>{e.value}</span>
            </li>
          ))}
        </ul>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>FAQ</h2>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {faq.map((entry) => (
            <details key={entry.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
              <summary className="h-3" style={{ cursor: "pointer" }}>{entry.q}</summary>
              <p className="body" style={{ marginTop: "10px" }}>{entry.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/interface/page.tsx
git commit -m "feat(routes): /interface full — tracks + brief template + endpoints + FAQ"
```

---

### Task 57: Rewrite `/live-agent` page

**Files:**
- Modify: `src/app/live-agent/page.tsx`

V0 stub: clickable prompts that expand to pre-baked answers.

- [ ] **Step 1: Write the page**

```typescript
"use client";

import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { prompts } from "@/data/live-agent";

export default function LiveAgentPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <SiteShell current="agent">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="06" label="Live Agent" trailing="Static V0 — backend in Phase 6" />

        <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "12px", padding: "32px 36px", marginTop: "20px" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>$ ask jeremy</span>
          <h1 className="h-display-m" style={{ margin: "12px 0 22px", color: "var(--paper)" }}>
            一个读过我所有内容的 AI 分身。
          </h1>
          <p className="body" style={{ opacity: 0.75, color: "var(--paper)", maxWidth: "60ch" }}>
            建立在文章、案例、方法论之上。点击一个问题看示范回答。
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginTop: "24px" }}>
            {prompts.map((p, i) => (
              <li key={p.question} style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", background: "transparent", border: 0,
                    padding: "16px 0", color: "var(--paper)",
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
                  <div className="body" style={{ color: "var(--paper)", padding: "0 0 22px 28px", whiteSpace: "pre-line" }}>
                    {p.answer}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

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
              <li>没看过的题目，会 routing 到 /interface</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/live-agent/page.tsx
git commit -m "feat(routes): /live-agent V0 stub with expandable pre-baked answers"
```

---

### Task 58: Final cleanup — remove old `site-content.ts`

**Files:**
- Delete: `src/data/site-content.ts`

- [ ] **Step 1: Verify no imports remain**

```bash
grep -r "site-content" src/
# Expected: only references in old code paths that have been replaced
```

- [ ] **Step 2: If imports remain, fix them — they should now point to the split modules in `data/`**

- [ ] **Step 3: Delete the file**

```bash
git rm src/data/site-content.ts
```

- [ ] **Step 4: Verify build**

```bash
npm run build
npm run lint
```

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: remove monolithic site-content.ts (replaced by data/* modules)"
```

---

### Task 59: Final QA pass

**Files:** none

- [ ] **Step 1: Build and serve**

```bash
npm run build && npm start
```

- [ ] **Step 2: Manually visit each route, check against spec:**

```
/                                    — homepage layout per v2 wireframe
/styleguide                          — every primitive renders
/proof-of-work                       — case grid + timeline + CV downloads
/proof-of-work/range-rover-flagship
/proof-of-work/nintendo-cny-2022
/proof-of-work/bicester-village-2022
/proof-of-work/puma-launch
/thinking-feed                       — tag filter works
/areas/japan
/areas/marketing
/areas/design
/areas/field-notes
/playground                          — 2 demos + V1 deferred list
/playground/campaign-teardown
/playground/audience-mapper
/gallery                             — captions present, no [in Phase X] strings
/interface                           — brief mailto: opens
/live-agent                          — prompts expand, answers visible
```

- [ ] **Step 3: Search for placeholder strings**

```bash
grep -rE "\[in Phase|TODO|TBD|placeholder" src/data/ src/app/
# Expected: no matches
```

- [ ] **Step 4: Verify CV PDFs download**

- [ ] **Step 5: Verify mobile responsive (resize browser to ~720px)** — basic check that nothing breaks. Spec defers separate mobile design to V1.

- [ ] **Step 6: Commit if any tweaks needed**

---

**Phase 4 checkpoint:** All seven subpages have real content. Zero placeholders. Build passes. Lint passes.

---

## Post-launch

This plan stops here. Phases 5-8 (motion, Live Agent backend, search, newsletter) are independent specs and start with their own brainstorming + writing-plans cycle.

**Total tasks:** 59 (Pre-flight 0 + Phase 1 × 18 + Phase 2 × 13 + Phase 3 × 6 + Phase 4 × 22).
**Estimated effort:** ~7-9 work units (a "unit" being a focused half-day).
**Word count to author:** ~11,000 (split P0 launch-blocking ~6,500 + P1 full V0 ~4,500).
