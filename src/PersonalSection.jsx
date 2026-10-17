import ProjectGroup from './ProjectGroup'
import { personalMeta } from './data/projectsMeta'
import { copyFor } from './data/projectsCopy'

// ─── Personal systems: tools built for my own work and free time ─────────────

export default function PersonalSection({ lang }) {
  const copy = copyFor(lang)
  return (
    <ProjectGroup
      groupId="personal"
      header={copy.personal}
      meta={personalMeta}
      copy={copy}
      badgeFor={() => copy.badges.daily}
      privateLabel={copy.labels.privateOwn}
    />
  )
}
