import { Svg, Tratto, Riempi, Griglia, Testo } from './parts'

// Diagrams of the flagship products and of the own products, drawn from what each one handles.
// They replace the screenshots: no data from inside the programs, and the same look as the rest.

// Platform (the food-delivery ERP): the 24-hour dial with its twelve automatic jobs, and the platform at the centre of
// drivers, partner restaurants, customers and the AI.
export function Platform({ label, lang }) {
  const it = lang === 'it'
  const cx = 120, cy = 150, r = 82
  const ticks = Array.from({ length: 12 }, (_, k) => {
    const a = (k / 12) * Math.PI * 2 - Math.PI / 2
    return [cx + Math.cos(a) * (r - 14), cy + Math.sin(a) * (r - 14), cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  })
  const hub = [340, 150]
  const nodes = [
    [340, 52, 'driver'], [446, 150, it ? 'partner' : 'partners'],
    [340, 248, it ? 'clienti' : 'customers'], [244, 150, it ? 'IA' : 'AI'],
  ]
  return (
    <Svg label={label}>
      <Griglia />
      <Tratto d={`M${cx} ${cy - r} a${r} ${r} 0 1 0 0.1 0`} i={0} width={2} />
      {ticks.map(([x1, y1, x2, y2], k) => <Tratto key={k} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} i={1 + k} width={3} cap="butt" />)}
      <Tratto d={`M${cx} ${cy} L${cx} ${cy - 50} M${cx} ${cy} L${cx + 36} ${cy + 18}`} i={13} width={2.5} opacity={0.7} />
      <Testo x={cx} y={cy + 40} anchor="middle" size={13} opacity={0.85} weight={700}>24 h</Testo>
      <Testo x={cx} y={cy + 56} anchor="middle" size={10}>12 cron</Testo>
      {nodes.map(([x, y], k) => <Tratto key={k} d={`M${hub[0]} ${hub[1]} L${x} ${y}`} i={4 + k} width={1.5} opacity={0.6} dash={k === 3 ? '3 6' : undefined} />)}
      <rect x={hub[0] - 34} y={hub[1] - 20} width="68" height="40" fill="rgb(var(--cornice))" />
      <Tratto d={`M${hub[0] - 34} ${hub[1] - 20} h68 v40 h-68 Z`} i={8} width={2.5} />
      <Testo x={hub[0]} y={hub[1] + 5} anchor="middle" size={13} opacity={0.9} weight={700}>ERP</Testo>
      {nodes.map(([x, y, n], k) => (
        <g key={n}>
          <rect x={x - 32} y={y - 13} width="64" height="26" rx="13" fill="rgb(var(--cornice))" />
          <Tratto d={`M${x - 19} ${y - 13} h38 a13 13 0 0 1 0 26 h-38 a13 13 0 0 1 0 -26 Z`} i={9 + k} width={1.5} />
          <Testo x={x} y={y + 4} anchor="middle" size={10.5} opacity={0.75}>{n}</Testo>
        </g>
      ))}
      <Riempi i={6}>
        {[0, 2, 5, 7, 9].map((k) => <circle key={k} cx={ticks[k][2]} cy={ticks[k][3]} r="4" fill="currentColor" />)}
      </Riempi>
    </Svg>
  )
}

