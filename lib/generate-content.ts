import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { codeToHtml } from "shiki";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  html: string;
  rating?: number;
  topic?: string;
}

const contentDir = path.join(process.cwd(), "content");
const publicDir = path.join(process.cwd(), "public");

async function renderMarkdown(source: string): Promise<string> {
  // Use a simple markdown-to-html approach with shiki for code blocks
  const { unified } = await import("unified");
  const remarkParse = (await import("remark-parse")).default;
  const remarkRehype = (await import("remark-rehype")).default;
  const rehypeStringify = (await import("rehype-stringify")).default;
  const rehypeRaw = (await import("rehype-raw")).default;

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(source);

  let html = String(result);

  // Process code blocks with shiki
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
  const matches = [...html.matchAll(codeBlockRegex)];
  for (const match of matches) {
    const lang = match[1];
    const code = match[2]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    const highlighted = await codeToHtml(code, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
    });
    html = html.replace(match[0], highlighted);
  }

  return html;
}

async function getPosts(section: "writing" | "photos"): Promise<Post[]> {
  const dir = path.join(contentDir, section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const html = await renderMarkdown(content);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        content,
        html,
        ...(data.rating !== undefined ? { rating: data.rating } : {}),
        ...(data.topic ? { topic: data.topic } : {}),
      };
    })
  );

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

async function generateThumbnails(): Promise<string[]> {
  const sharp = (await import("sharp")).default;
  const dir = path.join(publicDir, "photos");
  const thumbDir = path.join(publicDir, "photos", "thumbs");
  if (!fs.existsSync(dir)) return [];
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

  for (const f of files) {
    const src = path.join(dir, f);
    const name = f.replace(/\.[^.]+$/, ".webp");
    const dest = path.join(thumbDir, name);
    if (fs.existsSync(dest)) continue;
    await sharp(src).resize(800).webp({ quality: 75 }).toFile(dest);
    console.log(`  thumb: ${name}`);
  }

  return files.map((f) => `/photos/${f}`);
}

async function main() {
  const data = {
    writing: await getPosts("writing"),
    photos: await getPosts("photos"),
    photoFiles: await generateThumbnails(),
  };

  const outPath = path.join(process.cwd(), "lib", "content-generated.json");
  fs.writeFileSync(outPath, JSON.stringify(data));
  console.log(
    `Generated content: ${data.writing.length} writing, ${data.photos.length} photo posts, ${data.photoFiles.length} photo files`
  );
}

main();
