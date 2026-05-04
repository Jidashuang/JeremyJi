# Personal Site Redesign · Design Spec

**Date:** 2026-05-04
**Project:** `/Users/jidashuang/Documents/Personal site`
**Stack:** Next.js 16 · React 19 · Tailwind 4 · TypeScript
**Repo:** `jeremy-personal-site` (single-branch, master)
**Status:** Brainstorming → spec, ready for implementation plan

---

## 1. Context & goals

The site exists today as a Next.js 16 app with one homepage (407 lines) and seven subpage routes. Visual language is "warm paper editorial" — cream surface, Playfair display serif, Space Grotesk body, IBM Plex Mono for eyebrow/code, with warm orange and dark teal accents. Structure already follows the "Personal OS" framing from `website-redesign-plan.md` (Hero, Operating System, Proof of Work, Thinking Feed, Playground, Interface, Live Agent).

What feels half-finished is not the structure but the polish, the content density, and the visual signature. The site currently reads as a competent personal blog template rather than as a deliberate publication. Several pages (Playground, Live Agent, Gallery) are partial.

The redesign targets three pillars in priority order:

1. **Aesthetic upgrade** — bring visual language up to the quality of NYT Magazine / The Atlantic / It's Nice That.
2. **Design signature** — establish editorial motifs that make the site instantly recognizable.
3. **Content density** — fill subpages with real writing (case studies, walkthroughs, field notes, area manifestos) so the "Personal OS" framing is backed by actual artifacts.

Out of scope for this spec: motion system, Live Agent real backend, search, newsletter.

## 2. Audience & primary use cases

**Primary (A) — recruiters / agency leads / overseas in-house hiring**

This audience cares about credibility (real client names, real career history), thinking quality (does this person actually have a method?), and friction-free CV access. They want fast credibility, not a long scroll.

**Secondary (C) — content readers from Zhihu / Bilibili / WeChat / podcast**

This audience knows Jeremy through one channel and wants to find his other work, see what he's thinking about now, and understand the "system" behind the content.

**Both audiences served by the same surfaces** — the recruiter is convinced by the editorial quality of the case writeups and the visible thinking in Operating System and Thinking Feed. The reader is convinced by the professional pedigree (OMG, EssenceMediacom, Havas, Dentsu) and the structured way content is organized. They reinforce each other rather than fight.

Explicitly **not** primary audiences in V0: brand collaboration leads (served indirectly via Interface), AI-circle peers (served indirectly via Live Agent visual stub).

## 3. Visual System

Direction: **Editorial Warm v2** — the existing direction, raised to magazine-publication quality.

### 3.1 Color tokens

```
--bg          #f2eadf   page background, warmest paper
--paper-2     #faf3e8   section surface
--paper       #fffaf2   card / container
--ink         #181512   primary text, solid buttons
--muted       #62574c   secondary text
--line        rgba(24,21,18,0.12)   hairline borders
--warm        #c66336   primary accent (section number, pull quote, key CTA)
--warm-dark   #8b3c1d   hover / strong contrast
--green       #1f6b63   semantic only (available, success)
```

**Removed from current design:**

- `--gold #c49738` — visually muddies the palette, poorly anchored
- Two `page-glow` radial gradients (left orange + right teal) — fragrance-of-template, magazines do not use this
- Box-shadows on cards — replaced by hairline rules

**Discipline:** one primary accent (warm orange) + one secondary (deep ink) + green reserved as semantic color. No third decorative color.

### 3.2 Typography

Three families (existing) plus one critical addition:

```
--serif       Playfair Display (display headings) + Noto Serif SC (Chinese display)
--sans        Space Grotesk (body) + Noto Sans SC (Chinese body)
--mono        IBM Plex Mono (eyebrow, code, label)
```

The current site falls back to system fonts (PingFang) for Chinese text. **Adding Noto Serif SC + Noto Sans SC is critical** — Chinese hero text on a magazine-grade site cannot rely on system fallback.

Type scale (8 stops):

