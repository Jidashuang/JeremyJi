# W1 Implementation Plan · Baseline cleanup + Vercel deploy

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the redesign on `https://jeremyji.vercel.app` by end of W1: ignore `.claude/`, replace placeholder email, untangle hardcoded gradients, confirm CV placeholders, and connect Vercel to `main`.

**Architecture:** Working tree is `.claude/worktrees/redesign-2026-05/` (now synced with `origin/main`). All edits commit on `worktree-redesign-2026-05` and push to `origin/main`. Vercel watches `main` and auto-deploys.

**Tech Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Vitest · Vercel.

**Spec:** `docs/superpowers/specs/2026-05-11-personal-site-build-plan.md` §3 W1 row

**Prerequisites:**
- Vercel account exists and CLI installed (`npm i -g vercel`) — if not, Task 7 has the install step
- Working dir for all commands: `/Users/jidashuang/Documents/Personal site/.claude/worktrees/redesign-2026-05`
- All commands assume current branch is `worktree-redesign-2026-05` (synced with `origin/main` after the 2026-05-11 force-push)

---

## File Map

- Modify: `.gitignore` — add `.claude/` line
- Modify: `src/data/interface.ts:42-43` — real email
- Modify: `src/app/styles/tokens.css` — new gradient tokens
- Modify: `src/components/cards/feed-card.tsx:16-22` — use tokens
- Modify: `public/cv/README.md` — add note that placeholders are intentional for W1
- Create: `public/cv/jeremy-ji-cv-en.pdf` (placeholder)
- Create: `public/cv/jeremy-ji-cv-cn.pdf` (placeholder)
- Verify: `package.json`, `next.config.ts`, `vercel.json` (will be auto-generated)

---

## Task 1: Ignore `.claude/` and untracked plugin state

**Files:**
- Modify: `.gitignore` (append one line in the existing "typescript" / closing block)

- [ ] **Step 1: Inspect current state**

```bash
cd "/Users/jidashuang/Documents/Personal site/.claude/worktrees/redesign-2026-05"
git status
```

Expected: clean tree (or only the changes from later tasks). The `.claude/` directory is at the repo root and contains `launch.json` + `worktrees/`. It should NEVER be committed.

- [ ] **Step 2: Append `.claude/` to .gitignore**

```bash
printf "\n# claude code session/plugin state\n.claude/\n" >> .gitignore
cat .gitignore | tail -5
```

Expected last lines:
```
.superpowers/

# claude code session/plugin state
.claude/
```

- [ ] **Step 3: Verify nothing is now staged that shouldn't be**

```bash
git status
```

Expected: only `.gitignore` modified. If `.claude/` was ever tracked, also run:
```bash
git rm -r --cached .claude/ 2>/dev/null || echo "nothing tracked, ok"
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .claude/ session state"
```

---

## Task 2: Replace placeholder email

**Decision required:** Pick the email visitors see on the public site. Existing data uses `jidashuang@outlook.com`. The redesign branch hardcoded `hi@jeremyji.dev` as a placeholder.

Recommended: `jidashuang@outlook.com` (consistent with prior site, Outlook is recruiter-recognizable). If you want a personal domain alias, use `hello@jeremyji.com` or similar — but only if you actually own the inbox.

**Files:**
- Modify: `src/data/interface.ts:42-43`

- [ ] **Step 1: Locate every occurrence**

```bash
grep -rn "hi@jeremyji" --include="*.ts" --include="*.tsx" --include="*.mdx" --include="*.md" .
```

Expected: exactly 2 hits in `src/data/interface.ts` (the TODO comment line and the data line) and maybe 1 in a review doc.

- [ ] **Step 2: Edit `src/data/interface.ts`**

Find lines 42-43:
```ts
  // TODO: 用真实邮箱替换 hi@jeremyji.dev 之前确认。
  { label: "Email", value: "hi@jeremyji.dev", href: "mailto:hi@jeremyji.dev" },
```

Replace with (using `jidashuang@outlook.com`; swap if you chose a different one):
```ts
  { label: "Email", value: "jidashuang@outlook.com", href: "mailto:jidashuang@outlook.com" },
```

- [ ] **Step 3: Verify the placeholder is gone**

```bash
grep -rn "hi@jeremyji" --include="*.ts" --include="*.tsx" --include="*.mdx" src/
```

Expected: empty output.

- [ ] **Step 4: Run unit tests (Zod schema validates email format)**

```bash
npm test -- --run
```

Expected: all 9 tests pass. If a snapshot test for `interface.ts` fails, accept the change with `npm test -- --run -u`.

- [ ] **Step 5: Commit**

```bash
git add src/data/interface.ts
git commit -m "data(interface): replace placeholder email with real address"
```

