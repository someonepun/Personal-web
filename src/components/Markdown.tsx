import type { MouseEvent } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { resolveImage } from '../content'

// Typography for Markdown content (blogs, works, services, pages), matching the site's compact black/white scale
function componentsFor(dir: string): Components {
  return {
    h1: ({ children }) => <h2 className="pt-6 text-xl font-medium text-foreground">{children}</h2>,
    h2: ({ id, children }) =>
      // remark-gfm's hidden "Footnotes" heading becomes a visible References label
      id?.endsWith('footnote-label') ? (
        <h2 id={id} className="label mb-4">
          References
        </h2>
      ) : (
        <h2 className="pt-6 text-lg font-medium text-foreground">{children}</h2>
      ),
    h3: ({ children }) => <h3 className="pt-4 text-md font-medium text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="pt-2 text-base font-medium text-foreground">{children}</h4>,
    p: ({ children }) => <p>{children}</p>,
    strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
    a: ({ href, id, children, ...rest }) => {
      const external = href?.startsWith('http')
      // In-page links (footnotes and their back-links) scroll instead of changing the
      // URL hash, which the site uses for page routing
      const onClick = href?.startsWith('#')
        ? (e: MouseEvent) => {
            e.preventDefault()
            document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        : undefined
      if ('data-footnote-ref' in rest) {
        return (
          <a data-footnote-ref id={id} href={href} onClick={onClick} className="ml-0.5 font-mono text-[0.7em] text-foreground no-underline hover:underline">
            [{children}]
          </a>
        )
      }
      return (
        <a
          id={id}
          href={href}
          onClick={onClick}
          data-footnote-backref={'data-footnote-backref' in rest || undefined}
          aria-label={'data-footnote-backref' in rest ? 'Back to text' : undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
        >
          {children}
        </a>
      )
    },
    ul: ({ children }) => <ul className="list-disc space-y-1.5 pl-5 marker:text-muted-foreground">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal space-y-1.5 pl-5 marker:text-muted-foreground">{children}</ol>,
    blockquote: ({ children }) => <blockquote className="border-l border-foreground pl-4 text-foreground">{children}</blockquote>,
    hr: () => <hr className="my-8 border-border" />,
    section: ({ children, ...rest }) =>
      'data-footnotes' in rest ? (
        <section
          data-footnotes
          className="!mt-16 border-t border-border pt-6 text-xs leading-relaxed [&_li]:pl-1 [&_ol]:space-y-2.5 [&_p]:inline"
        >
          {children}
        </section>
      ) : (
        <section>{children}</section>
      ),
    li: ({ id, children }) => <li id={id}>{children}</li>,
    img: ({ src, alt, title }) => (
      <figure className="my-8">
        <img
          src={resolveImage(dir, src)}
          alt={alt ?? ''}
          loading="lazy"
          decoding="async"
          className="w-full rounded-xl border border-border bg-muted"
        />
        {title && <figcaption className="label mt-3 normal-case tracking-normal">{title}</figcaption>}
      </figure>
    ),
    // Fenced code blocks: a scrollable panel; inline code: a subtle chip
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
        {children}
      </pre>
    ),
    code: ({ className, children }) =>
      className || String(children).includes('\n') ? (
        <code className={className}>{children}</code>
      ) : (
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>
      ),
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="border-b border-foreground py-2 pr-4 text-left font-medium text-foreground">{children}</th>,
    td: ({ children }) => <td className="border-b border-border py-2 pr-4">{children}</td>,
  }
}

/** `dir` is the content folder (blogs, works, …) that ./images/ paths are relative to */
export function Markdown({ content, dir }: { content: string; dir: string }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={componentsFor(dir)}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
