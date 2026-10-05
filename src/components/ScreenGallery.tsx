import { useCallback, useEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { Screen } from '../content'
import { sfx } from '../lib/sfx'

const pad = (n: number) => String(n).padStart(2, '0')

// UI screenshots for a work: a swipeable strip that opens into a full-screen viewer
export function ScreenGallery({ screens, title }: { screens: Screen[]; title: string }) {
  const strip = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  const scrollBy = (dir: 1 | -1) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section className="my-12">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
        <h2 className="label">Interface · {pad(screens.length)}</h2>
        {screens.length > 1 && (
          <div className="flex gap-1">
            <StepButton label="Scroll screens left" onClick={() => scrollBy(-1)}>
              <ArrowLeft className="h-3.5 w-3.5" />
            </StepButton>
            <StepButton label="Scroll screens right" onClick={() => scrollBy(1)}>
              <ArrowRight className="h-3.5 w-3.5" />
            </StepButton>
          </div>
        )}
      </div>

      <ul
        ref={strip}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {screens.map((s, i) => (
          <li key={s.src + i} className="shrink-0 snap-start">
            <button
              onClick={() => {
                sfx.click(i)
                setOpen(i)
              }}
              className="group block text-left"
              aria-label={`Open screen ${i + 1}${s.caption ? `: ${s.caption}` : ''}`}
            >
              <span className="block h-48 overflow-hidden rounded-xl border border-border bg-muted md:h-72">
                <img
                  src={s.src}
                  alt={s.caption ?? `${title} screen ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto max-w-[85vw] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] md:max-w-none"
                />
              </span>
              <span className="label mt-2.5 block">
                {pad(i + 1)}
                {s.caption && <span className="ml-2 normal-case tracking-normal text-muted-foreground">{s.caption}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Viewer screens={screens} title={title} index={open} onChange={setOpen} />
    </section>
  )
}

function StepButton({
  label,
  onClick,
  children,
  buttonRef,
}: {
  label: string
  onClick: () => void
  children: ReactNode
  buttonRef?: Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
    >
      {children}
    </button>
  )
}

function Viewer({
  screens,
  title,
  index,
  onChange,
}: {
  screens: Screen[]
  title: string
  index: number | null
  onChange: (i: number | null) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = screens.length

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      const next = (index + dir + count) % count
      sfx.hover(next)
      onChange(next)
    },
    [index, count, onChange],
  )

  useEffect(() => {
    if (index === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, step, onChange])

  const screen = index === null ? null : screens[index]

  return (
    <AnimatePresence>
      {screen && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screens`}
          className="fixed inset-0 z-50 flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8" onClick={(e) => e.stopPropagation()}>
            <span className="label">
              {title} · {pad(index + 1)} / {pad(count)}
            </span>
            <StepButton label="Close" onClick={() => onChange(null)} buttonRef={closeRef}>
              <X className="h-3.5 w-3.5" />
            </StepButton>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 md:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={screen.src + index}
                src={screen.src}
                alt={screen.caption ?? `${title} screen ${index + 1}`}
                className="max-h-full max-w-full cursor-grab rounded-xl border border-border object-contain active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                drag={count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1)
                  else if (info.offset.x > 60) step(-1)
                }}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </AnimatePresence>

            {count > 1 && (
              <div className="pointer-events-none absolute inset-x-3 top-1/2 hidden -translate-y-1/2 justify-between md:flex">
                <span className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                  <StepButton label="Previous screen" onClick={() => step(-1)}>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </StepButton>
                </span>
                <span className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                  <StepButton label="Next screen" onClick={() => step(1)}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </StepButton>
                </span>
              </div>
            )}
          </div>

          <p className="min-h-[3.5rem] px-5 py-4 text-center text-sm text-muted-foreground md:px-8" onClick={(e) => e.stopPropagation()}>
            {screen.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
