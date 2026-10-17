import { groups } from '../data/projectsMeta'

// The strip of every technology used across the projects, scrolling like a ticker. Two copies side
// by side so the loop has no seam; with reduced motion it simply stands still.
const ALL = [...new Set(groups.flatMap((g) => g.projects.flatMap((p) => p.tags)))]

export default function Striscia({ label }) {
  const row = (copy) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy ? true : undefined}>
      {ALL.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 whitespace-nowrap text-[0.95rem] font-medium text-tenue">
          {t}<span className="w-1.5 h-1.5 bg-azzurro" aria-hidden />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="border-y border-linea bg-foglio/60 overflow-hidden" aria-label={label}>
      <div className="striscia flex w-max py-3">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
