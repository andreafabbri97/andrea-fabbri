import { useEffect, useRef, useState } from 'react'
import { motionAllowed, pageMarks, RULER_QUERY, sameMarks } from './motion'

// The short ruler, where the big one on the right does not fit (phone, tablet, narrow laptop): a thin
// line on the bottom edge of the top bar that fills as you read, a tall tick where each section starts
// and a short one where each project starts, in the color of its sector like on the big ruler (Andrea, 17/10/2026).
// No percentage: under the bar it would sit on the text that scrolls by (Andrea, 17/10/2026).
export default function Avanzamento({ sections }) {
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' && !window.matchMedia(RULER_QUERY).matches)
  const [ticks, setTicks] = useState([])
  const fill = useRef(null)

  useEffect(() => {
    const media = window.matchMedia(RULER_QUERY)
    const follow = () => setEnabled(!media.matches)
    media.addEventListener('change', follow)
    return () => media.removeEventListener('change', follow)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    let frame = 0, lastP = -1
    const smooth = motionAllowed()
    // Where sections and projects start (motion.js, pageMarks): measured again when the page changes size (a "Show more" opened, the phone turned).
    const place = () => {
      const next = pageMarks(sections)
      setTicks((prev) => (sameMarks(prev, next) ? prev : next))
    }
    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const step = Math.round(p * 1000)
      if (step === lastP || !fill.current) return
      lastP = step
      const transition = smooth ? 'transform 0.15s linear' : 'none'
      fill.current.style.transform = `scaleX(${p.toFixed(4)})`
      fill.current.style.transition = transition
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    const resize = new ResizeObserver(() => { place(); onScroll() })
    resize.observe(document.body)
    place()
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); resize.disconnect(); cancelAnimationFrame(frame) }
  }, [enabled, sections])

  if (!enabled) return null

  return (
    <div className="fixed inset-x-0 top-16 z-[55] h-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-x-0 -top-[2px] h-[2px]">
        {ticks.map((t, i) => (
          <span key={i} className={`absolute w-px ${t.big ? '-top-[3px] h-[5px] bg-tenue/80' : '-top-px h-[3px]'}`}
            style={{ left: `${(t.at * 100).toFixed(2)}%`, ...(t.big ? {} : { backgroundColor: `oklch(var(--tinta-l) var(--tinta-c) ${t.hue || 235})` }) }} />
        ))}
        <span ref={fill} className="absolute inset-0 origin-left bg-azzurro" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}
