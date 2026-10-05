import { lazy, Suspense, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, ArrowLeft, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { articles, pageLink, pages, pageText, services, site, works, type Article, type Service, type Work } from './content'
import { BlogCover } from './components/BlogCover'
import { ScreenGallery } from './components/ScreenGallery'
import { sfx } from './lib/sfx'
import './App.css'

// Markdown rendering is only needed on detail pages, so load it on demand
const Markdown = lazy(() => import('./components/Markdown').then((m) => ({ default: m.Markdown })))

type Section = 'home' | 'works' | 'services' | 'blogs'

const menu: { id: Section; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'works', label: 'Works' },
  { id: 'services', label: 'Services' },
  { id: 'blogs', label: 'Blogs' },
]

// Routing: #section or #section/item-id, so back/forward and refresh work
function parseHash(): { section: Section; itemId: string | null } {
  const [section, itemId] = window.location.hash.replace(/^#\/?/, '').split('/')
  const valid = menu.some((m) => m.id === section)
  return { section: valid ? (section as Section) : 'home', itemId: valid ? itemId || null : null }
}

function useHashRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

const go = (section: Section, itemId?: string) => {
  window.location.hash = itemId ? `${section}/${itemId}` : section
}

// Theme: dark (black/white) by default, persisted per visitor
function useTheme() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // storage unavailable; theme still applies for this visit
    }
  }, [isDark])
  return { isDark, toggle: () => setIsDark((d) => !d) }
}

