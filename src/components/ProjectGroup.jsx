import ProjectDetail from './ProjectDetail'

// A group of projects: heading and one line, then each project, separated by a rule.
export default function ProjectGroup({ group, copy, lang }) {
  const header = copy.groups[group.id]
  const note = group.id === 'clients' ? copy.labels.private : group.id === 'personal' ? copy.labels.privateOwn : null
  return (
    <section id={`group-${group.id}`} className="border-t border-linea">
      <div className="contenitore">
        <div data-reveal className="pt-16 sm:pt-24 max-w-[48rem]">
          <h2 className="titolo text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-inchiostro leading-[1] mb-4">{header.title}</h2>
          <p className="text-tenue text-lg leading-relaxed">{header.intro}</p>
        </div>
        <div className="divide-y divide-linea">
          {group.projects.map((m) => (
            <ProjectDetail key={m.id} meta={m} project={copy.projects[m.id]} copy={copy} note={note} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
