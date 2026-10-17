import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

// Light, dark or follow the system: one button that cycles, like the theme switch of the Second Brain.
const ORDER = ['auto', 'light', 'dark']
const KEY = 'af-tema'

const read = () => {
  try { return localStorage.getItem(KEY) || 'auto' } catch { return 'auto' }
}

const apply = (choice) => {
  const dark = choice === 'dark' || (choice === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.dataset.tema = dark ? 'dark' : 'light'
}

export default function ThemeToggle({ labels }) {
  const [choice, setChoice] = useState(read)

  useEffect(() => {
    apply(choice)
    try { localStorage.setItem(KEY, choice) } catch { /* private mode: the choice lasts this visit */ }
    if (choice !== 'auto') return undefined
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const follow = () => apply('auto')
    media.addEventListener('change', follow)
    return () => media.removeEventListener('change', follow)
  }, [choice])

  const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length]
  const Icon = choice === 'light' ? Sun : choice === 'dark' ? Moon : Monitor

  return (
    <button
      type="button"
      onClick={() => setChoice(next)}
      title={`${labels.now}: ${labels[choice]}. ${labels.switchTo} ${labels[next]}`}
      aria-label={`${labels.now}: ${labels[choice]}. ${labels.switchTo} ${labels[next]}`}
      className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-linea text-inchiostro hover-sfondo"
    >
      <Icon className="w-[1.1rem] h-[1.1rem]" aria-hidden />
    </button>
  )
}
