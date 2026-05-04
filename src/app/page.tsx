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