---

## Task 3: Add gradient tokens to design system

The final review flagged hardcoded hex pairs in `feed-card.tsx:17-19`. The fix is to add named gradient tokens in `tokens.css` and reference them by `var(...)`. This unblocks future theming.

**Files:**
- Modify: `src/app/styles/tokens.css`

- [ ] **Step 1: Open the file and find the accent block (around line 12-15)**

```bash
sed -n '10,16p' src/app/styles/tokens.css
```

Expected output:
```
  /* Accent (one primary, one dark hover, one semantic green) */
  --warm: #c66336;
  --warm-dark: #8b3c1d;
  --green: #1f6b63;
```

- [ ] **Step 2: Append gradient tokens after the accent block**

Use the Edit tool to insert after `--green: #1f6b63;` (line 15 in tokens.css):

```css
  --green-dark: #145954;
  --earth: #b8a584;
  --earth-dark: #8b7757;

  /* Format gradients (consumed by feed-card.tsx) */
  --gradient-article: linear-gradient(135deg, var(--earth), var(--earth-dark));
  --gradient-video: linear-gradient(135deg, var(--warm), var(--warm-dark));
  --gradient-podcast: linear-gradient(135deg, var(--green), var(--green-dark));
```

- [ ] **Step 3: Verify the file parses (no missing brace)**

```bash
node -e "console.log(require('fs').readFileSync('src/app/styles/tokens.css','utf8').match(/--gradient-/g))"
```

Expected: `[ '--gradient-', '--gradient-', '--gradient-' ]`

- [ ] **Step 4: Commit (intentionally before consuming changes — atomic token addition)**

```bash
git add src/app/styles/tokens.css
git commit -m "tokens: add format gradient + earth/green-dark colors"
```

---

## Task 4: Consume gradient tokens in `feed-card.tsx`

**Files:**
- Modify: `src/components/cards/feed-card.tsx:16-22`

- [ ] **Step 1: View current FORMAT_ACCENT map**

```bash
sed -n '15,22p' src/components/cards/feed-card.tsx
```

Expected:
```ts
const FORMAT_ACCENT: Record<FeedItem["format"], string> = {
  article: "linear-gradient(135deg, #b8a584, #8b7757)",
  video:   "linear-gradient(135deg, #c66336, #8b3c1d)",
  podcast: "linear-gradient(135deg, #1f6b63, #145954)",
  note:    "var(--paper-2)",
  source:  "var(--paper-2)",
};
```

- [ ] **Step 2: Replace the three hardcoded gradients with token references**

Using Edit, find:
```ts
  article: "linear-gradient(135deg, #b8a584, #8b7757)",
  video:   "linear-gradient(135deg, #c66336, #8b3c1d)",
  podcast: "linear-gradient(135deg, #1f6b63, #145954)",
```

Replace with:
```ts
  article: "var(--gradient-article)",
  video:   "var(--gradient-video)",
  podcast: "var(--gradient-podcast)",
```

- [ ] **Step 3: Confirm no stray hex literals remain in the file**

```bash
grep -nE "#[0-9a-fA-F]{6}" src/components/cards/feed-card.tsx
```

Expected: empty (no hardcoded hex colors left).

- [ ] **Step 4: Run lint + tests**

```bash
npm run lint && npm test -- --run
```

Expected: lint clean, 9/9 tests pass.

- [ ] **Step 5: Visual check via `npm run dev` (optional but worth 30 seconds)**

```bash
npm run dev
```

Open `http://localhost:3000/thinking-feed`. Verify the article/video/podcast feed cards still show the same colored backgrounds. Stop the dev server (`Ctrl+C`) when done.

- [ ] **Step 6: Commit**

```bash
git add src/components/cards/feed-card.tsx
git commit -m "feed-card: use gradient tokens instead of hardcoded hex"
```

---

## Task 5: Drop CV placeholder files at expected paths

The Proof of Work page links to `/cv/jeremy-ji-cv-en.pdf` and `/cv/jeremy-ji-cv-cn.pdf`. The placeholder `.pdf.placeholder.docx` exists in `public/cv/` but the actual `.pdf` files do not, so the download buttons currently 404.

**For W1 the goal is to make the buttons not 404.** Real CVs come in W3 — for W1 we drop a 1-page placeholder PDF that says "CV updated 2026-05".

**Files:**
- Create: `public/cv/jeremy-ji-cv-en.pdf`
- Create: `public/cv/jeremy-ji-cv-cn.pdf`
- Modify: `public/cv/README.md` (note that W1 placeholders are intentional)

- [ ] **Step 1: Generate placeholder PDFs using `cupsfilter` (built-in on macOS)**

