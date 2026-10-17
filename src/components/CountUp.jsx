import { useEffect, useRef } from 'react'
import { easeOutExpo, formatCount, motionAllowed, parseCount } from './motion'

const DURATION = 1400

// A figure that counts up the first time it comes into view. React renders the final value (that is
// what stays, and what screen readers get); the count writes the visible text directly, one write per
// frame and no React state, as the animazioni-scroll rules ask.
export default function CountUp({ value, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const parsed = parseCount(value)
    if (!el || !parsed || !motionAllowed() || !('IntersectionObserver' in window)) return undefined
    let frame = 0
    el.textContent = formatCount(parsed, 0)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      let last = ''
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / DURATION)
        const text = p >= 1 ? value : formatCount(parsed, parsed.target * easeOutExpo(p))
        if (text !== last) { el.textContent = text; last = text }
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = value
    }
  }, [value])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden>{value}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
