import { Svg, Tratto, Riempi, Griglia, Testo } from './parts'

// Second Brain: one repository at the centre; desktop, laptop, cloud and phone around it.
export function SecondBrain({ label, lang }) {
  const nodes = lang === 'it'
    ? [[90, 80, 'fisso'], [390, 80, 'portatile'], [390, 230, 'cloud'], [90, 230, 'telefono']]
    : [[90, 80, 'desktop'], [390, 80, 'laptop'], [390, 230, 'cloud'], [90, 230, 'phone']]
  return (
    <Svg label={label}>
      <Griglia />
      {nodes.map(([x, y], k) => <Tratto key={k} d={`M240 155 L${x} ${y}`} i={k} width={1.5} dash={k === 3 ? '3 6' : undefined} opacity={0.7} />)}
      <circle cx="240" cy="155" r="38" fill="rgb(var(--cornice))" />
      <Tratto d="M240 117 a38 38 0 1 0 0.1 0" i={4} width={3} />
      <Testo x={240} y={160} anchor="middle" size={13} opacity={0.9} weight={700}>git</Testo>
      {nodes.map(([x, y, n], k) => (
        <g key={n}>
          <rect x={x - 40} y={y - 20} width="80" height="40" fill="rgb(var(--cornice))" />
          <Tratto d={`M${x - 40} ${y - 20} h80 v40 h-80 Z`} i={5 + k} width={2} />
          <Testo x={x} y={y + 4} anchor="middle" size={11}>{n}</Testo>
        </g>
      ))}
      <Riempi i={4}>
        {[[150, 110], [330, 120], [330, 195], [165, 192]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="4" fill="currentColor" />)}
      </Riempi>
    </Svg>
  )
}

// LoL coach: the map, the river, three lanes, and where the deaths happened.
export function LolCoach({ label }) {
  const deaths = [[300, 120], [330, 160], [210, 210], [360, 90]]
  return (
    <Svg label={label}>
      <Tratto d="M130 30 h220 v240 h-220 Z" i={0} width={2} />
      <Tratto d="M150 250 V50 H330" i={1} width={1.5} opacity={0.5} />
      <Tratto d="M150 250 H330 V50" i={2} width={1.5} opacity={0.5} />
      <Tratto d="M150 250 L330 50" i={3} width={1.5} opacity={0.5} />
      <Tratto d="M130 90 C 200 120, 280 180, 350 210" i={4} width={6} opacity={0.25} />
      {deaths.map(([x, y], k) => <Tratto key={k} d={`M${x - 7} ${y - 7} l14 14 M${x + 7} ${y - 7} l-14 14`} i={6 + k} width={3} />)}
      <Riempi i={2}>
        {[[200, 170], [270, 110], [240, 230]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="4" fill="currentColor" opacity={0.7} />)}
      </Riempi>
    </Svg>
  )
}

// QuestZip: a twenty-sided die and the initiative order of the table.
export function QuestZip({ label }) {
  return (
    <Svg label={label}>
      <Griglia />
      <Tratto d="M140 50 L215 93 V179 L140 222 L65 179 V93 Z" i={0} width={2.5} />
      <Tratto d="M140 75 L190 165 H90 Z" i={1} width={2} />
      <Tratto d="M140 50 L140 75 M215 93 L190 165 M215 179 L190 165 M140 222 L190 165 M140 222 L90 165 M65 179 L90 165 M65 93 L90 165 M65 93 L140 75 M215 93 L140 75" i={2} width={1.2} opacity={0.6} />
      <Testo x={140} y={140} anchor="middle" size={20} opacity={0.95} weight={800}>20</Testo>
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <Tratto d={`M270 ${70 + r * 38} h${150 - r * 18}`} i={3 + r} width={r === 1 ? 14 : 8} opacity={r === 1 ? 1 : 0.4} />
        </g>
      ))}
    </Svg>
  )
}