```bash
cat > /tmp/cv-en.txt <<'EOF'
Jeremy Ji — CV (Provisional)

Full bilingual CV in preparation, expected publish: 2026-06.
For an immediate copy in MS Word format, see /JeremyJi-Resume.docx
or email jidashuang@outlook.com.
EOF

cat > /tmp/cv-cn.txt <<'EOF'
吉大双 Jeremy Ji — 简历(临时版)

完整双语简历筹备中,预计 2026-06 上线。
如需即时获取 Word 版本,可见 /JeremyJi-Resume.docx
或邮件 jidashuang@outlook.com。
EOF

cupsfilter /tmp/cv-en.txt > public/cv/jeremy-ji-cv-en.pdf 2>/dev/null
cupsfilter /tmp/cv-cn.txt > public/cv/jeremy-ji-cv-cn.pdf 2>/dev/null
```

`cupsfilter` ships with macOS and outputs PDF directly from text. If it fails on your machine (rare; happens if CUPS is unconfigured), use the manual fallback below.

**Fallback:** Open `/tmp/cv-en.txt` in TextEdit → File → Export as PDF → save to `public/cv/jeremy-ji-cv-en.pdf`. Repeat for `cv-cn.txt`.

- [ ] **Step 2: Verify the files are real PDFs**

```bash
file public/cv/jeremy-ji-cv-en.pdf public/cv/jeremy-ji-cv-cn.pdf
```

Expected: both report `PDF document, version 1.x`.

- [ ] **Step 3: Update `public/cv/README.md`**

Edit `public/cv/README.md`, add at the top (above existing content):

```markdown
> **Status:** W1 placeholders dropped 2026-05-11. Real bilingual CV due W3.
```

- [ ] **Step 4: Verify download buttons no longer 404 by booting dev server**

```bash
npm run dev
```

Open `http://localhost:3000/proof-of-work`, click "↓ Download CV · EN" — should download a PDF. Same for CN.

- [ ] **Step 5: Commit**

```bash
git add public/cv/jeremy-ji-cv-en.pdf public/cv/jeremy-ji-cv-cn.pdf public/cv/README.md
git commit -m "cv: drop W1 placeholder PDFs (EN + CN)"
```

---

## Task 6: Local build + lint + test gate

Before connecting Vercel, ensure the build is green locally. Vercel will run the same `npm run build` so this catches problems in seconds vs minutes.

- [ ] **Step 1: Clean install (catches lockfile drift)**

```bash
rm -rf node_modules .next
npm install
```

Expected: install completes, no lockfile mismatch warnings.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: clean, exit code 0.

- [ ] **Step 3: Test**

```bash
npm test -- --run
```

Expected: 9/9 pass.

- [ ] **Step 4: Production build**

```bash
npm run build
```

Expected: build succeeds, `Generating static pages (33/33)` line appears, no errors. Warnings about image dimensions are acceptable.

- [ ] **Step 5: If build fails, STOP**

Do not proceed to Vercel until local build is green. If errors appear, fix them inline before pushing.

- [ ] **Step 6: Push the polish commits**

```bash
git push origin worktree-redesign-2026-05:main
```

This updates `origin/main` to include all the W1 polish commits. Use `:main` syntax to push the local branch to remote `main`.

Expected: `origin/main` advances by 4 commits (Tasks 1-5).

---

## Task 7: Connect Vercel

**Decision:** Use the Vercel CLI (`vercel` command). Faster than the web UI and the same outcome.

- [ ] **Step 1: Install Vercel CLI if not already installed**

```bash
vercel --version
```

If missing:
```bash
npm install -g vercel@latest
```

- [ ] **Step 2: Log in**

```bash
vercel login
```

Pick "Continue with Email" or "Continue with GitHub" — GitHub is faster since the repo is already there. Follow the prompts in the browser. Return to terminal when logged in.

- [ ] **Step 3: Link the local project to Vercel**

Still in `.claude/worktrees/redesign-2026-05`:

```bash
vercel link
```

Prompts:
- `Set up "..."?` → Y
- `Which scope should contain your project?` → pick your personal account
- `Link to existing project?` → N
- `What's your project's name?` → `jeremyji` (this becomes the subdomain: `jeremyji.vercel.app`)
- `In which directory is your code located?` → `./`

This creates `.vercel/project.json` locally. The `.vercel/` directory is already gitignored.

- [ ] **Step 4: Deploy a preview build**

```bash
vercel
```

Expected output ends with `Preview: https://jeremyji-<hash>-jidashuang.vercel.app`. Open the URL to smoke-test.

- [ ] **Step 5: Connect the Vercel project to GitHub `main` for auto-deploy**

The Vercel CLI does not have a one-shot command for this; do it via the web UI (60 seconds):