| Token | Family | Size / Line | Use |
|-------|--------|-------------|-----|
| display-xl | serif | 84 / 0.95 | Hero only |
| display-l | serif | 56 / 1.04 | Section opener |
| display-m | serif | 36 / 1.12 | Card title, subhead |
| h3 | sans 600 | 22 / 1.30 | Principle, panel head |
| body-l | sans 400 | 18 / 1.65 | Hero lede, lead paragraph |
| body | sans 400 | 15 / 1.65 | Standard body |
| eyebrow | mono 500 | 11 · 0.18em tracked | Section labels |
| caption | sans 400 | 13 / 1.50 muted | Photo caption, fine print |

### 3.3 Editorial motifs

These are the signature elements that distinguish the site from generic personal templates:

- **Section number bar** — replaces the current eyebrow text. Format: 1px ink rule on top, mono `01`, section name, em-color sub-label aligned right. Used at the top of every homepage section and subpage hero.
- **Pull quote** — Playfair italic 22px, 3px warm-orange left rule, 60ch max width. Maximum one per page or section. Used to anchor a key thought.
- **Hairline rules** — three weights replace box-shadows entirely: 3px ink (section heads), 1px ink @ 40% (card edges), 1px warm (decorative emphasis).
- **Case card thinking quote** — within case cards on homepage and subpage, lead with a Playfair italic strategic-judgment line (not metrics). Warm-orange left rule, no quotation marks needed.
- **Pull tags** — pill shape, 4 variants: outlined (default), solid ink, warm tint, paper-2 soft.
- **Vol. cue in footer** — small mono "Vol. 01 — 2026 Spring · Shanghai" reinforces the magazine framing and dates the site as a deliberate publication.

### 3.4 Layout

- Container max-width 1180px (existing). Long-form text (hero lede, area manifesto, MDX prose) constrained to 720px / 60-65ch.
- 12-column grid as base. Hero uses asymmetric 7-5 split (text-photo). Cases use 6-6 / 4-4-4. Sidebar layouts use 8-4.
- Section vertical rhythm: 96px desktop, 64px mobile. Component-internal: 32px. Card-internal: 14px.

### 3.5 Photography

- Photo prominence reduced on homepage. Hero loses its 4-card collage; one portrait at 4:5 ratio replaces it.
- Case heroes use 16:10 strict ratio with hairline border, no shadow.
- Bilibili thumbnails normalized to 4:3 with a 70% black overlay (replacing current gradient overlays).
- Captions use mono small caps muted text.
- Gallery becomes its own page rather than a homepage element.

## 4. Information architecture

The homepage follows **Approach 3 — Hybrid "one strong hand"**: brief Hero, full Proof of Work as the killer section in second position, all other sections compressed to teasers.

```
00  Hero
01  My Operating System          (compressed, 1 screen)
02  Proof of Work                (full: cases + timeline + CV)
03  Thinking Feed                (teaser: 4 mixed cards)
04  Playground                   (teaser: 2 demo cards)
05  Interface                    (full but compact)
06  Live Agent                   (V0 visual stub)
```

**Critical decisions:**

- **Proof of Work moves from position 5 to position 2.** It is the strongest signal for audience A and must arrive before the visitor scrolls past three screens.
- **No homepage signal bar of metrics.** No `7y / ¥150M / +30% recall / −20% CAC` row anywhere on the homepage. The metrics are agency-standard claim language and do not actually convince. The recognizable client names (Range Rover, Nintendo, Bicester Village, PUMA) and agency pedigree (OMG, EssenceMediacom, Havas, Dentsu) carry the credibility instead.
- **No metric grid in PoW section.** Replaced by the 2×2 case grid.
- **Case cards lead with a strategic-judgment line, not KPIs.** The structural thinking is the signal; the numbers live inside the full case writeups on `/proof-of-work/[slug]` for those who actually read deep.
- **Hero loses its 4-card collage.** One portrait photo + strong copy.
- **Homepage loses the 5-card portal grid below hero.** The section-by-section flow replaces it.

Routes — 7 static + 3 dynamic (with 4 + 4 + 2 slugs respectively, 10 generated pages total):

| Route | Purpose | V0 status |
|-------|---------|-----------|
| `/` | Homepage | build |
| `/proof-of-work` | Cases landing + timeline + CV | build |
| `/proof-of-work/[slug]` | Individual case writeup (MDX) | build (4 slugs) |
| `/thinking-feed` | Mixed-format content stream with tag filter | build |
| `/areas/[slug]` | Domain landing page (japan, marketing, design, field-notes) | build (4 slugs) |
| `/playground` | Capability demos landing | build |
| `/playground/[slug]` | Individual walkthrough (MDX) | build (2 slugs) |
| `/gallery` | Curated photography with editorial captions | polish |
| `/interface` | Collaboration protocol full version | build |
| `/live-agent` | V0 static stub of AI version | build (stub) |

