// Blog posts: every Markdown file in src/content/blogs/ becomes a post.
//
// - The filename is the post's URL id (rna-seq.md -> #blogs/rna-seq)
// - Files starting with "_" (like _template.md) are ignored
// - Images live in src/content/blogs/images/ and are referenced as ./images/name.png
// - Posts with `draft: true` show while developing locally but not on the live site

export interface Article {
  id: string
  title: string
  date: string // display form, e.g. "Oct 2026"
  sortDate: number
  excerpt: string
  content: string // Markdown body
  tags: string[]
  readTime: string
  cover?: string // resolved image URL; without it the drawn cover is used
}

const files = import.meta.glob<string>('./blogs/*.md', { query: '?raw', import: 'default', eager: true })
const images = import.meta.glob<string>('./blogs/images/*', { query: '?url', import: 'default', eager: true })

type Frontmatter = Record<string, string | string[] | boolean>

// Small YAML subset: `key: value`, `key: [a, b]`, quoted strings, true/false, # comments
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { data: {}, body: raw }
  const data: Frontmatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([\w-]+)\s*:\s*(.*)$/)
    if (!m) continue
    const value = m[2].replace(/\s+#.*$/, '').trim()
    const unquote = (v: string) => v.trim().replace(/^(['"])(.*)\1$/, '$2')
    if (value.startsWith('[') && value.endsWith(']')) {
      data[m[1]] = value.slice(1, -1).split(',').map(unquote).filter(Boolean)
    } else if (value === 'true' || value === 'false') {
      data[m[1]] = value === 'true'
    } else {
      data[m[1]] = unquote(value)
    }
  }
  return { data, body: raw.slice(match[0].length) }
}

/** Maps "./images/x.png" (or "images/x.png") to its built URL; other URLs pass through */
export function resolveImage(src: string | undefined) {
  if (!src) return undefined
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) return src
  const key = './blogs/' + src.replace(/^\.\//, '')
  return images[key] ?? src
}

const str = (v: Frontmatter[string] | undefined) => (typeof v === 'string' ? v : '')

function toArticle(path: string, raw: string): (Article & { draft: boolean }) | null {
  const id = path.split('/').pop()!.replace(/\.md$/, '')
  if (id.startsWith('_')) return null
  const { data, body } = parseFrontmatter(raw)

  const parsed = new Date(str(data.date))
  const valid = !Number.isNaN(parsed.getTime())
  const words = body.split(/\s+/).filter(Boolean).length
  const firstParagraph = body
    .split(/\n\s*\n/)
    .find((p) => p.trim() && !/^(#|!\[|```|>|-|\d+\.)/.test(p.trim()))

  return {
    id,
    title: str(data.title) || id,
    date: valid ? parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : str(data.date),
    sortDate: valid ? parsed.getTime() : 0,
    excerpt: str(data.excerpt) || (firstParagraph ?? '').replace(/[*_`[\]]/g, '').slice(0, 160),
    content: body.trim(),
    tags: Array.isArray(data.tags) ? data.tags : str(data.tags) ? [str(data.tags)] : [],
    readTime: str(data.readTime) || `${Math.max(1, Math.round(words / 200))} min read`,
    cover: resolveImage(str(data.cover) || undefined),
    draft: data.draft === true,
  }
}

export const articles: Article[] = Object.entries(files)
  .map(([path, raw]) => toArticle(path, raw))
  .filter((a): a is Article & { draft: boolean } => a !== null && (import.meta.env.DEV || !a.draft))
  .sort((a, b) => b.sortDate - a.sortDate)
