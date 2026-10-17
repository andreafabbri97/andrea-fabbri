// Pieces shared by the drawings. Every stroke has pathLength = 1 so it can trace itself (index.css,
// .tratto); --i staggers the strokes. Drawings live inside the frame, which follows the theme: colors come from its tokens (index.css).

export const W = 480
export const H = 300

export function Svg({ children, label }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block tinta-chiara" role="img" aria-label={label} fill="none">
      {children}
    </svg>
  )
}

// A stroke that traces itself.
export function Tratto({ d, i = 0, width = 2, dash, opacity = 1, cap = 'round' }) {
  return (
    <path
      d={d}
      pathLength="1"
      className={dash ? undefined : 'tratto'}
      style={{ '--i': i }}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap={cap}
      strokeLinejoin="round"
      strokeDasharray={dash}
      opacity={opacity}
    />
  )
}

// A filled area that fades in after the strokes.
export function Riempi({ children, i = 0 }) {
  return <g className="riempi" style={{ '--i': i }}>{children}</g>
}

// Faint background grid, like squared paper.
export function Griglia({ step = 24, opacity = 0.07 }) {
  const lines = []
  for (let x = step; x < W; x += step) lines.push(<line key={`x${x}`} x1={x} y1="0" x2={x} y2={H} />)
  for (let y = step; y < H; y += step) lines.push(<line key={`y${y}`} x1="0" y1={y} x2={W} y2={y} />)
  return <g stroke="rgb(var(--cornice-testo))" strokeWidth="1" opacity={opacity}>{lines}</g>
}

export function Testo({ x, y, children, anchor = 'start', size = 11, opacity = 0.6, weight = 500 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill="rgb(var(--cornice-testo))" opacity={opacity}
      fontFamily="'Bricolage Grotesque', sans-serif">
      {children}
    </text>
  )
}
