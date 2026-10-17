// The status of a project: a colored dot AND a word, never the color alone.
const tones = {
  live: { text: 'text-verde', dot: 'bg-verde' },
  building: { text: 'text-ambra', dot: 'bg-ambra' },
  demo: { text: 'text-azzurro', dot: 'bg-azzurro' },
  beta: { text: 'text-viola', dot: 'bg-viola' },
}

export default function StatusBadge({ tone, children, className = '' }) {
  const t = tones[tone] ?? tones.live
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap ${t.text} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${t.dot}`} aria-hidden />
      {children}
    </span>
  )
}