// PRYOR: the sales pipeline. Deals move left to right; the ones at risk carry a signal, and one deal
// is today's most valuable move.
export function Pryor({ label, lang }) {
  const stages = lang === 'it'
    ? ['Contatto', 'Qualifica', 'Proposta', 'Trattativa', 'Chiuso']
    : ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won']
  const cards = [4, 3, 3, 2, 1]
  const risk = [[1, 1], [3, 0]]
  const play = [2, 0]
  const x0 = 24, cw = 88, y0 = 58, ch = 34
  return (
    <Svg label={label}>
      {stages.map((s, c) => (
        <g key={s}>
          <Testo x={x0 + c * cw} y={y0 - 20} size={10.5}>{s}</Testo>
          <Tratto d={`M${x0 + c * cw} ${y0 - 10} h${cw - 10}`} i={c} width={1.5} opacity={0.5} />
          {Array.from({ length: cards[c] }, (_, r) => {
            const x = x0 + c * cw, y = y0 + r * (ch + 10)
            const hot = play[0] === c && play[1] === r
            const atRisk = risk.some(([a, b]) => a === c && b === r)
            return (
              <g key={r}>
                <Tratto d={`M${x} ${y} h${cw - 10} v${ch} h-${cw - 10} Z`} i={c + r + 1} width={hot ? 3 : 1.2} opacity={hot ? 1 : 0.55} />
                <Tratto d={`M${x + 8} ${y + 13} h${cw - 40 - r * 6}`} i={c + r + 2} width={4} opacity={hot ? 0.9 : 0.35} />
                <Tratto d={`M${x + 8} ${y + 24} h${22 + ((c + r) % 3) * 10}`} i={c + r + 3} width={3} opacity={0.25} />
                {atRisk && (
                  <Riempi i={c + r}>
                    <path d={`M${x + cw - 22} ${y + 8} l7 12 h-14 Z`} fill="currentColor" />
                  </Riempi>
                )}
              </g>
            )
          })}
        </g>
      ))}
      <Tratto d={`M${x0 + play[0] * cw + 39} ${y0 + ch + 4} C ${x0 + play[0] * cw + 40} 240, ${x0 + 3 * cw} 250, ${x0 + 4 * cw + 30} ${y0 + ch + 12}`} i={9} width={2} dash="3 6" opacity={0.8} />
      <Riempi i={8}>
        <circle cx={x0 + 4 * cw + 30} cy={y0 + ch + 12} r="5" fill="currentColor" />
      </Riempi>
      <Testo x={x0 + 2 * cw - 6} y={274} size={11} opacity={0.85} weight={700}>{lang === 'it' ? 'la mossa di oggi' : "today's play"}</Testo>
    </Svg>
  )
}

// Restaurant Manager: the floor plan, and one table's bill split three ways.
export function Restaurant({ label, lang }) {
  const tables = [[70, 80, 'r'], [160, 80, 'r'], [250, 80, 's'], [70, 190, 's'], [160, 190, 'r'], [250, 190, 'r']]
  const busy = [0, 2, 4]
  const chairs = (x, y) => [[x, y - 32], [x + 32, y], [x, y + 32], [x - 32, y]]
  return (
    <Svg label={label}>
      <Griglia />
      {tables.map(([x, y, shape], k) => (
        <g key={k}>
          {shape === 'r'
            ? <Tratto d={`M${x} ${y - 20} a20 20 0 1 0 0.1 0`} i={k} width={2} opacity={busy.includes(k) ? 1 : 0.45} />
            : <Tratto d={`M${x - 20} ${y - 20} h40 v40 h-40 Z`} i={k} width={2} opacity={busy.includes(k) ? 1 : 0.45} />}
          {chairs(x, y).map(([cx, cy], c) => <Tratto key={c} d={`M${cx - 5} ${cy} h10`} i={k + 1} width={4} opacity={0.4} />)}
          {busy.includes(k) && <Riempi i={k}><circle cx={x} cy={y} r="6" fill="currentColor" /></Riempi>}
        </g>
      ))}
      <Tratto d="M160 190 C 230 250, 300 250, 340 210" i={7} width={1.5} dash="3 6" opacity={0.6} />
      <Tratto d="M340 40 h110 v220 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-9 8 l-9 -8 l-11 8 Z" i={8} width={2.5} />
      {[0, 1, 2, 3].map((r) => <Tratto key={r} d={`M354 ${66 + r * 20} h${70 - (r % 2) * 22}`} i={9 + r} width={4} opacity={0.4} />)}
      <Tratto d="M354 150 h82" i={13} width={1.5} opacity={0.7} />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <Tratto d={`M354 ${172 + r * 24} h82`} i={14 + r} width={1} dash="2 4" opacity={0.6} />
          <Riempi i={10 + r}><rect x="354" y={178 + r * 24} width={28} height={8} rx="2" fill="currentColor" opacity={0.8} /></Riempi>
        </g>
      ))}
      <Testo x={395} y={164} anchor="middle" size={12} opacity={0.85} weight={700}>÷ 3</Testo>
      <Testo x={160} y={268} anchor="middle" size={10}>{lang === 'it' ? 'sala' : 'floor'}</Testo>
    </Svg>
  )
}

