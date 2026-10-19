import { useEffect, useRef } from 'react'
import { motionAllowed } from './motion'
import { startFlow } from './titanoFlusso'

// Contour lines of a ridge shaped like Monte Titano: long from north-west to south-east, steep on
// the east side, where the lines crowd together. Drawn once at opening, then they drift slowly with
// the scroll (a pure function of the scroll position). A stylized drawing, not survey data.
// Once drawn, the lines carry information (titanoFlusso.js, on a canvas over the still rings): every few
// seconds a signal leaves the summit and runs out ring by ring, and stretches of the lines run along them.
const RINGS = 13
const POINTS = 120
// The summit sits in the free space under the text column, away from the name and the index.
const CX = 700, CY = 760

function ringPoints(k) {
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
  return pts
}

const toPath = (pts) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z'

const RING_POINTS = Array.from({ length: RINGS }, (_, k) => ringPoints(k))
const PATHS = RING_POINTS.map(toPath)

// Where the summit goes, as a shift of the rings (in drawing units), measured on the page so it fits any screen.
// Phone and tablet: the column is one and the summit would end up under the index of work, so it moves to the
// free space next to the last button of the opening. Computer: it stays where it is, unless its name would
// land on the buttons (a short window, like the installed app on the laptop): then it goes down just enough.
function summitShift(svg) {
  const row = document.querySelector('[data-bottoni]')
  const last = row && row.lastElementChild
  if (!last) return null
  const box = svg.parentElement.getBoundingClientRect()
  const w = box.width, h = svg.getBoundingClientRect().height
  const scale = Math.max(w / 1600, h / 900)
  const sx = box.left + (w - 1600 * scale) / 2 + CX * scale, sy = box.top + (h - 900 * scale) / 2 + CY * scale
  const b = last.getBoundingClientRect()
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const lowest = b.bottom + 50 // the summit's name sits at its height: keep it 50 px under the buttons
    return sy < lowest ? [0, (lowest - sy) / scale] : null
  }
  const free = row.getBoundingClientRect().right - b.right
  const x = free > 60 ? b.right + free / 2 + 8 : box.left + box.width * 0.72
  const y = free > 60 ? b.top + b.height / 2 : b.bottom + 70
  return [(x - sx) / scale, (y - sy) / scale]
}

export default function Titano() {
  const ref = useRef(null)
  const rings = useRef(null)
  const canvas = useRef(null)
  const shift = useRef(null)

  useEffect(() => {
    const place = () => {
      if (!ref.current || !rings.current) return
      const t = summitShift(ref.current)
      shift.current = t
      rings.current.setAttribute('transform', t ? `translate(${t[0].toFixed(1)} ${t[1].toFixed(1)})` : '')
    }
    place()
    const resize = new ResizeObserver(place)
    resize.observe(document.body)
    return () => resize.disconnect()
  }, [])

  // The flow on the canvas, in the SVG's coordinates: the drawing's box is one screen tall from the top of
  // the opening, scaled to cover it (preserveAspectRatio slice), plus the summit shift. The canvas covers only
  // the part of the opening that is not under frosted glass (the bar at the top, the index of work): a change
  // under a backdrop blur makes the browser blur it all again, and that was the lag and the flicker.
  useEffect(() => {
    if (!motionAllowed() || !canvas.current || !('IntersectionObserver' in window)) return undefined
    const mapping = () => {
      const svg = ref.current, box = canvas.current?.parentElement?.getBoundingClientRect()
      if (!svg || !box) return null
      const w = box.width, h = svg.getBoundingClientRect().height
      const scale = Math.max(w / 1600, h / 900)
      const [tx, ty] = shift.current || [0, 0]
      const lift = parseFloat(svg.style.transform.replace(/[^\d.-]/g, '')) || 0 // the scroll drift, same on the canvas
      const bar = document.querySelector('header')?.getBoundingClientRect()
      const index = document.getElementById('work')?.getBoundingClientRect()
      let top = bar ? Math.max(0, bar.bottom - box.top - lift) : 0, right = w, bottom = box.height
      if (index && index.width) {
        if (index.left - box.left > w / 3) right = index.left - box.left // computer: the index stands on the right
        else bottom = Math.min(bottom, index.top - box.top - lift)         // phone: the index comes after the opening
      }
      top = Math.round(top)
      return {
        left: 0, top, width: Math.round(right), height: Math.round(bottom - top), dpr: 1, scale,
        x: (w - 1600 * scale) / 2 + tx * scale, y: (h - 900 * scale) / 2 + ty * scale - top,
      }
    }
    return startFlow({ canvas: canvas.current, ringPoints: RING_POINTS, paths: PATHS, centre: [CX, CY], mapping })
  }, [])

  useEffect(() => {
    if (!motionAllowed()) return undefined
    let frame = 0, last = null
    const move = () => {
      frame = 0
      const y = Math.round(window.scrollY * 0.18)
      if (y === last) return
      last = y
      if (ref.current) ref.current.style.transform = `translateY(${y}px)`
      if (canvas.current) canvas.current.style.transform = `translateY(${y}px)`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(move) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    // The drawing is one screen tall, but the opening can be taller (the index on the 4K desktop): the
    // rings go on past the drawing's box (overflow visible), the layer covers the whole opening and
    // fades out at the bottom instead of ending with a cut.
    <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0,black_14rem,black_85%,transparent)] lg:[mask-image:linear-gradient(to_bottom,black_80%,transparent)]" aria-hidden>
      <svg ref={ref} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 w-full h-[100svh] overflow-visible" fill="none">
        <g ref={rings}>
        {PATHS.map((d, k) => (
          <path key={k} d={d} pathLength="1" className="curva"
            style={{ animationDelay: `${0.1 + k * 0.08}s` }}
            stroke={k === 0 ? 'rgb(var(--azzurro))' : 'rgb(var(--tenue))'}
            strokeOpacity={k === 0 ? 0.8 : k % 4 === 0 ? 0.32 : 0.15}
            strokeWidth={k % 4 === 0 ? 1.6 : 1} />
        ))}
        <circle cx={CX} cy={CY} r="4" fill="rgb(var(--azzurro))" />
        </g>
      </svg>
      <canvas ref={canvas} className="absolute left-0 top-0" />
    </div>
  )
}
