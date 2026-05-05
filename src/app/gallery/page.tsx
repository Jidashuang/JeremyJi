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
              <div
                style={{
                  aspectRatio: "4 / 3",
                  position: "relative",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
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
