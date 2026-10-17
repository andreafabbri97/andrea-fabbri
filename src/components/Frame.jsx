import { drawings } from './drawings'

// The frame that carries the color of each project: a diagram drawn from what the project
// handles, never a screenshot (no data from inside the programs, and one look for all of them).
// A bar on top says what it is and where the project sits in the index.
export default function Frame({ meta, project, copy, lang, position, total }) {
  const Drawing = drawings[meta.id]
  const kind = copy.frame.diagram
  return (
    <figure className="rounded-xl overflow-hidden border border-linea bg-[rgb(var(--cornice))]" data-disegna="">
      <figcaption className="flex items-center justify-between gap-4 px-4 h-10 border-b border-[rgb(var(--cornice-linea))] text-[0.8rem] text-[rgb(var(--cornice-testo)/0.6)]">
        <span className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-sm bg-tinta shrink-0" aria-hidden />
          <span className="truncate"><span className="text-[rgb(var(--cornice-testo)/0.85)] font-semibold mr-2">{kind}</span>{project.label}</span>
        </span>
        <span className="cifre whitespace-nowrap">{position} {copy.frame.of} {total}</span>
      </figcaption>
      <div className="p-3 sm:p-5"><Drawing label={`${kind}: ${project.title}`} lang={lang} /></div>
    </figure>
  )
}