// SUP rentals: the booking calendar of one day. One row per board or pedal boat, one column per
// hour; each bar is a booking.
export function Sup({ label, lang }) {
  const rows = lang === 'it' ? ['SUP 1', 'SUP 2', 'SUP 3', 'SUP 4', 'pedalò'] : ['SUP 1', 'SUP 2', 'SUP 3', 'SUP 4', 'pedal boat']
  const bookings = [[[0, 2], [3, 5], [7, 9]], [[1, 3], [4, 7]], [[0, 1], [2, 4], [6, 9]], [[5, 8]], [[2, 6], [8, 9]]]
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  const x0 = 96, cw = 37, y0 = 52, rh = 34
  return (
    <Svg label={label}>
      {hours.map((h, c) => (
        <g key={h}>
          <Tratto d={`M${x0 + c * cw} ${y0 - 10} V${y0 + rows.length * rh}`} i={c} width={1} opacity={0.15} />
          {c % 2 === 0 && <Testo x={x0 + c * cw} y={y0 - 18} anchor="middle" size={10}>{h}</Testo>}
        </g>
      ))}
      {rows.map((n, r) => (
        <g key={n}>
          <Testo x={x0 - 12} y={y0 + r * rh + 18} anchor="end" size={10.5}>{n}</Testo>
          {bookings[r].map(([a, b], k) => (
            <Tratto key={k} d={`M${x0 + a * cw + 4} ${y0 + r * rh + 14} H${x0 + b * cw - 4}`} i={r + k + 2} width={16} opacity={0.35 + ((r + k) % 3) * 0.3} />
          ))}
        </g>
      ))}
      <Tratto d={`M${x0 + 5.3 * cw} ${y0 - 12} V${y0 + rows.length * rh + 4}`} i={9} width={2} />
      <Riempi i={8}><circle cx={x0 + 5.3 * cw} cy={y0 - 12} r="4" fill="currentColor" /></Riempi>
      <Tratto d="M20 262 c 20 -12, 40 -12, 60 0 s 40 12, 60 0 s 40 -12, 60 0 s 40 12, 60 0 s 40 -12, 60 0 s 40 12, 60 0 s 40 -12, 60 0 s 40 12, 40 0" i={11} width={2} opacity={0.5} />
    </Svg>
  )
}

// B2Work: who is hiring, the search radius, and the workers inside it with their role.
export function B2work({ label, lang }) {
  const roles = lang === 'it' ? ['cameriere', 'barista', 'runner'] : ['waiter', 'barista', 'runner']
  const inside = [[210, 110, 0], [290, 120, 1], [196, 190, 2], [280, 196, 0]]
  const outside = [[60, 60], [420, 70], [440, 230], [70, 250], [380, 270], [110, 140]]
  const pin = [245, 155]
  return (
    <Svg label={label}>
      <Griglia step={30} />
      <Tratto d="M0 92 C 120 100, 260 70, 480 96" i={0} width={6} opacity={0.12} />
      <Tratto d="M150 0 C 160 120, 140 200, 170 300" i={1} width={6} opacity={0.12} />
      <Tratto d="M0 230 C 160 214, 300 250, 480 222" i={2} width={6} opacity={0.12} />
      <Tratto d={`M${pin[0] - 92} ${pin[1]} a92 92 0 1 0 184 0 a92 92 0 1 0 -184 0`} i={3} width={1.5} dash="4 6" opacity={0.7} />
      {inside.map(([x, y], k) => <Tratto key={k} d={`M${pin[0]} ${pin[1]} L${x} ${y}`} i={5 + k} width={1} opacity={0.5} />)}
      <Tratto d={`M${pin[0]} ${pin[1] + 22} C ${pin[0] - 18} ${pin[1]}, ${pin[0] - 14} ${pin[1] - 18}, ${pin[0]} ${pin[1] - 18} S ${pin[0] + 18} ${pin[1]}, ${pin[0]} ${pin[1] + 22} Z`} i={4} width={2.5} />
      <Riempi i={2}><circle cx={pin[0]} cy={pin[1] - 2} r="5" fill="currentColor" /></Riempi>
      {inside.map(([x, y, role], k) => (
        <g key={k}>
          <Riempi i={4 + k}><circle cx={x} cy={y} r="7" fill="currentColor" /></Riempi>
          <Testo x={x + (x > pin[0] ? 12 : -12)} y={y + 4} anchor={x > pin[0] ? 'start' : 'end'} size={10.5} opacity={0.75}>{roles[role]}</Testo>
        </g>
      ))}
      <Riempi i={3}>
        {outside.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="5" fill="currentColor" opacity={0.3} />)}
      </Riempi>
    </Svg>
  )
}