## 5. Homepage detailed wireframe

### 00 Hero

7-5 asymmetric grid. Left: mono eyebrow (`Shanghai · Media Strategy · Japan · Design · AI Workflows`), display-xl Playfair headline (Chinese primary with one warm-orange italic emphasis word), Playfair italic English subline, body-l lede paragraph, three CTA pills (`Proof of Work` solid + two ghost). Right: single portrait photo, 4:5, hairline border, no shadow.

No signal bar follows hero. Hero flows directly into Section 01.

### 01 My Operating System

Section number bar `01 / My Operating System — How I observe, decide, execute`. display-l headline, body-l intro. 4-column principle row: each principle has mono `P / 0n` label, h3 headline (one English line), one short Chinese explanation. Below, 4-column domain pill row linking to `/areas/japan`, `/areas/marketing`, `/areas/design`, `/areas/field-notes`. Closes with one pull quote.

The current 3 channel cards (Zhihu / Bilibili / Instagram) move out of this section, into the footer or Interface.

### 02 Proof of Work — full

Section number bar `02 / Proof of Work — Cases & career`. display-l headline ("我做过的事，我学到的事。"), body-l intro mentioning sectors (汽车 / 游戏 / 奥莱 / FMCG).

**No metric grid.** Directly to:

2×2 case grid. Each card: 16:10 hero block, meta row (`Case 0n · Sector · Year` left, brand name right), display-m brand title, **Playfair-italic strategic-judgment line with warm left rule** (the differentiator vs generic case cards), `Read full case →` mono link.

