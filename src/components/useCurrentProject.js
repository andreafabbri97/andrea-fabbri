import { useEffect, useState } from 'react'

// Which project the reader is on: the last project section whose top has passed the bar. Outside
// the projects (opening, experience, skills, contact) there is none.
export default function useCurrentProject() {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll('article[id]')]
    if (!sections.length) return undefined
    const BAR = 96
    let frame = 0
    const measure = () => {
      frame = 0
      const tops = sections.map((s) => s.getBoundingClientRect())
      let found = null
      tops.forEach((r, i) => { if (r.top <= BAR && r.bottom > BAR) found = sections[i].id })
      setCurrent((prev) => (prev === found ? prev : found))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return current
}
