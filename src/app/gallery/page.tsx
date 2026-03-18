import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Gallery | Jeremy Ji",
  description:
    "Photography and visual notes by Jeremy Ji — street, architecture, and everyday Japan.",
};

const fallbackPhotos = [
  { src: "/gallery-tokyo-night.jpg", alt: "Tokyo street at night, neon Signs reflected on wet pavement" },
  { src: "/gallery-train.jpg", alt: "Light trails at a Tokyo station platform at night" },
  { src: "/gallery-market.jpg", alt: "Inside a traditional Japanese shotengai shopping arcade" },
  { src: "/gallery-concrete.jpg", alt: "Brutalist concrete architecture facade, Japan" },
  { src: "/stephen-shore-cover.jpg", alt: "Design and photography reference" },
  { src: "/studio-note.jpg", alt: "Studio visual note" },
  { src: "/notion-hero-photo.jpg", alt: "Visual reference from the archive" },
  { src: "/jeremy-portrait.jpg", alt: "Portrait illustration" },
];

async function getInstagramPhotos() {
  const targetDir = path.join(process.cwd(), "public", "instagram");
  try {
    const files = await fs.readdir(targetDir, { withFileTypes: true });
    const images = files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => /\.(jpg|jpeg|png|webp)$/i.test(name))
      .filter((name) => !name.includes("profile_pic"))
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 12)
      .map((name) => ({
        src: `/instagram/${name}`,
        alt: `Visual note — ${name.split("_")[1] ?? ""}`,
      }));
    return images;
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const instagramImages = await getInstagramPhotos();
  const photos = instagramImages.length > 0 ? instagramImages : fallbackPhotos;

  return (
    <SiteShell current="gallery">
      <section className="section area-shell">
        <div className="area-topline">
          <Link className="back-link" href="/">
            Back to Home
          </Link>
          <span className="area-kicker">Photography / Visual notes</span>
        </div>

        <div className="gallery-hero">
          <div className="area-copy">
            <p className="eyebrow">Photography / Visual notes</p>
            <h1 className="area-title">Gallery</h1>
            <p className="area-summary">
              我喜欢拍照不是为了记录，是因为照片里能抓住语言抓不住的东西：光线的温度、
              街道的节奏、人群里的那种孤独感。这里是我镜头里的日本和别处。
            </p>
          </div>

          <div className="gallery-hero-image">
            <Image
              src="/gallery-tokyo-night.jpg"
              alt="Tokyo at night"
              width={800}
              height={800}
            />
          </div>
        </div>

        <article className="area-card">
          <p className="card-kicker">Selected shots</p>
          <div className="gallery-grid">
            {photos.map((item) => (
              <a
                className="gallery-card"
                key={item.src}
                href="https://www.instagram.com/jeremyjee/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="gallery-image">
                  <Image src={item.src} alt={item.alt} width={800} height={800} />
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="area-card">
          <p className="card-kicker">Follow on Instagram</p>
          <div className="gallery-cta-block">
            <p>更多照片和日常视觉笔记在 Instagram。</p>
            <a
              className="button button-inline"
              href="https://www.instagram.com/jeremyjee/"
              target="_blank"
              rel="noreferrer"
            >
              @jeremyjee ↗
            </a>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
