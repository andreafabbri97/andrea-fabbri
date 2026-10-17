import ProjectGroup from './ProjectGroup'
import { clientMeta } from './data/projectsMeta'
import { copyFor } from './data/projectsCopy'

// ─── Client work: one full section per project, client names withheld ────────

export default function ClientSection({ lang }) {
  const copy = copyFor(lang)
  return (
    <ProjectGroup
      groupId="clients"
      header={copy.clients}
      meta={clientMeta}
      copy={copy}
      badgeFor={(m) => copy.badges[m.tone]}
      privateLabel={copy.labels.private}
    />
  )
}
