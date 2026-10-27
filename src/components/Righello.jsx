import { useEffect, useRef, useState } from 'react'
import { motionAllowed, pageMarks, RULER_QUERY as QUERY, sameMarks } from './motion'

// The ruler on the right (from the animazioni-scroll skill, simple version): a tick every 1%, a number
// every 10, and a needle that reads how far down the page you are. Above it, bottom right, the names
// of the sections stacked: the one you are in stands out, the others are links. On the scale itself, where
// each section starts a longer dark mark, and where each project starts one in the color of its sector,
// over the ticks (asked by Andrea on 17/10/2026; a separate column beside the scale looked messy).
// Only with a mouse and a wide screen: on the phone and the narrow laptop there is no margin for it.
// TOP in rem, like the bar above it (h-16, 4rem), so the gap grows with the page: at a fixed 80 px, on the
// desktop's 3072 the bar reached 80 px too and covered half of the «000%» reading (27/10/2026).
const TOP = '5.5rem', BOTTOM = 24
// A number of the scale closer than this to the needle fades out: its reading («100%») sits on the same line and
// the two read «100%00» (27/10/2026).
const NEAR = 16

export default function Righello({ sections, label }) {
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)
  const [current, setCurrent] = useState(null)
  const [marks, setMarks] = useState([])
  const needle = useRef(null)
  const reading = useRef(null)
  const track = useRef(null)
  const numbers = useRef([])

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const follow = () => setEnabled(media.matches)
    media.addEventListener('change', follow)
    return () => media.removeEventListener('change', follow)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    let frame = 0, lastP = -1, lastRun = -1
    const smooth = motionAllowed()
    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const pct = Math.round(p * 100)
      const run = track.current ? track.current.clientHeight : 0
      if ((pct !== lastP || run !== lastRun) && needle.current) {
        // The needle sits on the tick of the number it shows. It used to sit at the exact p of the moment the number
        // changed, and stay there: it reached 100 at p = 0.995 and stopped 4 px above the 100 tick (and below the 0
        // coming back up; seen by Andrea on 27/10/2026). - 50%: centered on the tick (a plain translateY here used to
        // cancel the class that centers it, and the needle sat half its height too low: Andrea, 17/10/2026).
        needle.current.style.transform = `translateY(calc(${((pct / 100) * run).toFixed(1)}px - 50%))`
        needle.current.style.transition = smooth ? 'transform 0.15s linear' : 'none'
        reading.current.textContent = `${String(pct).padStart(3, '0')}%`
        numbers.current.forEach((el, i) => { if (el) el.style.opacity = Math.abs(pct - i * 10) * run / 100 < NEAR ? '0' : '' })
        lastP = pct
        lastRun = run
      }
      // the section whose top has passed 40% of the screen
      let found = null
      for (const s of sections) {
        const el = document.querySelector(`[data-sezione="${s.id}"]`)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) found = s.id
      }
      setCurrent((prev) => (prev === found ? prev : found))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    const place = () => { const next = pageMarks(sections); setMarks((prev) => (sameMarks(prev, next) ? prev : next)) }
    const resize = new ResizeObserver(() => { place(); onScroll() })
    resize.observe(document.body)
    place()
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); resize.disconnect(); cancelAnimationFrame(frame) }
  }, [enabled, sections])

  if (!enabled) return null

  return (
    <>
      <div className="fixed right-0 w-11 z-30 pointer-events-none" style={{ top: TOP, bottom: BOTTOM }} aria-hidden>
        <div ref={track} className="relative h-full">
          {Array.from({ length: 101 }, (_, i) => (
            <span key={i} className="absolute right-0 h-px bg-tenue/40"
              style={{ top: `${i}%`, width: i % 10 === 0 ? 18 : i % 5 === 0 ? 12 : 6 }} />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} ref={(el) => { numbers.current[i] = el }}
              className="cifre absolute right-6 -translate-y-1/2 text-[10px] text-tenue/70 transition-opacity duration-150" style={{ top: `${i * 10}%` }}>{i * 10}</span>
          ))}
          {marks.map((m, i) => (
            <span key={i} className={`absolute right-0 -translate-y-1/2 h-[2px] ${m.big ? 'w-[22px] bg-inchiostro/80' : 'w-[14px]'}`}
              style={{ top: `${(m.at * 100).toFixed(2)}%`, ...(m.big ? {} : { backgroundColor: `oklch(var(--tinta-l) var(--tinta-c) ${m.hue || 235})` }) }} />
          ))}
          <div ref={needle} className="absolute right-0 top-0 flex items-center gap-1 -translate-y-1/2">
            <span ref={reading} className="cifre text-[10px] font-semibold text-azzurro" />
            <span className="w-7 h-[2px] bg-azzurro" />
          </div>
        </div>
      </div>
      <nav aria-label={label} className="fixed right-14 bottom-6 z-30 flex flex-col items-end gap-0.5">
        {sections.map((s) => (
          <a key={s.id} href={s.href}
            className={`leading-tight transition-all duration-300 ${current === s.id ? 'largo text-lg font-extrabold text-inchiostro' : 'text-[0.8rem] font-medium text-tenue/70 hover-testo'}`}>
            {s.label}
          </a>
        ))}
      </nav>
    </>
  )
}
