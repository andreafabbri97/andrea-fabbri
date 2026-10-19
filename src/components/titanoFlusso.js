// The flow on the Titano rings, drawn on a canvas laid over the drawing. The rings themselves stay a
// still SVG: before, the flow was CSS animations inside that SVG, and every frame the browser redrew the
// whole drawing under the mask and the frosted index (on the live site: lag and flicker, 19/10/2026).
// Here only the moving parts are drawn, at most 30 times a second, and nothing while the page scrolls,
// while the opening is off screen or while the tab is hidden.
//
// What moves:
// - the signal: every WAVE seconds a ring around the summit opens and fades, and the rings light up in
//   turn from the summit outwards, fading as they get further away;
// - the flow: stretches of the line itself, a little stronger, run along six rings at one speed. Each
//   stretch is a few dashes of different lengths on the same centre, so it fades at both ends.

export const DRAWN = 3.4          // seconds: when the opening drawing is complete and the flow starts
const SPEED = 125                 // drawing units per second along a line
const LAYERS = [270, 160, 70]    // lengths of the dashes that make one stretch, longest first
const LAYER_INK = 0.19            // opacity of each dash: where all of them overlap, the stretch is strongest
const SPACING = 620               // one stretch of flow every this many units of line
const WAVE = 9                    // seconds between two signals from the summit
const WAVE_STEP = 0.17            // seconds the signal takes to go from one ring to the next
const FADE_IN = 1.6               // seconds the flow takes to appear once the drawing is done
const FRAME = 1000 / 30           // at most 30 drawings a second: the flow is slow, more is wasted work
const QUIET = 160                 // milliseconds without scrolling before the flow moves again

// One ring as a polyline with the distance from its start at every point, to find a stretch by length.
function measured(pts) {
  const at = [0]
  for (let i = 1; i < pts.length; i++) at.push(at[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  return { pts, at, len: at[at.length - 1] }
}

function pointAt(ring, d) {
  const { pts, at, len } = ring
  const s = ((d % len) + len) % len
  let lo = 0, hi = at.length - 1
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (at[mid] <= s) lo = mid; else hi = mid }
  const f = (s - at[lo]) / (at[hi] - at[lo] || 1)
  return [pts[lo][0] + (pts[hi][0] - pts[lo][0]) * f, pts[lo][1] + (pts[hi][1] - pts[lo][1]) * f]
}

// The part of a ring between two distances, as a path (the rings bend gently: 16 units per step is smooth).
function stretch(ctx, ring, from, to) {
  const steps = Math.max(2, Math.ceil((to - from) / 16))
  ctx.beginPath()
  for (let i = 0; i <= steps; i++) {
    const [x, y] = pointAt(ring, from + ((to - from) * i) / steps)
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

// The wave's light on one ring at time t: up quickly, then a slow fade, then dark until the next signal.
function waveLight(t, k) {
  const since = t - DRAWN - k * WAVE_STEP
  if (since < 0) return 0
  const p = (since % WAVE) / WAVE
  if (p < 0.04) return p / 0.04
  if (p < 0.18) { const q = (p - 0.04) / 0.14; return (1 - q) * (1 - q) }
  return 0
}

export function startFlow({ canvas, ringPoints, paths, centre, mapping }) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  const rings = ringPoints.map(measured)
  const shapes = paths.map((d) => new Path2D(d))
  const flows = rings.flatMap((ring, k) => {
    if (k % 2 === 0 || k === rings.length - 1) return []
    return [{ ring, count: Math.max(1, Math.round(ring.len / SPACING)), dir: k % 4 === 1 ? 1 : -1, start: DRAWN + k * 0.35 }]
  })

  let colours = null, frame = 0, last = 0, visible = true, scrolledAt = 0
  const born = performance.now()
  const readColours = () => {
    const css = getComputedStyle(document.documentElement)
    colours = { line: css.getPropertyValue('--tenue').trim(), signal: css.getPropertyValue('--azzurro').trim() }
  }

  const draw = (now) => {
    frame = requestAnimationFrame(draw)
    if (!visible || now - last < FRAME || now - scrolledAt < QUIET) return
    last = now
    const m = mapping()
    if (!m || m.width <= 0 || m.height <= 0) return
    const w = Math.round(m.width * m.dpr), h = Math.round(m.height * m.dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h
      canvas.style.width = `${m.width}px`; canvas.style.height = `${m.height}px`
    }
    if (canvas.style.top !== `${m.top}px`) canvas.style.top = `${m.top}px`
    if (!colours) readColours()
    const t = (now - born) / 1000
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, w, h)
    if (t < DRAWN) return
    // From here on, drawing units: the same coordinates as the SVG, summit shift included.
    ctx.setTransform(m.dpr * m.scale, 0, 0, m.dpr * m.scale, m.dpr * m.x, m.dpr * m.y)
    ctx.lineCap = 'round'

    ctx.strokeStyle = `rgb(${colours.signal})`
    ctx.lineWidth = 1.2
    shapes.forEach((shape, k) => {
      const a = waveLight(t, k) * 0.55 * (1 - k / shapes.length)
      if (a > 0.01) { ctx.globalAlpha = a; ctx.stroke(shape) }
    })
    // The beat: a ring that leaves the summit as the signal starts, seven times wider and gone.
    const since = ((t - DRAWN) % WAVE) / WAVE
    if (since < 0.14) {
      const q = 1 - Math.pow(1 - since / 0.14, 3)
      ctx.globalAlpha = 0.7 * (1 - since / 0.14)
      ctx.lineWidth = 1.2 / m.scale
      ctx.beginPath(); ctx.arc(centre[0], centre[1], 4 * (1 + 6 * q), 0, Math.PI * 2); ctx.stroke()
    }

    ctx.strokeStyle = `rgb(${colours.line})`
    ctx.lineWidth = 1.3
    for (const f of flows) {
      const fade = Math.min(1, Math.max(0, (t - f.start) / FADE_IN))
      if (fade <= 0) continue
      ctx.globalAlpha = LAYER_INK * fade
      const gap = f.ring.len / f.count
      const centreAt = f.dir * (t - f.start) * SPEED
      for (let i = 0; i < f.count; i++) {
        const c = centreAt + i * gap
        for (const l of LAYERS) stretch(ctx, f.ring, c - l / 2, c + l / 2)
      }
    }
    ctx.globalAlpha = 1
  }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(canvas)
  const onScroll = () => { scrolledAt = performance.now() }
  window.addEventListener('scroll', onScroll, { passive: true })
  // The theme can change while the page is open: read the colours again when it does.
  const themes = new MutationObserver(readColours)
  themes.observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema', 'class'] })
  const scheme = window.matchMedia('(prefers-color-scheme: dark)')
  scheme.addEventListener('change', readColours)
  frame = requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(frame); io.disconnect(); themes.disconnect()
    window.removeEventListener('scroll', onScroll); scheme.removeEventListener('change', readColours)
  }
}
