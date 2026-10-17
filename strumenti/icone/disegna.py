"""Icons and link preview of the site, drawn from the same contour lines as the opening (Titano.jsx).

Writes favicon.svg, icona.svg and anteprima.html next to this file; rendi.cjs turns them into the
files in public/. The letters are outlines taken from the Anybody font with fontTools, not text, so
the icon does not depend on the fonts installed. Needs: pip install fonttools brotli, and the two
font files (see README.md in this folder).
Run: python3 -I disegna.py
"""
import math
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

QUI = Path(__file__).parent
BG, AZ, TEN, INK, PAGE = '#0F1821', '#6CC3EE', '#9BAEBF', '#E7EEF4', '#0E1822'


def ring_pts(k, points=160):
    """Ring k of the ridge, as in Titano.jsx (unscaled, centred on 0,0)."""
    rot, base, pts = -0.6, 34 + k * 46, []
    for i in range(points + 1):
        t = i / points * math.pi * 2
        cliff = 1 - 0.22 * max(0, math.cos(t - 0.15))
        wob = 1 + 0.07 * math.sin(3 * t + k * 0.7) + 0.04 * math.sin(5 * t - k * 1.3)
        r = base * cliff * wob
        x, y = math.cos(t) * r * 1.7, math.sin(t) * r * 0.85
        pts.append((x * math.cos(rot) - y * math.sin(rot), x * math.sin(rot) + y * math.cos(rot)))
    return pts


def monogram(wdth=112, wght=850):
    """The letters AF as one SVG path, with their bounds."""
    font = instantiateVariableFont(TTFont(QUI / 'anybody.woff2'), {'wdth': wdth, 'wght': wght})
    glyphs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
    pen, bounds, x = SVGPathPen(glyphs, ntos=lambda v: f'{v:.1f}'), BoundsPen(glyphs), 0
    for ch in 'AF':
        g = cmap[ord(ch)]
        glyphs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
        glyphs[g].draw(TransformPen(bounds, (1, 0, 0, -1, x, 0)))
        x += hmtx[g][0]
    return pen.getCommands(), bounds.bounds


D, (X0, Y0, X1, Y1) = monogram()


def letters(size, width_frac, cx, cy):
    s = size * width_frac / (X1 - X0)
    tx, ty = cx - (X0 + X1) / 2 * s, cy - (Y0 + Y1) / 2 * s
    return f'<path transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f})" d="{D}" fill="{INK}"/>', (Y1 - Y0) * s


def rings(size, ks, cx, cy, radius, widths, ops):
    rs = [ring_pts(k) for k in ks]
    outer = rs[-1]
    mx = (max(p[0] for p in outer) + min(p[0] for p in outer)) / 2
    my = (max(p[1] for p in outer) + min(p[1] for p in outer)) / 2
    s = radius * size / max(math.hypot(x - mx, y - my) for x, y in outer)
    out = []
    for j in reversed(range(len(ks))):
        d = 'M' + ' L'.join(f'{cx + (x - mx) * s:.2f} {cy + (y - my) * s:.2f}' for x, y in rs[j]) + ' Z'
        col = AZ if j == 0 else TEN
        out.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-opacity="{ops[j]}" stroke-width="{widths[j]}" stroke-linejoin="round"/>')
    return '\n'.join(out)


def svg(size, body, rx):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">\n'
            f'<rect width="{size}" height="{size}" rx="{rx}" fill="{BG}"/>\n{body}\n</svg>\n')


# App icon, full bleed (the system rounds or masks it): letters inside the 40% safe circle.
S = 512
txt, h = letters(S, 0.60, S / 2, S / 2)
r = rings(S, [1, 2, 3, 4, 5], S / 2 + 60, S / 2 + 120, 0.66, [6, 5, 5, 4, 4], [0.9, 0.35, 0.28, 0.2, 0.14])
bar = f'<rect x="{S / 2 - 0.30 * S:.1f}" y="{S / 2 + h / 2 + 26:.1f}" width="{0.16 * S:.1f}" height="14" fill="{AZ}"/>'
(QUI / 'icona.svg').write_text(svg(S, f'{r}\n{txt}\n{bar}', 0))

# Browser tab icon (seen at 16-32 px): only the letters and the bar, bigger.
F = 64
txt, h = letters(F, 0.80, F / 2, F / 2 - 3)
bar = f'<rect x="{F / 2 - 0.40 * F:.1f}" y="{F / 2 - 3 + h / 2 + 5:.1f}" width="{0.26 * F:.1f}" height="5" fill="{AZ}"/>'
(QUI / 'favicon.svg').write_text(svg(F, f'{txt}\n{bar}', 14))

# Link preview, 1200 x 630: the name over the whole ridge.
lines = []
for k in range(13):
    d = 'M' + ' L'.join(f'{900 + x:.1f} {360 + y:.1f}' for x, y in ring_pts(k)) + ' Z'
    op = 0.9 if k == 0 else (0.32 if k % 4 == 0 else 0.16)
    lines.append(f'<path d="{d}" fill="none" stroke="{AZ if k == 0 else TEN}" stroke-opacity="{op}" stroke-width="{2.4 if k % 4 == 0 else 1.4}"/>')
(QUI / 'anteprima.html').write_text(f'''<!doctype html><html><head><style>
@font-face {{ font-family: Anybody; src: url(anybody.woff2); font-weight: 100 900; font-stretch: 50% 150%; }}
@font-face {{ font-family: Bricolage; src: url(bricolage.woff2); font-weight: 200 800; font-stretch: 75% 100%; }}
html, body {{ margin: 0; }}
.og {{ width: 1200px; height: 630px; background: {PAGE}; position: relative; overflow: hidden; color: {INK}; font-family: Bricolage; }}
svg {{ position: absolute; inset: 0; }}
.testo {{ position: absolute; left: 80px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; }}
h1 {{ font-family: Anybody; font-variation-settings: 'wdth' 130; font-weight: 800; font-size: 104px; line-height: 0.95; margin: 0; letter-spacing: -0.01em; }}
.ruolo {{ margin-top: 34px; font-size: 34px; color: {TEN}; font-weight: 500; }}
.barra {{ width: 120px; height: 10px; background: {AZ}; margin-top: 40px; }}
.piede {{ position: absolute; left: 80px; bottom: 54px; font-size: 24px; color: {TEN}; }}
</style></head><body><div class="og">
<svg width="1200" height="630" viewBox="0 0 1200 630">{''.join(lines)}<circle cx="900" cy="360" r="6" fill="{AZ}"/></svg>
<div class="testo"><h1>Andrea<br>Fabbri</h1><div class="ruolo">Management engineer · AI automation</div><div class="barra"></div></div>
<div class="piede">Based in San Marino · working remotely, worldwide</div>
</div></body></html>
''')
print('scritti favicon.svg, icona.svg, anteprima.html')