1. Open https://vercel.com/dashboard
2. Click the `jeremyji` project
3. Settings → Git → "Connect Git Repository"
4. Authorize GitHub if prompted, select `Jidashuang/JeremyJi`
5. Under "Production Branch", confirm `main` (it's the default GitHub branch since the 2026-05-11 force-push)
6. Save

From now on, every push to `origin/main` triggers a production deploy.

- [ ] **Step 6: Promote to production**

```bash
vercel --prod
```

Expected: `Production: https://jeremyji.vercel.app`. This URL should be live within 60 seconds.

- [ ] **Step 7: Confirm `https://jeremyji.vercel.app` opens and renders Home**

In a browser, visit `https://jeremyji.vercel.app`. The home page should render with:
- Hero with Chinese + Japanese quote cards
- 5 portal cards (Playground / Feed / Gallery / Interface / Proof of Work)
- 6 numbered sections
- Footer with social links

If anything is broken, check Vercel logs:
```bash
vercel logs
```

- [ ] **Step 8: No commit needed — Vercel state lives outside the repo**

`.vercel/` is gitignored. The connection is recorded in your Vercel account.

---

## Task 8: W1 acceptance smoke test

Walk through 5 surfaces on the deployed site and confirm each works.

- [ ] **Step 1: Home (`/`)** — Hero renders, all 5 portal links clickable, no console errors (open browser devtools).

- [ ] **Step 2: Proof of Work (`/proof-of-work`)** — Page loads, both CV download buttons trigger PDF download (not 404).

- [ ] **Step 3: Thinking Feed (`/thinking-feed`)** — Article/video/podcast feed cards show colored backgrounds (the gradient tokens). No layout shift.

- [ ] **Step 4: Interface (`/interface`)** — Email row shows `jidashuang@outlook.com`. Clicking "Email" opens mail client with correct address.

- [ ] **Step 5: Styleguide (`/styleguide`)** — All tokens render, gradient swatches visible (this page exists from the redesign and is the fastest visual QA).

- [ ] **Step 6: Lighthouse spot-check**

In Chrome devtools, run Lighthouse on `/`. Targets (per spec §8.6):
- Performance ≥ 85
- Accessibility ≥ 90

If below, note the gaps in the next plan but do not block W1 closure.

- [ ] **Step 7: Tag the W1 milestone**

```bash
git tag -a w1-baseline-deployed -m "W1 done: ignore .claude, real email, gradient tokens, CV placeholders, Vercel live"
git push origin w1-baseline-deployed
```

- [ ] **Step 8: Write W1 retrospective note (optional)**

Append a 5-line summary to `docs/superpowers/specs/2026-05-11-personal-site-build-plan.md` under a new `## 10. W1 retro` section: what worked, what slipped, any decisions for W2 to adjust.

```bash
git add docs/superpowers/specs/2026-05-11-personal-site-build-plan.md
git commit -m "docs: W1 retro note"
git push origin worktree-redesign-2026-05:main
```

---

## Acceptance criteria for W1

All true at end of W1:

1. `https://jeremyji.vercel.app` is live and renders the home page correctly
2. `.claude/` is gitignored, no plugin state in git
3. No occurrence of `hi@jeremyji.dev` anywhere in the repo
4. `src/components/cards/feed-card.tsx` contains zero `#`-prefixed hex literals
5. Both `/cv/jeremy-ji-cv-*.pdf` paths return a real PDF when fetched
6. `npm run build` finishes green locally
7. `main` branch on GitHub points at the latest polish commits, Vercel auto-deploys on push
8. Git tag `w1-baseline-deployed` exists locally and on origin

---

## What W1 explicitly does NOT include

- Custom domain (deferred to W8 decision)
- Campaign Teardown interactivity (W2)
- Live Agent FAQ wiring (W2)
- Real CV PDFs (W3)
- Any bilingual content (W5)
- Branch cleanup beyond ignoring `.claude/` — `master` and `copilot/*` left alone

If any of these come up mid-W1, defer them — note in the W1 retro and address at the right week.

---

## Risks during W1

| Risk | Trigger | Mitigation |
|---|---|---|
| `next.config.ts` has stale settings that break Vercel | Task 7 step 4 fails | Check build logs; common causes: image domains, MDX config. Spec already validates this — should be fine |
| Email user picked is wrong | Task 8 step 4 reveals typo | Cheap to fix: edit `src/data/interface.ts`, push, Vercel auto-redeploys |
| Lighthouse Performance < 85 | Task 8 step 6 | Defer to W2 — most likely cause is unoptimized images, fix is `next/image` priority flags |
| `vercel.app` is slow in China | Task 8 anyone-can-reach test | Note for W8 (Cloudflare Pages mirror or custom domain) |
