import { Svg, Tratto, Riempi, Griglia, Testo, W, H } from './parts'

// Diagrams of the client projects, drawn from what each system actually handles.
// They are schemes, not data from the clients: the shapes are real, the values are examples.

// Pizzeria: the order board. One column per half hour; the oven fills up to its cap (14 pizzas)
// and a full slot closes; below, the drivers on the road.
export function Pizzeria({ label }) {
  const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
  const load = [4, 8, 12, 14, 14, 11, 7, 3]
  const drivers = [1, 2, 3, 3, 3, 2, 2, 1]
  const cap = 14, x0 = 46, colW = 50, cell = 13, base = 222
  return (
    <Svg label={label}>
      <Griglia />
      <Tratto d={`M${x0 - 10} ${base - cap * cell - 6} H${x0 + times.length * colW}`} i={0} width={1} dash="4 5" opacity={0.6} />
      <Testo x={x0 - 14} y={base - cap * cell - 2} anchor="end" size={10}>14</Testo>
      {times.map((t, c) => (
        <g key={t}>
          <Tratto d={`M${x0 + c * colW} ${base} V${base - load[c] * cell}`} i={c + 1} width={28} cap="butt" opacity={load[c] >= cap ? 1 : 0.55} />
          <Testo x={x0 + c * colW} y={base + 22} anchor="middle" size={10}>{t}</Testo>
          <Riempi i={c}>
            {Array.from({ length: drivers[c] }, (_, k) => (
              <circle key={k} cx={x0 + c * colW - 10 + k * 10} cy={base + 46} r="3.4" fill="currentColor" />
            ))}
          </Riempi>
        </g>
      ))}
      <Tratto d={`M${x0 - 22} ${base} H${x0 + times.length * colW - 18}`} i={10} width={1.5} />
    </Svg>
  )
}

// Private hire: two free routing engines answer; the shorter road wins.
export function Chauffeur({ label }) {
  return (
    <Svg label={label}>
      <Griglia step={30} />
      <Tratto d="M30 40 C 110 70, 140 130, 120 190 S 150 270, 230 290" i={0} width={1} opacity={0.35} />
      <Tratto d="M70 230 C 120 120, 260 60, 300 120 S 380 110, 410 70" i={1} width={2} dash="3 7" opacity={0.6} />
      <Tratto d="M70 230 C 160 200, 250 170, 330 120 S 390 90, 410 70" i={2} width={4} />
      <Riempi i={1}>
        <circle cx="70" cy="230" r="9" fill="currentColor" />
        <circle cx="410" cy="70" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
      </Riempi>
      <Testo x={250} y={196} size={14} opacity={0.85} weight={700}>≈ 18 km</Testo>
      <Testo x={300} y={56} size={10}>OSRM · Valhalla</Testo>
    </Svg>
  )
}

// School: the support timetable. Five days, six or seven hours each; every filled cell is one person
// with one student in one hour.
export function School({ label, lang }) {
  const days = lang === 'it' ? ['L', 'M', 'M', 'G', 'V'] : ['M', 'T', 'W', 'T', 'F']
  const hours = [6, 7, 6, 7, 6]
  const filled = [[1, 2, 4, 5], [0, 1, 3, 4, 6], [0, 2, 3, 5], [1, 2, 4, 5, 6], [0, 1, 3, 4]]
  const x0 = 70, y0 = 38, cw = 76, ch = 30
  return (
    <Svg label={label}>
      {days.map((d, c) => (
        <g key={c}>
          <Testo x={x0 + c * cw + cw / 2 - 4} y={y0 - 12} anchor="middle" size={11}>{d}</Testo>
          {Array.from({ length: hours[c] }, (_, r) => (
            <g key={r}>
              <Tratto d={`M${x0 + c * cw} ${y0 + r * ch} h${cw - 8} v${ch - 6} h-${cw - 8} Z`} i={c + r} width={1} opacity={0.4} />
              {filled[c].includes(r) && (
                <Riempi i={c + r}>
                  <rect x={x0 + c * cw + 4} y={y0 + r * ch + 4} width={cw - 16} height={ch - 14} rx="3" fill="currentColor" opacity={0.25 + ((c + r) % 3) * 0.25} />
                </Riempi>
              )}
            </g>
          ))}
        </g>
      ))}
      {Array.from({ length: 7 }, (_, r) => <Testo key={r} x={x0 - 14} y={y0 + r * ch + 17} anchor="end" size={10}>{r + 1}</Testo>)}
    </Svg>
  )
}

// Earthmoving: three kinds of hours per day, never merged into one.
export function Excavation({ label, lang }) {
  const names = lang === 'it' ? ['ore uomo', 'ore mezzo', 'fatturabili'] : ['person hours', 'machine hours', 'billable']
  const days = [[8, 6, 7], [9, 8, 8], [6, 4, 5], [8, 7, 8], [10, 9, 9]]
  const x0 = 50, base = 230, unit = 16, group = 80
  const opac = [1, 0.6, 0.3]
  return (
    <Svg label={label}>
      <Griglia />
      {days.map((d, g) => d.map((v, k) => (
        <Tratto key={`${g}${k}`} d={`M${x0 + g * group + k * 18} ${base} V${base - v * unit}`} i={g * 3 + k} width={12} cap="butt" opacity={opac[k]} />
      )))}
      <Tratto d={`M${x0 - 16} ${base} H${x0 + days.length * group - 16}`} i={16} width={1.5} />
      {names.map((n, k) => (
        <g key={n}>
          <rect x={x0 + k * 130} y={base + 26} width="12" height="12" rx="2" fill="currentColor" opacity={opac[k]} />
          <Testo x={x0 + k * 130 + 18} y={base + 36} size={11}>{n}</Testo>
        </g>
      ))}
    </Svg>
  )
}

