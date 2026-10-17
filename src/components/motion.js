// The motion of the page, following the animazioni-scroll recipes of the Second Brain:
// content enters once and stays; nothing moves for people who asked the system to reduce motion.

export const motionAllowed = () =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Reveal: elements with data-reveal start 28 px lower, blurred and transparent, and arrive once when
// they reach 85% of the screen. They are hidden only from here, a moment before animating: without
// this script (or with reduced motion) the page is complete and visible.
export function startReveals() {
  if (!motionAllowed() || !('IntersectionObserver' in window)) return () => {}
  const root = document.documentElement
  root.classList.add('anima')
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.setAttribute('data-visto', '')
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -15% 0px' })
  const watch = () => document.querySelectorAll('[data-reveal]:not([data-visto]), [data-disegna]:not([data-visto])').forEach((el) => io.observe(el))
  watch()
  // Elements that appear later (a language switch re-renders the copy) are picked up too.
  const mo = new MutationObserver(watch)
  mo.observe(document.getElementById('root'), { childList: true, subtree: true })
  return () => { io.disconnect(); mo.disconnect(); root.classList.remove('anima') }
}

// Counting numbers: "2,470+" counts from 0 to 2,470 keeping what is around the number and its
// thousands separator. Values with no number or more than one ("16/16", "WCAG AA") stay as they are.
const NUMBER = /(\d{1,3}(?:[.,]\d{3})+|\d+)/g

export function parseCount(value) {
  const found = String(value).match(NUMBER)
  if (!found || found.length !== 1) return null
  const raw = found[0]
  const sep = raw.length > 3 && /[.,]/.test(raw) ? raw.replace(/\d/g, '')[0] : ''
  const target = Number(raw.replace(/[.,]/g, ''))
  const at = String(value).indexOf(raw)
  return { before: String(value).slice(0, at), after: String(value).slice(at + raw.length), target, sep }
}

export function formatCount({ before, after, sep }, n) {
  const digits = String(Math.round(n))
  const grouped = sep ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : digits
  return `${before}${grouped}${after}`
}

// easeOutExpo: fast start, long gentle landing — the number "settles".
export const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x))
