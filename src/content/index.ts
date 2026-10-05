// All site content lives in Markdown files under src/content/ (see _README.md there).
// Each file has a YAML settings block between `---` lines, followed by a Markdown body.

import { load } from 'js-yaml'

const files = import.meta.glob<string>('./**/*.md', { query: '?raw', import: 'default', eager: true })
const images = import.meta.glob<string>('./**/images/*', { query: '?url', import: 'default', eager: true })

type Data = Record<string, unknown>

function parse(raw: string, path: string): { data: Data; body: string } {
  raw = raw.replace(/<!--[\s\S]*?-->/g, '')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { data: {}, body: raw.trim() }
  try {
    const data = load(match[1])
    return { data: data && typeof data === 'object' ? (data as Data) : {}, body: raw.slice(match[0].length).trim() }
  } catch (err) {
    // A typo in one file shouldn't take the whole site down; show the body and log why
    console.error(`Could not read the settings block in src/content/${path.slice(2)}:`, err)
    return { data: {}, body: raw.slice(match[0].length).trim() }
  }
}

/** Resolves "./images/x.png" relative to a content folder (e.g. "works"); full URLs pass through */
export function resolveImage(dir: string, src: unknown): string | undefined {
  if (typeof src !== 'string' || !src) return undefined
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) return src
  const key = `./${dir}/${src.replace(/^\.\//, '')}`
  return images[key] ?? src
}

const text = (v: unknown) => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : '')
const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(text).filter(Boolean) : text(v) ? [text(v)] : [])
const isLive = (data: Data) => import.meta.env.DEV || data.draft !== true

export interface Link {
  label: string
  url: string
}
const link = (v: unknown): Link | undefined => {
  const o = v as Data | undefined
  return o && text(o.label) && text(o.url) ? { label: text(o.label), url: text(o.url) } : undefined
}

// Files in one folder, skipping "_" files (templates, guides) and drafts on the live site
function collection(dir: string) {
  return Object.entries(files)
    .filter(([path]) => path.startsWith(`./${dir}/`) && !path.slice(dir.length + 3).includes('/'))
    .map(([path, raw]) => ({ id: path.split('/').pop()!.replace(/\.md$/, ''), path, ...parse(raw, path) }))
    .filter((f) => !f.id.startsWith('_') && isLive(f.data))
}

function single(path: string) {
  const raw = files[`./${path}`]
  return raw ? parse(raw, `./${path}`) : { data: {} as Data, body: '' }
}

// Site-wide settings: name, tagline, social links, contact link
export interface Site {
  name: string
  tagline: string
  contact: string
  socials: Link[]
}
const siteData = single('site.md').data
export const site: Site = {
  name: text(siteData.name),
  tagline: text(siteData.tagline),
  contact: text(siteData.contact),
  socials: Array.isArray(siteData.socials) ? siteData.socials.map(link).filter((l): l is Link => !!l) : [],
}

// Page headers and intros for Home, Works, Services, Blogs
export interface Page {
  eyebrow: string
  title: string
  intro: string
  content: string
  data: Data
}
function page(name: string): Page {
  const { data, body } = single(`pages/${name}.md`)
  return { eyebrow: text(data.eyebrow), title: text(data.title), intro: text(data.intro), content: body, data }
}
export const pages = { home: page('home'), works: page('works'), services: page('services'), blogs: page('blogs') }
export const pageText = (p: Page, key: string, fallback: string) => text(p.data[key]) || fallback
export const pageLink = (p: Page, key: string) => link(p.data[key])

const byOrder = (a: { order: number; title: string }, b: { order: number; title: string }) =>
  a.order - b.order || a.title.localeCompare(b.title)

// Works
export interface Screen {
  src: string
  caption?: string
}
export interface Work {
  id: string
  title: string
  order: number
  status: string
  price: string
  summary: string
  cover?: string
  features: string[]
  screens: Screen[]
  cta?: Link
  content: string
}
export const works: Work[] = collection('works')
  .map(({ id, data, body }) => ({
    id,
    title: text(data.title) || id,
    order: Number(data.order ?? 999),
    status: text(data.status),
    price: text(data.price),
    summary: text(data.summary),
    cover: resolveImage('works', data.cover),
    features: list(data.features),
    screens: (Array.isArray(data.screens) ? data.screens : [])
      .map((s): Screen | null => {
        const o = (typeof s === 'string' ? { src: s } : s) as Data
        const src = resolveImage('works', o?.src)
        return src ? { src, caption: text(o.caption) || undefined } : null
      })
      .filter((s): s is Screen => !!s),
    cta: link(data.cta),
    content: body,
  }))
  .sort(byOrder)

// Services
export interface Service {
  id: string
  title: string
  order: number
  summary: string
  deliverables: string[]
  cta?: Link
  content: string
}
export const services: Service[] = collection('services')
  .map(({ id, data, body }) => ({
    id,
    title: text(data.title) || id,
    order: Number(data.order ?? 999),
    summary: text(data.summary),
    deliverables: list(data.deliverables),
    cta: link(data.cta),
    content: body,
  }))
  .sort(byOrder)

// Blogs
export interface Article {
  id: string
  title: string
  date: string // display form, e.g. "Oct 2026"
  sortDate: number
  excerpt: string
  content: string
  tags: string[]
  readTime: string
  cover?: string
}
export const articles: Article[] = collection('blogs')
  .map(({ id, data, body }) => {
    // YAML turns 2026-10-05 into a Date; quoted or other formats arrive as text
    const parsed = data.date instanceof Date ? data.date : new Date(text(data.date))
    const valid = !Number.isNaN(parsed.getTime())
    const words = body.split(/\s+/).filter(Boolean).length
    const firstParagraph = body.split(/\n\s*\n/).find((p) => p.trim() && !/^(#|!\[|```|>|-|\d+\.)/.test(p.trim()))
    return {
      id,
      title: text(data.title) || id,
      date: valid ? parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : text(data.date),
      sortDate: valid ? parsed.getTime() : 0,
      excerpt: text(data.excerpt) || (firstParagraph ?? '').replace(/[*_`[\]]/g, '').slice(0, 160),
      content: body,
      tags: list(data.tags),
      readTime: text(data.readTime) || `${Math.max(1, Math.round(words / 200))} min read`,
      cover: resolveImage('blogs', data.cover),
    }
  })
  .sort((a, b) => b.sortDate - a.sortDate)