// Shared building blocks
function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: ReactNode }) {
  return (
    <header className="mb-10">
      {eyebrow && <p className="label mb-3">{eyebrow}</p>}
      <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
      {intro && <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </header>
  )
}

function BackLink({ section, label }: { section: Section; label: string }) {
  return (
    <button
      onClick={() => go(section)}
      className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

function Row({
  index,
  title,
  meta,
  description,
  onClick,
}: {
  index: number
  title: string
  meta?: string
  description: string
  onClick: () => void
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group grid w-full grid-cols-[2rem_1fr] gap-x-3 border-t border-border py-5 text-left"
      >
        <span className="label pt-0.5">{String(index + 1).padStart(2, '0')}</span>
        <span>
          <span className="flex items-baseline justify-between gap-4">
            <span className="flex items-center gap-1.5 text-md font-medium">
              {title}
              <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
            {meta && <span className="label shrink-0">{meta}</span>}
          </span>
          <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{description}</span>
        </span>
      </button>
    </li>
  )
}

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="label mb-3">{title}</h2>
      <ul className="border-t border-border">
        {items.map((item) => (
          <li key={item} className="border-b border-border py-2.5 text-sm text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

function PrimaryButton({ children, href }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href ?? site.contact}
      target="_blank"
      rel="noreferrer"
      className="mt-10 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-80"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

// Markdown body of a page or item; renders nothing when the file has no body
function Body({ content, dir }: { content: string; dir: string }) {
  if (!content) return null
  return (
    <Suspense fallback={<div className="h-48" />}>
      <Markdown content={content} dir={dir} />
    </Suspense>
  )
}

function BlogGrid({ items }: { items: Article[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
      {items.map((a) => (
        <li key={a.id}>
          <button onClick={() => go('blogs', a.id)} className="group block w-full text-left">
            <BlogCover id={a.id} image={a.cover} className="aspect-[16/10]" />
            <span className="label mt-4 block">
              {a.date} · {a.readTime}
            </span>
            <span className="mt-1.5 block text-md font-medium group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
              {a.title}
            </span>
            <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{a.excerpt}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

// Sections
function Home() {
  const page = pages.home
  return (
    <div>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      {page.content && (
        <div className="-mt-4 mb-12">
          <Body content={page.content} dir="pages" />
        </div>
      )}

      {articles.length > 0 && (
        <section className="mb-12">
          <h2 className="label mb-4 border-b border-border pb-3">{pageText(page, 'latestWriting', 'Latest writing')}</h2>
          <BlogGrid items={articles.slice(0, 2)} />
          <button onClick={() => go('blogs')} className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            All blogs →
          </button>
        </section>
      )}

      {works.length > 0 && (
        <section>
          <h2 className="label mb-1">{pageText(page, 'selectedWorks', 'Selected works')}</h2>
          <ul>
            {works.map((w, i) => (
              <Row key={w.id} index={i} title={w.title} meta={w.status} description={w.summary} onClick={() => go('works', w.id)} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function WorkGrid({ items }: { items: Work[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
      {items.map((w) => (
        <li key={w.id}>
          <button onClick={() => go('works', w.id)} className="group block w-full text-left">
            <BlogCover id={w.id} image={w.cover ?? w.screens[0]?.src} className="aspect-[16/10]" />
            <span className="label mt-4 block">{[w.status, w.price].filter(Boolean).join(' · ')}</span>
            <span className="mt-1.5 block text-md font-medium group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
              {w.title}
            </span>
            <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{w.summary}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function Works({ selected }: { selected?: Work }) {
  if (selected) {
    return (
      <article>
        <BackLink section="works" label="Works" />
        <PageHeader eyebrow={[selected.status, selected.price].filter(Boolean).join(' · ')} title={selected.title} intro={selected.summary} />
        {selected.screens.length > 0 ? (
          <ScreenGallery screens={selected.screens} title={selected.title} />
        ) : (
          selected.cover && <BlogCover id={selected.id} image={selected.cover} className="mb-10 aspect-[16/9]" />
        )}
        <Body content={selected.content} dir="works" />
        {selected.features.length > 0 && <CheckList title="Features" items={selected.features} />}
        {selected.cta && <PrimaryButton href={selected.cta.url}>{selected.cta.label}</PrimaryButton>}
      </article>
    )
  }
  const page = pages.works
  return (
    <div>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Body content={page.content} dir="pages" />
      <WorkGrid items={works} />
    </div>
  )
}

function Services({ selected }: { selected?: Service }) {
  if (selected) {
    return (
      <article>
        <BackLink section="services" label="Services" />
        <PageHeader eyebrow="Service" title={selected.title} intro={selected.summary} />
        <Body content={selected.content} dir="services" />
        {selected.deliverables.length > 0 && <CheckList title="What you get" items={selected.deliverables} />}
        {selected.cta && <PrimaryButton href={selected.cta.url}>{selected.cta.label}</PrimaryButton>}
      </article>
    )
  }
  const page = pages.services
  const cta = pageLink(page, 'cta')
  return (
    <div>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Body content={page.content} dir="pages" />
      <ul>
        {services.map((s, i) => (
          <Row key={s.id} index={i} title={s.title} description={s.summary} onClick={() => go('services', s.id)} />
        ))}
      </ul>
      {cta && <PrimaryButton href={cta.url}>{cta.label}</PrimaryButton>}
    </div>
  )
}

function Blogs({ selected }: { selected?: Article }) {
  if (selected) {
    return (
      <article>
        <BackLink section="blogs" label="Blogs" />
        <BlogCover id={selected.id} image={selected.cover} className="mb-10 aspect-[16/9]" />
        <PageHeader eyebrow={`${selected.date} · ${selected.readTime}`} title={selected.title} />
        {selected.tags.length > 0 && <p className="label -mt-6 mb-8">{selected.tags.join(' / ')}</p>}
        <Body content={selected.content} dir="blogs" />
      </article>
    )
  }
  const page = pages.blogs
  return (
    <div>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Body content={page.content} dir="pages" />
      <BlogGrid items={articles} />
    </div>
  )
}

function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={() => {
        sfx.toggle(isDark)
        toggle()
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}

function SoundToggle() {
  const on = useSyncExternalStore(sfx.subscribe, () => sfx.enabled)
  return (
    <button
      onClick={() => {
        sfx.setEnabled(!on)
        if (!on) sfx.toggle(true)
      }}
      aria-label={on ? 'Mute interface sounds' : 'Enable interface sounds'}
      aria-pressed={on}
      className="inline-flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
    >
      {on ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
    </button>
  )
}

function Controls({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle isDark={isDark} toggle={toggle} />
      <SoundToggle />
    </div>
  )
}

// Main App
function App() {
  const { section, itemId } = useHashRoute()
  const { isDark, toggle } = useTheme()

  // Scroll the content column back to top on navigation
  useEffect(() => {
    document.getElementById('content')?.scrollTo({ top: 0 })
  }, [section, itemId])

  const content = {
    home: <Home />,
    works: <Works selected={works.find((w) => w.id === itemId)} />,
    services: <Services selected={services.find((s) => s.id === itemId)} />,
    blogs: <Blogs selected={articles.find((a) => a.id === itemId)} />,
  }[section]

  return (
    <div className="flex h-full flex-col bg-background text-foreground md:flex-row">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col gap-6 border-b border-border px-5 py-5 md:h-full md:w-56 md:border-b-0 md:border-r md:px-8 md:py-10">
        <div className="flex items-center justify-between">
          <button onClick={() => go('home')} className="text-left">
            <span className="block text-sm font-medium">{site.name}</span>
            {site.tagline && <span className="label mt-0.5 block">{site.tagline}</span>}
          </button>
          <div className="md:hidden">
            <Controls isDark={isDark} toggle={toggle} />
          </div>
        </div>

        <nav className="md:mt-8">
          <ul className="flex gap-5 md:flex-col md:gap-1">
            {menu.map((item, i) => {
              const active = section === item.id
              return (
                <li key={item.id}>
                  <button
                    onPointerEnter={(e) => e.pointerType === 'mouse' && sfx.hover(i)}
                    onClick={() => {
                      sfx.click(i)
                      go(item.id)
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex items-center gap-3 py-1 text-sm ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <span className="label hidden md:inline">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`transition-transform duration-300 ease-out md:group-hover:translate-x-0.5 ${active ? 'underline decoration-1 underline-offset-[6px]' : ''}`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-auto hidden flex-col gap-5 md:flex">
          <ul className="space-y-1">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <Controls isDark={isDark} toggle={toggle} />
          <p className="label">© {new Date().getFullYear()}</p>
        </div>
      </aside>

      {/* Content */}
      <main id="content" className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-5 py-10 md:px-12 md:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${section}/${itemId ?? ''}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {content}
            </motion.div>
          </AnimatePresence>

          <footer className="mt-16 flex gap-4 border-t border-border pt-6 md:hidden">
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground">
                {s.label} ↗
              </a>
            ))}
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
