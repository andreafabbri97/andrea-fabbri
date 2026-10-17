import ProjectDetail, { GroupHeader } from './ProjectDetail'

// A group of projects (client work, personal systems): the heading, then one section each.
export default function ProjectGroup({ groupId, header, meta, copy, badgeFor, privateLabel }) {
  return (
    <div className="border-t border-white/5">
      <GroupHeader id={groupId} {...header} />
      {meta.map((m, i) => (
        <div key={m.id} className={i > 0 ? 'border-t border-white/5 max-w-6xl mx-auto' : ''}>
          <ProjectDetail
            project={copy.projects[m.id]}
            meta={m}
            badge={badgeFor(m)}
            labels={{ ...copy.labels, private: privateLabel }}
          />
        </div>
      ))}
    </div>
  )
}
