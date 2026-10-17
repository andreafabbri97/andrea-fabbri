import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

// The bar on top: name, sections, language and theme. On the phone the sections open in a sheet;
// while it is open the page underneath does not scroll (the root is locked, not the body).
// The EN/IT switch links to the other page (one address per language, for the search engines) and saves
// the choice, so the redirect before the first paint respects it next time. The position on the page goes along.
const BASE = import.meta.env.BASE_URL
const PAGE = { en: BASE, it: `${BASE}it/` }
const choose = (l) => (e) => {
  try { localStorage.setItem('af-lingua-scelta', l) } catch { /* private mode: the link still works */ }
  e.currentTarget.href = PAGE[l] + location.hash
}

export default function Navbar({ t, lang, current }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#work', label: t.ui.work },
    { href: '#experience', label: t.nav[0] },
    { href: '#skills', label: t.nav[1] },
    { href: '#contact', label: t.nav[2] },
  ]

  useEffect(() => {
    const root = document.documentElement
    if (!open) return undefined
    const gap = window.innerWidth - root.clientWidth
    root.style.overflow = 'hidden'
    root.style.paddingRight = gap ? `${gap}px` : ''
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      root.style.paddingRight = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const LangSwitch = (
    <div className="inline-flex w-fit items-center rounded-full border border-linea p-0.5 text-sm font-semibold" role="group" aria-label={t.ui.language}>
      {['en', 'it'].map((l) => (
        <a
          key={l}
          href={PAGE[l]}
          hrefLang={l}
          lang={l}
          onClick={choose(l)}
          aria-current={lang === l ? 'page' : undefined}
          className={`inline-flex items-center px-3 h-8 rounded-full uppercase tracking-wide transition-colors ${lang === l ? 'bg-inchiostro text-carta' : 'text-tenue hover-testo'}`}
        >
          {l}
        </a>
      ))}
    </div>
  )

  return (
    <>
    {/* The dimmed page behind the phone sheet. Outside the header: its backdrop blur would trap a
        fixed child inside the bar. */}
    <div
      className={`md:hidden fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setOpen(false)}
      aria-hidden
    />
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-linea transition-colors ${open ? 'bg-carta' : 'bg-carta/85'}`}>
      <div className="contenitore h-16 flex items-center justify-between gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* The name, and next to it (under it on the phone) the project being read. */}
        <div className="min-w-0 flex flex-col lg:flex-row lg:items-baseline lg:gap-3">
          <a href="#top" className="titolo text-lg font-extrabold text-inchiostro whitespace-nowrap leading-tight">Andrea Fabbri</a>
          {current && (
            <a
              key={current.id}
              href={`#${current.id}`}
              className="cambia min-w-0 truncate text-xs lg:text-[0.95rem] font-medium text-azzurro lg:max-w-none leading-tight"
            >
              <span className="hidden lg:inline text-linea mr-3" aria-hidden>/</span>
              {current.title}
            </a>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-7" aria-label={t.ui.sections}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] font-medium text-tenue hover-testo transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden sm:block">{LangSwitch}</div>
          <ThemeToggle labels={t.ui.theme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-telefono"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-linea text-inchiostro"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Phone sheet: slides down under the bar. */}
      <div
        id="menu-telefono"
        inert={!open}
        className={`md:hidden absolute inset-x-0 top-16 bg-carta border-b border-linea transition duration-200 ease-out ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
      >
        <nav className="contenitore py-3 flex flex-col" aria-label={t.ui.sections}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-lg font-semibold text-inchiostro border-b border-linea last:border-0">
              {l.label}
            </a>
          ))}
          <div className="pt-4 pb-2">{LangSwitch}</div>
        </nav>
      </div>
    </header>
    </>
  )
}
