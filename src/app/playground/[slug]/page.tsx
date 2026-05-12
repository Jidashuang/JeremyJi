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
