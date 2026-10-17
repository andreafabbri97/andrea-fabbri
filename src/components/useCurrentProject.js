import { useEffect, useState } from 'react'

// Which project the reader is on: the last project section whose top has passed the bar. Outside
// the projects (opening, experience, skills, contact) there is none.
// The line is where a link stops a section (scroll-padding-top, in rem) plus a little margin: it was
// a fixed 96 px, and on the desktop, where the root grows to 22 px, a click stopped the project at
// 110 px and the bar named the one before (seen by Andrea on 17/10/2026).
export default function useCurrentProject() {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll('article[id]')]
    if (!sections.length) return undefined
    const line = () => (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 80) + 16
    let bar = line()
    let frame = 0
    const measure = () => {
      frame = 0
      const tops = sections.map((s) => s.getBoundingClientRect())
      let found = null
      tops.forEach((r, i) => { if (r.top <= bar && r.bottom > bar) found = sections[i].id })
      setCurrent((prev) => (prev === found ? prev : found))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    const onResize = () => { bar = line(); onScroll() }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return current
}
