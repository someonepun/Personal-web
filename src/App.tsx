import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, ArrowLeft, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { articles, products, services, type Article, type Product, type Service } from './data/content'
import { sfx } from './lib/sfx'
import './App.css'

type Section = 'home' | 'works' | 'services' | 'blogs'

const menu: { id: Section; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'works', label: 'Works' },
  { id: 'services', label: 'Services' },
  { id: 'blogs', label: 'Blogs' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/someonepun' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nirajpun/' },
  { label: 'Instagram', href: 'https://www.instagram.com/niraj.pun.magar/' },
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

// Renders **bold** inline
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') ? (
          <strong key={i} className="font-medium text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

function RichText({ content }: { content: string }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
      {content.split('\n\n').map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="pt-4 text-lg font-medium text-foreground">
              {block.slice(3)}
            </h2>
          )
        }
        const lines = block.split('\n').filter((l) => l.trim())
        const isList = lines.length > 1 && lines.slice(1).every((l) => /^(-|\d+\.)\s/.test(l))
        if (isList || /^(-|\d+\.)\s/.test(block)) {
          const intro = /^(-|\d+\.)\s/.test(lines[0]) ? null : lines.shift()
          const ordered = /^\d+\./.test(lines[0])
          const List = ordered ? 'ol' : 'ul'
          return (
            <div key={i}>
              {intro && <p className="mb-2">{intro}</p>}
              <List className={`space-y-1.5 pl-4 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-muted-foreground`}>
                {lines.map((l, j) => (
                  <li key={j}>
                    <Inline text={l.replace(/^(-|\d+\.)\s*/, '')} />
                  </li>
                ))}
              </List>
            </div>
          )
        }
        return (
          <p key={i}>
            <Inline text={block} />
          </p>
        )
      })}
    </div>
  )
}

// Shared building blocks
function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: ReactNode }) {
  return (
    <header className="mb-10">
      <p className="label mb-3">{eyebrow}</p>
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
      href={href ?? socials[1].href}
      target="_blank"
      rel="noreferrer"
      className="mt-10 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-80"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

// Sections
function Home() {
  return (
    <div>
      <PageHeader
        eyebrow="Bioinformatician & Product Designer"
        title="Niraj Pun Magar"
        intro="Designer and engineer working where biology, design, and code meet — building tools that make complex biological data easier to explore."
      />

      <section className="mb-12">
        <h2 className="label mb-1">Latest writing</h2>
        <ul>
          {articles.slice(0, 2).map((a, i) => (
            <Row key={a.id} index={i} title={a.title} meta={a.date} description={a.excerpt} onClick={() => go('blogs', a.id)} />
          ))}
        </ul>
        <button onClick={() => go('blogs')} className="mt-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          All blogs →
        </button>
      </section>

      <section>
        <h2 className="label mb-1">Selected works</h2>
        <ul>
          {products.map((p, i) => (
            <Row key={p.id} index={i} title={p.name} meta={p.status} description={p.description} onClick={() => go('works', p.id)} />
          ))}
        </ul>
      </section>
    </div>
  )
}

function Works({ selected }: { selected?: Product }) {
  if (selected) {
    return (
      <article>
        <BackLink section="works" label="Works" />
        <PageHeader eyebrow={`${selected.status} · ${selected.price}`} title={selected.name} />
        <RichText content={selected.fullDescription} />
        <CheckList title="Features" items={selected.features} />
        {selected.status === 'Available' && <PrimaryButton>Get access</PrimaryButton>}
        {selected.status === 'Beta' && <PrimaryButton>Join beta waitlist</PrimaryButton>}
      </article>
    )
  }
  return (
    <div>
      <PageHeader eyebrow="Works" title="Tools & products" intro="Software for visualizing and analysing biological data." />
      <ul>
        {products.map((p, i) => (
          <Row key={p.id} index={i} title={p.name} meta={p.status} description={p.description} onClick={() => go('works', p.id)} />
        ))}
      </ul>
    </div>
  )
}

function Services({ selected }: { selected?: Service }) {
  if (selected) {
    return (
      <article>
        <BackLink section="services" label="Services" />
        <PageHeader eyebrow="Service" title={selected.title} />
        <RichText content={selected.fullDescription} />
        <CheckList title="What you get" items={selected.deliverables} />
        <PrimaryButton>Discuss your project</PrimaryButton>
      </article>
    )
  }
  return (
    <div>
      <PageHeader
        eyebrow="Services"
        title="Working together"
        intro="Available for freelance projects and collaborations that bridge biology, design, and technology."
      />
      <ul>
        {services.map((s, i) => (
          <Row key={s.id} index={i} title={s.title} description={s.description} onClick={() => go('services', s.id)} />
        ))}
      </ul>
      <PrimaryButton>Get in touch</PrimaryButton>
    </div>
  )
}

function Blogs({ selected }: { selected?: Article }) {
  if (selected) {
    return (
      <article>
        <BackLink section="blogs" label="Blogs" />
        <PageHeader eyebrow={`${selected.date} · ${selected.readTime}`} title={selected.title} />
        <p className="label -mt-6 mb-8">{selected.tags.join(' / ')}</p>
        <RichText content={selected.content} />
      </article>
    )
  }
  return (
    <div>
      <PageHeader eyebrow="Blogs" title="Notes & essays" intro="Writing on bioinformatics, machine learning, and designing scientific software." />
      <ul>
        {articles.map((a, i) => (
          <Row key={a.id} index={i} title={a.title} meta={a.date} description={a.excerpt} onClick={() => go('blogs', a.id)} />
        ))}
      </ul>
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
    works: <Works selected={products.find((p) => p.id === itemId)} />,
    services: <Services selected={services.find((s) => s.id === itemId)} />,
    blogs: <Blogs selected={articles.find((a) => a.id === itemId)} />,
  }[section]

  return (
    <div className="flex h-full flex-col bg-background text-foreground md:flex-row">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col gap-6 border-b border-border px-5 py-5 md:h-full md:w-56 md:border-b-0 md:border-r md:px-8 md:py-10">
        <div className="flex items-center justify-between">
          <button onClick={() => go('home')} className="text-left">
            <span className="block text-sm font-medium">Niraj Pun Magar</span>
            <span className="label mt-0.5 block">Biology × Design × Code</span>
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
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground">
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
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground">
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
