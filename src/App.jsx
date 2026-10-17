import { useEffect, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGroup from './components/ProjectGroup'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { siteCopy } from './data/siteCopy'
import { copyFor } from './data/projectsCopy'
import { groups } from './data/projectsMeta'
import { startReveals } from './components/motion'
import useCurrentProject from './components/useCurrentProject'
import Striscia from './components/Striscia'
import Righello from './components/Righello'
import Avanzamento from './components/Avanzamento'

// Where each project sits in the index of work: "3 of 16" on its frame.
const POSITIONS = Object.fromEntries(groups.flatMap((g) => g.projects).map((p, i) => [p.id, i + 1]))
const TOTAL = Object.keys(POSITIONS).length

// Until 17/10/2026 the site saved the language under 'af-lingua' even when nobody chose it: the old key goes.
// The choice made with the EN/IT switch is 'af-lingua-scelta' (Navbar.jsx); the redirect before the first
// paint reads it (scripts/prerender.mjs).
try { localStorage.removeItem('af-lingua') } catch { /* private mode, or the build */ }

export default function App({ lang }) {
  const t = siteCopy[lang]
  const copy = copyFor(lang)
  const current = useCurrentProject()

  useEffect(() => startReveals(), [])

  // Arriving with an anchor (#contact, or the EN/IT switch keeping the place): React rewrites the page the
  // build wrote, so the browser's own jump is lost. One frame later the page has its height again.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (!id) return undefined
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])

  const sections = useMemo(() => [
    ...groups.map((g) => ({ id: g.id, href: `#group-${g.id}`, label: copy.short[g.id] })),
    ...['experience', 'skills', 'contact'].map((id) => ({ id, href: `#${id}`, label: copy.short[id] })),
  ], [copy])

  return (
    <>
      <Navbar t={t} lang={lang} current={current ? { id: current, title: copy.projects[current].title } : null} />
      <main>
        <Hero t={t} copy={copy} />
        <Striscia label={copy.technologies} />
        {groups.map((g) => <ProjectGroup key={g.id} group={g} copy={copy} lang={lang} positions={POSITIONS} total={TOTAL} />)}
        <Experience t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </main>
      <Righello sections={sections} label={copy.frame.where} />
      <Avanzamento sections={sections} />
      <footer className="border-t border-linea py-8">
        <p className="contenitore text-sm text-tenue">{t.footer}</p>
      </footer>
    </>
  )
}
