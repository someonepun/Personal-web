import { useId, type ReactNode } from 'react'

// Minimal abstract covers for blog posts. Each is a hand-composed SVG that
// hints at the article's idea; everything is drawn in currentColor so the
// covers follow the black/white theme.

const W = 320
const H = 200
const range = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step)

// Designing Biological Interfaces: a lens bringing part of a dense field into focus
function Lens() {
  const cx = 196
  const cy = 100
  const r = 58
  return (
    <>
      {range(40, 280, 20).flatMap((x) =>
        range(40, 160, 20).map((y) => {
          const inside = Math.hypot(x - cx, y - cy) < r - 4
          return <circle key={`${x}-${y}`} cx={x} cy={y} r={inside ? 2.6 : 1.3} fill="currentColor" opacity={inside ? 1 : 0.28} />
        }),
      )}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx={cx + r * Math.cos(-0.8)} cy={cy + r * Math.sin(-0.8)} r="4" fill="currentColor" />
    </>
  )
}

// ML Models for Protein Folding: a loose chain folding into a compact structure
function Fold() {
  const straight = range(40, 136, 24).map((x) => [x, 148])
  const folded = range(160, 256, 24).flatMap((x, col) => {
    const ys = range(52, 148, 24)
    return (col % 2 === 0 ? ys.reverse() : ys).map((y) => [x, y])
  })
  const chain = [...straight, ...folded]
  const last = folded[folded.length - 1]
  return (
    <>
      <polyline
        points={chain.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        opacity="0.55"
      />
      {straight.map(([x, y]) => (
        <circle key={`s${x}`} cx={x} cy={y} r="3.2" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="1.25" />
      ))}
      {folded.map(([x, y]) => (
        <circle key={`f${x}-${y}`} cx={x} cy={y} r="3.2" fill="currentColor" />
      ))}
      <circle cx={last[0]} cy={last[1]} r="9" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  )
}

// Engineering Scalable Bio-pipelines: inputs converge on one node, then fan out in parallel
function Pipeline() {
  const inputs = [60, 100, 140]
  const outputs = [40, 70, 100, 130, 160]
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      {inputs.map((y) => (
        <path key={`i${y}`} d={`M24 ${y} C72 ${y}, 80 100, 112 100`} opacity="0.45" />
      ))}
      {outputs.map((y) => (
        <g key={`o${y}`}>
          <path d={`M128 100 C170 100, 178 ${y}, 222 ${y} L296 ${y}`} />
          <rect x="254" y={y - 4} width="8" height="8" fill="currentColor" stroke="none" />
        </g>
      ))}
      <circle cx="120" cy="100" r="14" opacity="0.3" />
      <circle cx="120" cy="100" r="6" fill="currentColor" stroke="none" />
    </g>
  )
}

// The Future of Computational Biology: one form, half organic and half computed
function Halftone() {
  const cx = 160
  const cy = 100
  const r = 64
  const dots = range(cx + 4, cx + r, 8).flatMap((x) =>
    range(cy - r, cy + r, 8)
      .filter((y) => Math.hypot(x - cx, y - cy) <= r - 2)
      .map((y) => ({ x, y, size: 3.4 * (1 - (x - cx) / (r + 12)) })),
  )
  return (
    <>
      <path d={`M${cx} ${cy - r} A${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} fill="currentColor" />
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.size} fill="currentColor" />
      ))}
      <line x1={cx} y1="20" x2={cx} y2="180" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </>
  )
}

// Micro- and Nanoplastics: one solid piece fragmenting into ever smaller particles
function Fragments() {
  // Each step: smaller, more numerous, more scattered, fainter
  const steps = [
    { x: 92, n: 1, size: 44, spread: 0, opacity: 1 },
    { x: 152, n: 3, size: 16, spread: 32, opacity: 0.9 },
    { x: 196, n: 6, size: 8, spread: 34, opacity: 0.75 },
    { x: 232, n: 10, size: 4, spread: 44, opacity: 0.6 },
    { x: 262, n: 16, size: 2, spread: 54, opacity: 0.45 },
    { x: 286, n: 22, size: 1.1, spread: 62, opacity: 0.35 },
  ]
  // Deterministic scatter so the cover looks the same on every render
  const jitter = (i: number, k: number) => Math.sin(i * 12.9898 + k * 78.233) * 0.5
  return (
    <>
      {steps.map((st, si) =>
        Array.from({ length: st.n }, (_, i) => {
          const y = 100 + (st.n === 1 ? 0 : ((i + 0.5) / st.n - 0.5) * st.spread * 2) + jitter(i, si) * 8
          const x = st.x + jitter(i + 7, si) * st.spread * 0.4
          const r = (jitter(i, si + 3) * 70 + si * 9) % 90
          return st.size > 3 ? (
            <rect
              key={`${si}-${i}`}
              x={x - st.size / 2}
              y={y - st.size / 2}
              width={st.size}
              height={st.size}
              rx={st.size * 0.18}
              fill="currentColor"
              opacity={st.opacity}
              transform={`rotate(${si === 0 ? 0 : r} ${x} ${y})`}
            />
          ) : (
            <circle key={`${si}-${i}`} cx={x} cy={y} r={st.size} fill="currentColor" opacity={st.opacity} />
          )
        }),
      )}
      <line x1="40" y1="160" x2="292" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <text x="40" y="176" fill="currentColor" opacity="0.45" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.6">
        5 mm
      </text>
      <text x="292" y="176" fill="currentColor" opacity="0.45" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.6" textAnchor="end">
        &lt; 1 µm
      </text>
    </>
  )
}

// Fallback for new posts: concentric arcs whose count and accent follow the id
function Arcs({ seed }: { seed: string }) {
  const hash = [...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
  const count = 3 + (hash % 4)
  const angle = -Math.PI / 2 + ((hash >> 3) % 60) / 100
  const ox = 64
  const oy = 168
  const outer = 40 + (count - 1) * 26
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.25">
      {Array.from({ length: count }, (_, i) => {
        const rr = 40 + i * 26
        return <path key={rr} d={`M${ox} ${oy - rr} A${rr} ${rr} 0 0 1 ${ox + rr} ${oy}`} opacity={0.3 + (0.7 * (i + 1)) / count} />
      })}
      <circle cx={ox + outer * Math.cos(angle + 0.9)} cy={oy + outer * Math.sin(angle + 0.9)} r="6" fill="currentColor" stroke="none" />
    </g>
  )
}

const covers: Record<string, () => ReactNode> = {
  'designing-biological-interfaces': Lens,
  'ml-models-protein-folding': Fold,
  'engineering-scalable-bio-pipelines': Pipeline,
  'future-computational-biology': Halftone,
  'micro-and-nanoplastics': Fragments,
}

export function BlogCover({ id, image, className = '' }: { id: string; image?: string; className?: string }) {
  const glow = useId()
  const Art = covers[id]
  if (image) {
    return (
      <div className={`overflow-hidden rounded-xl bg-muted ${className}`}>
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    )
  }
  return (
    <div className={`overflow-hidden rounded-xl bg-muted text-foreground ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="presentation" aria-hidden="true">
        <defs>
          <radialGradient id={glow} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.07" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${glow})`} />
        <g className="origin-center transition-transform duration-700 ease-out [transform-box:fill-box] group-hover:scale-[1.04]">
          {Art ? <Art /> : <Arcs seed={id} />}
        </g>
      </svg>
    </div>
  )
}
