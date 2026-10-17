import { useEffect, useRef, useState } from 'react'
import { motionAllowed } from './motion'

// The ruler on the right (from the animazioni-scroll skill, simple version): a tick every 1%, a number
// every 10, and a needle that reads how far down the page you are. Above it, bottom right, the names
// of the sections stacked: the one you are in stands out, the others are links.
// Only with a mouse and a wide screen: on the phone and the narrow laptop there is no margin for it.
const QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1440px)'
const TOP = 80, BOTTOM = 24

export default function Righello({ sections, label }) {
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)
  const [current, setCurrent] = useState(null)
  const needle = useRef(null)
  const reading = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const follow = () => setEnabled(media.matches)
    media.addEventListener('change', follow)
    return () => media.removeEventListener('change', follow)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    let frame = 0, lastP = -1
    const smooth = motionAllowed()
    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const pct = Math.round(p * 100)
      if (pct !== lastP && needle.current && track.current) {
        const run = track.current.clientHeight
        needle.current.style.transform = `translateY(${(p * run).toFixed(1)}px)`
        needle.current.style.transition = smooth ? 'transform 0.15s linear' : 'none'
        reading.current.textContent = `${String(pct).padStart(3, '0')}%`
        lastP = pct
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
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
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
            <span key={i} className="cifre absolute right-6 -translate-y-1/2 text-[10px] text-tenue/70" style={{ top: `${i * 10}%` }}>{i * 10}</span>
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
