import { useEffect, useRef } from 'react'
import { motionAllowed } from './motion'

// Contour lines of a ridge shaped like Monte Titano: long from north-west to south-east, steep on
// the east side, where the lines crowd together. Drawn once at opening, then they drift slowly with
// the scroll (a pure function of the scroll position). A stylized drawing, not survey data.
const RINGS = 13
const POINTS = 120
// The summit sits in the free space under the text column, away from the name and the index.
const CX = 700, CY = 760

function ring(k) {
  const cx = CX, cy = CY, rot = -0.6
  const base = 34 + k * 46
  const pts = []
  for (let i = 0; i <= POINTS; i++) {
    const t = (i / POINTS) * Math.PI * 2
    const cliff = 1 - 0.22 * Math.max(0, Math.cos(t - 0.15))
    const wobble = 1 + 0.07 * Math.sin(3 * t + k * 0.7) + 0.04 * Math.sin(5 * t - k * 1.3)
    const r = base * cliff * wobble
    const x = Math.cos(t) * r * 1.7, y = Math.sin(t) * r * 0.85
    pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)])
  }
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z'
}

const PATHS = Array.from({ length: RINGS }, (_, k) => ring(k))

export default function Titano({ label }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!motionAllowed()) return undefined
    let frame = 0, last = null
    const move = () => {
      frame = 0
      const y = Math.round(window.scrollY * 0.18)
      if (y !== last && ref.current) { ref.current.style.transform = `translateY(${y}px)`; last = y }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(move) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    // The drawing is one screen tall, but the opening can be taller (the index on the 4K desktop): the
    // rings go on past the drawing's box (overflow visible), the layer covers the whole opening and
    // fades out at the bottom instead of ending with a cut.
    <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0,black_45%,black_85%,transparent)] lg:[mask-image:linear-gradient(to_bottom,black_80%,transparent)]" aria-hidden>
      <svg ref={ref} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 w-full h-[100svh] overflow-visible" fill="none">
        {PATHS.map((d, k) => (
          <path key={k} d={d} pathLength="1" className="curva"
            style={{ animationDelay: `${0.1 + k * 0.08}s` }}
            stroke={k === 0 ? 'rgb(var(--azzurro))' : 'rgb(var(--tenue))'}
            strokeOpacity={k === 0 ? 0.8 : k % 4 === 0 ? 0.32 : 0.15}
            strokeWidth={k % 4 === 0 ? 1.6 : 1} />
        ))}
        <circle cx={CX} cy={CY} r="4" fill="rgb(var(--azzurro))" />
        <text x={CX - 72} y={CY + 5} textAnchor="end" className="hidden lg:block" fontSize="14" fill="rgb(var(--tenue))" fontFamily="'Bricolage Grotesque', sans-serif">{label}</text>
      </svg>
    </div>
  )
}