// Accounting: a journal entry in double entry — two columns that must end equal.
export function Accounting({ label, lang }) {
  const [dr, cr] = lang === 'it' ? ['Dare', 'Avere'] : ['Debit', 'Credit']
  const left = [120, 60, 40], right = [150, 70]
  return (
    <Svg label={label}>
      <Tratto d={`M${W / 2} 40 V250`} i={0} width={1.5} />
      <Tratto d="M60 60 H420" i={1} width={1.5} />
      <Testo x={W / 2 - 20} y={52} anchor="end" size={12} opacity={0.8} weight={700}>{dr}</Testo>
      <Testo x={W / 2 + 20} y={52} size={12} opacity={0.8} weight={700}>{cr}</Testo>
      {left.map((w, r) => <Tratto key={`l${r}`} d={`M${W / 2 - 20} ${92 + r * 34} H${W / 2 - 20 - w}`} i={2 + r} width={10} opacity={0.7} />)}
      {right.map((w, r) => <Tratto key={`r${r}`} d={`M${W / 2 + 20} ${92 + r * 34} H${W / 2 + 20 + w}`} i={5 + r} width={10} opacity={0.7} />)}
      <Tratto d="M60 212 H420" i={8} width={1.5} />
      <Tratto d={`M${W / 2 - 20} 232 H60`} i={9} width={10} />
      <Tratto d={`M${W / 2 + 20} 232 H420`} i={9} width={10} />
      <Riempi i={4}>
        <circle cx={W / 2} cy="270" r="13" fill="currentColor" />
        <path d={`M${W / 2 - 6} 270 l4 4 l8 -9`} stroke="rgb(var(--cornice))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </Riempi>
    </Svg>
  )
}

// Building supplies: sold by weight, length, area and volume — never "by the piece".
export function BuildingSupplies({ label }) {
  const units = [
    ['kg', 'M70 200 h80 v-60 h-80 Z M70 170 h80'],
    ['m', 'M190 210 l90 -90 M200 210 l90 -90 M210 210 l90 -90'],
    ['m²', 'M330 210 h90 v-80 h-90 Z M360 130 v80 M390 130 v80 M330 170 h90'],
  ]
  return (
    <Svg label={label}>
      <Griglia />
      {units.map(([u, d], k) => (
        <g key={u}>
          <Tratto d={d} i={k * 2} width={2.5} />
          <Testo x={110 + k * 140} y={244} anchor="middle" size={16} opacity={0.85} weight={700}>{u}</Testo>
        </g>
      ))}
      <Tratto d="M70 100 l30 -26 h80 l-30 26 Z M70 100 v40 h80 v-40 M150 140 l30 -26 v-40" i={7} width={2} opacity={0.6} />
      <Testo x={196} y={70} size={16} opacity={0.85} weight={700}>m³</Testo>
    </Svg>
  )
}

// Supermarket: store pins on a map; the open ones are ringed, and orders reach the right store.
export function Supermarket({ label }) {
  const pins = [[110, 110, true], [250, 190, true], [370, 90, false]]
  return (
    <Svg label={label}>
      <Griglia step={30} />
      <Tratto d="M20 230 C 120 210, 180 250, 260 230 S 400 200, 470 220" i={0} width={1} opacity={0.35} />
      <Tratto d="M110 110 C 160 140, 200 170, 250 190" i={1} width={2} dash="3 7" opacity={0.6} />
      {pins.map(([x, y, open], k) => (
        <g key={k}>
          <Tratto d={`M${x} ${y + 26} C ${x - 22} ${y + 2}, ${x - 16} ${y - 20}, ${x} ${y - 20} S ${x + 22} ${y + 2}, ${x} ${y + 26} Z`} i={2 + k} width={2.5} />
          <Riempi i={k}><circle cx={x} cy={y - 2} r="6" fill="currentColor" /></Riempi>
          {open && <Tratto d={`M${x - 34} ${y} a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0`} i={5 + k} width={1.5} opacity={0.6} />}
        </g>
      ))}
    </Svg>
  )
}

// Supplements: the WhatsApp message carries a code; the shop opens the order and marks it ready.
export function Supplements({ label }) {
  return (
    <Svg label={label}>
      <Griglia />
      <Tratto d="M50 70 h150 a14 14 0 0 1 14 14 v50 a14 14 0 0 1 -14 14 h-120 l-24 18 v-18 a14 14 0 0 1 -6 -12 v-52 a14 14 0 0 1 14 -14 Z" i={0} width={2.5} />
      <Testo x={70} y={104} size={14} opacity={0.9} weight={700}>#FS-2481</Testo>
      <Tratto d="M70 122 h100" i={1} width={4} opacity={0.4} />
      <Tratto d="M228 110 h46 m-12 -10 l12 10 l-12 10" i={2} width={2.5} />
      <Tratto d="M290 50 h140 a10 10 0 0 1 10 10 v170 a10 10 0 0 1 -10 10 h-140 a10 10 0 0 1 -10 -10 v-170 a10 10 0 0 1 10 -10 Z" i={3} width={2.5} />
      {[0, 1, 2, 3].map((r) => <Tratto key={r} d={`M304 ${84 + r * 28} h${100 - r * 14}`} i={4 + r} width={5} opacity={0.5} />)}
      <Riempi i={6}>
        <rect x="304" y="196" width="112" height="22" rx="11" fill="currentColor" />
      </Riempi>
    </Svg>
  )
}