**Case hero block — V0 visual treatment:** Each case ships with a *typographic* hero (no campaign photography) — a brand-color gradient surface (sampled from each brand's identity) with the brand wordmark or a stylized typographic mark in foreground, hairline border. This is intentional editorial restraint and avoids depending on sourcing campaign assets that may be confidential. Real campaign imagery is a P2 optional upgrade.

Below the grid: 4-column career timeline (OMG / EssenceMediacom / Havas / Dentsu Aegis). Each cell: when (mono), role (display-m), employer (caption).

Below the timeline: CV download row — solid ink button `↓ Download CV · EN`, ghost button `↓ CV · 中文`, ghost link `View all cases →`.

### 03 Thinking Feed teaser

Section number bar. display-l headline. Tag filter bar with All + 5 area tags (visual on home, fully wired on subpage). 4-column mixed format card row: 1 video, 1 article, 1 podcast, 1 field note. Each card has its format kicker (mono caps muted), title (display-m or h3), 1-line tag row. `Open Feed Page →` link below.

### 04 Playground teaser

Section number bar. display-l headline. 2-column demo card row: each card has mono index, display-m title, body description, sample input/output preview block in mono on paper-2. `Try this demo →` link inside each card.

### 05 Interface

Section number bar. display-l headline. Pull-quote-style protocol line in Playfair italic. 8-4 split below: left = 3 collaboration track cards (Media Strategy Consult / Brief Refinement / Speaking · Partnership), right = "Endpoints" panel on solid ink background (Email / LinkedIn / WeChat / Telegram), styled like an API endpoint table.

### 06 Live Agent

Section number bar with `· v0 static` qualifier. The whole section is one solid ink card with mono eyebrow `$ ask jeremy`, display-m headline, body description, vertical list of 4 sample prompts (each Playfair italic with warm `?` glyph in mono). The homepage shows 4 of the 5 prompts as a teaser; the full set of 5 with their pre-baked answers lives on `/live-agent`. `Open Live Agent →` link in ghost-on-dark style.

### Footer

Three-column: left mono `Vol. 01 — 2026 Spring · Shanghai`, center `Jeremy Ji · © 2026` in Playfair small, right social links in mono caps.

## 6. Subpage strategy

**`/proof-of-work`** (build) — Landing presents the same 4 case cards as homepage but with more depth. Below: detailed timeline with role-level descriptions and client portfolios. CV downloads (CN + EN) prominently. Each case links to its full writeup at `/proof-of-work/[slug]`.

**`/proof-of-work/[slug]`** × 4 (build) — MDX-rendered case writeups. Structure: hero photo, brand · sector · year tag bar, then six sub-sections — Context, Challenge, Strategy, Execution, Result, **Reflection**. The Reflection section is the differentiator: it is where Jeremy writes what he learned that he carries forward. This is what makes the case studies editorial rather than agency-deck.

**`/thinking-feed`** (build) — Tag filter bar across the top. Mixed-format chronological grid below. Each item card: format kicker, title, 1-line summary, area tag. Sidebar: Areas navigation with item counts, Most Read curated list. V0 uses static aggregation from `articles.json` + new `videos.ts` + new `podcasts.ts` + MDX field notes; client-side tag filter; no live source sync (deferred to V1).

**`/areas/[slug]`** × 4 (build) — Per-domain landing. Hero: domain name + 200-300 word manifesto explaining what this thread means in Jeremy's thinking. Curated reading list (5-8 articles with 1-line note on why each one). Featured videos/podcasts (3-4 items). Knowledge sources (5-10 references). Recent field notes for this domain. Japan is the heaviest of the four; Marketing and Design medium; Field Notes is a new content type.

**`/playground`** (build) — Two demo cards on landing, each linking to `/playground/[slug]`. The two V0 demos are walkthrough-style MDX articles (no real interactivity): Campaign Teardown (a worked example dissecting a real recent brand launch) and Audience Mapper (a worked example showing 4-layer segmentation logic for a specific category). 1500-2500 words each. Three more interactive demos (Media Mix Simulator, Japan Trend Scan, Creative Brief Generator) deferred to V1 — they need actual LLM integration to be meaningful.

**`/gallery`** (polish) — 12-20 best photos from existing assets, each with a 1-2 sentence caption that connects the image to Jeremy's thinking (not date + location). Simple grid + lightbox. Not featured on homepage; reachable via nav and via Thinking Feed when a photo + note item appears.

**`/interface`** (build) — Full version of the homepage Section 05 teaser. Protocol manifesto in pull-quote style. 5 detailed collaboration track cards. "Send a brief" template (uses `mailto:` with prefilled subject and body, zero backend). 4-6 FAQ entries. Endpoints table.

**`/live-agent`** (build, V0 stub) — Visual preview that looks like a real chat interface. Solid ink terminal-style frame. 5 clickable sample prompts. Clicking a prompt expands a pre-baked 200-400 word response stored in `data/live-agent.ts`. Below the chat frame: a "What this knows / What this won't do" disclosure block. The static responses are written to demonstrate Jeremy's actual voice and capability. Real LLM integration is Phase 6.

## 7. Content production checklist

**P0 (~6,500 words, launch-blocking):**

| Item | Where | Source | Words |
|------|-------|--------|-------|
| Hero copy | `/` | new | ~150 |
| Hero portrait photo (4:5 crop) | `/` | reuse `/jeremy-portrait.jpg` or new | — |
| OS principles + pull quote | `/` | reuse + polish | ~250 |
| 4 case "thinking quotes" | `/` | new | ~200 |
| **4 case full writeups** | `/proof-of-work/[slug]` | new | **~3,200** |
| Career timeline detail | `/proof-of-work` | reuse from CV | ~400 |
| CV PDF (CN + EN) | `/public/cv/` | reuse from `.docx` | — |
| 4 area manifestos | `/areas/[slug]` | new | ~1,000 |
| Interface protocol + brief template + FAQ | `/interface` | new | ~500 |
| 5 Live Agent prompts + sample answers | `/live-agent` | new | ~1,200 |
| Featured Feed 8-12 items tagged | `/thinking-feed` | tag-only | ~150 |

**P1 (~4,500 words, full V0):**

| Item | Where | Source | Words |
|------|-------|--------|-------|
| 6-8 field notes | `/areas/field-notes` | new | ~1,000 |
| **2 playground walkthroughs** | `/playground/[slug]` | new | **~3,000** |
| Tag full feed inventory | `data/feed/articles.json` | tag-only | ~300 |
| Areas curated lists + refs | `/areas/[slug]` | new | ~600 |
| Gallery 12-20 captions | `/gallery` | new | ~500 |

**P2 (deferred):** 5th+ case, 3 interactive playground demos, ongoing field note accumulation, Live Agent real backend.

The two largest content investments — 4 case writeups and 2 playground walkthroughs — are the ones that must be written by Jeremy. Hero / protocol / area manifestos can be drafted and polished collaboratively.

## 8. Technical architecture

### 8.1 Stack additions

- **`@next/mdx` + remark/rehype** — for case writeups, playground walkthroughs, area manifestos, field notes. MDX gives a markdown-friendly authoring surface and supports embedded React components for inline pull quotes, captions, and photo blocks.
- **Noto Serif SC + Noto Sans SC** (Google Fonts) — Chinese display and body fonts.
- **Zod schemas** — already a dependency. Used at module load time to validate structured content (cases metadata, principles, domains, feed items).

### 8.2 Component decomposition

```
src/components/
├── shell/
│   ├── site-shell.tsx        (existing, refactored)
│   ├── topbar.tsx            (new — extracted)
│   └── footer.tsx            (new — Vol. 01 cue)
│
├── primitives/               (editorial atoms, each <60 lines)
│   ├── section-number-bar.tsx
│   ├── pull-quote.tsx
│   ├── hairline-rule.tsx
│   ├── pill.tsx
│   ├── tag.tsx
│   ├── eyebrow.tsx
│   └── download-button.tsx
│
├── sections/                 (homepage segments, reusable)
│   ├── hero-block.tsx
│   ├── operating-system-block.tsx
│   ├── proof-of-work-block.tsx
│   ├── thinking-feed-teaser.tsx
│   ├── playground-teaser.tsx
│   ├── interface-block.tsx
│   └── live-agent-block.tsx
│
├── cards/
│   ├── case-card.tsx         (4 variants by size: home / pow-landing / list)
│   ├── feed-card.tsx         (4 format variants: article / video / podcast / note)
│   ├── play-card.tsx
│   └── track-card.tsx
│
├── feed/
│   ├── feed-grid.tsx
│   ├── tag-filter-bar.tsx    (client component for filter state)
│   └── feed-item.tsx
│
└── live-agent/
    ├── agent-terminal.tsx
    └── prompt-list.tsx
```

### 8.3 Data layer

```
src/data/
├── site.ts                   (metadata, nav, social)
├── domains.ts                (4 areas)
├── principles.ts             (4 OS principles)
├── cases/                    (MDX × 4)
│   ├── range-rover-flagship.mdx
│   ├── nintendo-cny-2022.mdx
│   ├── bicester-village-2022.mdx
│   └── puma-launch.mdx
├── playground/               (MDX × 2)
│   ├── campaign-teardown.mdx
│   └── audience-mapper.mdx
├── feed/
│   ├── articles.json         (existing, +tag field)
│   ├── videos.ts
│   ├── podcasts.ts
│   └── field-notes/          (MDX × 6-8)
├── live-agent.ts             (prompts + sample responses)
├── interface.ts              (tracks, FAQ, endpoints)
└── gallery.ts                (photo + caption pairs)
```

### 8.4 Styles

The current 1.3K-line `globals.css` splits into four files imported by a slim `globals.css`:

```
src/styles/
├── tokens.css                (CSS variables: color, type, spacing)
├── reset.css
├── primitives.css            (.h-display, .pill, .pull-quote, etc.)
└── globals.css               (imports + body base)
```

Section-specific layout that does not generalize moves into component-scoped `.module.css` files.

### 8.5 Routing & rendering

App Router with the following routes:

- Static: `/`, `/proof-of-work`, `/thinking-feed`, `/playground`, `/gallery`, `/interface`, `/live-agent`
- Dynamic with `generateStaticParams` (SSG): `/proof-of-work/[slug]` (4 slugs), `/playground/[slug]` (2 slugs), `/areas/[slug]` (4 slugs)

All pages prerender at build time. The tag filter on `/thinking-feed` is the only client-side stateful component in V0; everything else is server-rendered static HTML.

## 9. Implementation sequence

### Phase 1 — Foundation (~1 unit)

1. Add `Noto Serif SC` and `Noto Sans SC` to `app/layout.tsx`.
2. Refactor `globals.css` into `tokens.css`, `reset.css`, `primitives.css`, `globals.css`.
3. Build seven `primitives/` components.
4. Create internal `/styleguide` route that renders every primitive on one page for visual QA.
5. Refactor `SiteShell` to extract `topbar.tsx` and add `footer.tsx` with Vol. cue.

**Checkpoint:** `/styleguide` renders all atoms correctly.

### Phase 2 — Homepage (~1.5 units)

6. Build seven `sections/*` components.
7. Rewrite `app/page.tsx` to compose sections.
8. Remove: hero 4-card collage, signal bar, portal grid, two `page-glow` radial gradients, gold accent everywhere.

**Checkpoint:** Homepage matches the v2 wireframe (no homepage metrics, no portal grid, Proof of Work in position 02).

### Phase 3 — Copywriting (~1.5 units, ~3,000 words)

9. Hero copy (主标 + EN sub + lede + CTAs).
10. OS principles polish + 1 pull quote.
11. 4 case "thinking quote" lines.
12. 4 area manifestos (200-300 words each).
13. Interface protocol + brief template + FAQ.
14. 5 Live Agent sample prompts + 5 pre-baked answers (200-400 words each).
15. Hero photo selection and 4:5 crop.

**Checkpoint:** Homepage has zero placeholder strings.

### Phase 4 — Subpage content (~3-4 units, ~8,000 words)

16. 4 case MDX writeups → renders at `/proof-of-work/[slug]`.
17. `/proof-of-work` landing with 4 case teasers, expanded timeline, CV download.
18. CV PDF generation: convert existing `JeremyJi-Resume.docx` to EN PDF; produce CN PDF.
19. 2 playground MDX walkthroughs → `/playground/[slug]`.
20. `/playground` landing.
21. Tag every feed item in `articles.json` + `videos.ts` + `podcasts.ts` with area + format.
22. `/thinking-feed` full implementation with client-side tag filter.
23. 4 area pages at `/areas/[slug]` with manifesto + curated lists.
24. 6-8 field note MDX files at `/areas/field-notes`.
25. `/gallery` curation: 12-20 photos with editorial captions.
26. `/interface` full page (track expansion, FAQ).
27. `/live-agent` V0 stub UI + 5 pre-baked Q&A from `data/live-agent.ts`.

**Checkpoint:** All seven subpages have real content, zero "coming soon" placeholders.

## 10. Out of scope / non-goals

**Deferred to later specs:**

- **Phase 5 — Motion system.** Page transitions, scroll-reveal, hover micro-interactions, loading states. Either CSS-only or Framer Motion, evaluated separately.
- **Phase 6 — Live Agent real backend.** LLM provider selection, system prompt, knowledge base ingestion, `/api/agent` route, streaming responses, abuse protection. Its own complete spec.
- **Phase 7 — Search & discovery.** Site search, related items, real Most Read, tag aggregation pages. Becomes useful only at higher content volume.
- **Phase 8 — Newsletter / RSS.** Email subscription, RSS feed output, Substack-style subscription page. Activate only if newsletter strategy is committed.

**Explicit non-goals (will not be built):**

- i18n top-level language switcher (the site is bilingual within content; no toggle).
- Dark mode (warm paper is the brand identity, not a setting).
- Comment system.
- In-site search bar.
- Notion / Lark CMS sync (content authored as MDX directly).
- Third-party analytics (Vercel built-in is sufficient initially).
- Separate mobile design (responsive layouts only).
- Authentication / login state.
- Like / share / view counters.

## 11. References

Brainstorming visual artifacts saved to `.superpowers/brainstorm/59252-1777880011/content/`:

- `welcome.html` — current state summary
- `visual-direction.html` — three style options (A · Editorial Warm chosen)
- `visual-system.html` — full token system
- `homepage-wireframe.html` — v1 homepage layout
- `homepage-wireframe-v2.html` — v2 with metrics removed
- `sitemap.html` — subpage scope map
- `content-checklist.html` — content production matrix
- `architecture.html` — file tree + component decomposition
- `sequence.html` — phasing + out-of-scope

These mockups are exploratory and not part of the implementation surface. They persist for visual reference during build.

---

**Next step after spec approval:** invoke `superpowers:writing-plans` to break the four phases into a concrete, sequenced implementation plan with file-level changes.
