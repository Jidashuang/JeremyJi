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
