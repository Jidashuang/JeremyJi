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
