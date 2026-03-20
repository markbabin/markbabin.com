---
title: "Building a Personal Website"
date: "2026-03-19"
description: "Some thoughts on building a minimalistic personal website with Next.js and Tailwind CSS."
topic: "Dev"
---

There's something satisfying about building your own corner of the internet. No templates, no page builders — just you and a blank canvas.

## The tech stack

This site is built with **Next.js** and **Tailwind CSS**. Content lives in Markdown files with frontmatter metadata. It's statically generated at build time, so it loads fast and costs almost nothing to host.

```typescript
// Reading markdown files is surprisingly simple
const posts = fs.readdirSync(dir)
  .filter(f => f.endsWith('.md'))
  .map(filename => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
    const { data, content } = matter(raw);
    return { slug: filename.replace(/\.md$/, ''), ...data, content };
  });
```


The goal was minimalism. No analytics, no comments, no JavaScript frameworks fighting for attention. Just words on a page with a clean design that gets out of the way.
Sometimes the best feature is the one you didn't add.
