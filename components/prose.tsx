import { MDXRemote } from "next-mdx-remote/rsc";
import { type JSX } from "react";
import { codeToHtml } from "shiki";

async function Code({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const lang = className?.replace("language-", "") ?? "text";
  const html = await codeToHtml(children.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Pre({ children }: { children: JSX.Element }) {
  // next-mdx-remote wraps code blocks in <pre><code>…</code></pre>
  // We intercept <pre> and render Code for the inner <code>
  if (children?.props?.className) {
    return (
      <Code className={children.props.className}>
        {children.props.children}
      </Code>
    );
  }
  return <pre>{children}</pre>;
}

const components = {
  pre: Pre,
};

export function Prose({ content }: { content: string }) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline prose-a:underline-offset-2">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
