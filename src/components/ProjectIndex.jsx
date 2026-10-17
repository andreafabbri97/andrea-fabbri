import StatusBadge from './StatusBadge'
import { groups } from '../data/projectsMeta'

// The index of work: every project with its sector and status. It is also the way to move around
// a long page — each row jumps to its section.
export default function ProjectIndex({ copy }) {
  const total = groups.reduce((n, g) => n + g.projects.length, 0)
  let row = 0
  return (
    <nav id="work" aria-label={copy.index.title} className="bg-foglio/55 backdrop-blur-[2.5px] border border-linea rounded-2xl">
      <div className="flex items-baseline justify-between gap-4 px-5 sm:px-6 pt-5 pb-3">
        <h2 className="titolo text-xl font-bold text-inchiostro">{copy.index.title}</h2>
        <span className="cifre text-sm text-tenue">{total} {copy.index.projects}</span>
      </div>
      {groups.map((g) => (
        <div key={g.id} className="px-2 sm:px-3 pb-2">
          <h3 className="px-3 pt-3 pb-1 text-sm font-semibold text-tenue">{copy.groups[g.id].title}</h3>
          <ul>
            {g.projects.map((m) => {
              const p = copy.projects[m.id]
              const delay = 0.3 + row++ * 0.035
              return (
                <li key={m.id} className="entra-riga" style={{ animationDelay: `${delay}s`, '--hue': m.hue }}>
                  <a
                    href={`#${m.id}`}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-0.5 px-3 py-2.5 rounded-xl hover-sfondo"
                  >
                    <span className="min-w-0">
                      <span className="flex items-center gap-2.5 font-semibold text-inchiostro leading-snug"><span className="w-2.5 h-2.5 rounded-sm bg-tinta shrink-0" aria-hidden />{p.title}</span>
                      <span className="block text-sm text-tenue leading-snug pl-5">{p.label}</span>
                    </span>
                    <StatusBadge tone={m.tone}>{copy.badges[m.badge ?? m.tone]}</StatusBadge>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
