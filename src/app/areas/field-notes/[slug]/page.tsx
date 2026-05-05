import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { fieldNotes } from "@/data/feed/field-notes";

export function generateStaticParams() {
  return fieldNotes.map((n) => ({ slug: n.id.replace(/^note-/, "") }));
}

export default async function FieldNoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = fieldNotes.find((n) => n.id === `note-${slug}`);
  if (!note) return notFound();

  const Body = (await import(`@/data/feed/field-notes/${slug}.mdx`)).default;

  return (
    <SiteShell current="feed">
      <article className="section" style={{ paddingTop: "20px" }}>
        <Eyebrow>{`Field Note · ${note.area} · ${note.date}`}</Eyebrow>
        <h1 className="h-display-l" style={{ marginTop: "12px" }}>{note.title}</h1>
        <div className="measure" style={{ marginTop: "28px" }}>
          <Body />
        </div>
      </article>
    </SiteShell>
  );
}
