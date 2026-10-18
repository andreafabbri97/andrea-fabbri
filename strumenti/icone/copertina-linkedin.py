"""LinkedIn cover, 1584 x 396 (18/10/2026, Andrea: the same picture as the Google Business profile, but
LinkedIn crops the 1200 x 630 preview and would cut the name). Same contour lines of the ridge as
disegna.py; the words stay on the right, because on LinkedIn the profile photo covers the lower left.
Writes copertina-linkedin.html next to this file; rendi-copertina.cjs turns it into copertina-linkedin.png.
Run: python3 -I copertina-linkedin.py   (no fonttools needed: the fonts come from Google Fonts)
"""
import math
from pathlib import Path

AZ, TEN, INK, PAGE = '#6CC3EE', '#9BAEBF', '#E7EEF4', '#0E1822'  # as in disegna.py


def ring_pts(k, points=160):
    """Ring k of the ridge, as in disegna.py and Titano.jsx (not imported: disegna.py needs fonttools and the fonts)."""
    rot, base, pts = -0.6, 34 + k * 46, []
    for i in range(points + 1):
        t = i / points * math.pi * 2
        cliff = 1 - 0.22 * max(0, math.cos(t - 0.15))
        wob = 1 + 0.07 * math.sin(3 * t + k * 0.7) + 0.04 * math.sin(5 * t - k * 1.3)
        r = base * cliff * wob
        x, y = math.cos(t) * r * 1.7, math.sin(t) * r * 0.85
        pts.append((x * math.cos(rot) - y * math.sin(rot), x * math.sin(rot) + y * math.cos(rot)))
    return pts


QUI = Path(__file__).parent
W, H = 1584, 396
CX, CY = 470, 250

lines = []
for k in range(13):
    d = 'M' + ' L'.join(f'{CX + x:.1f} {CY + y:.1f}' for x, y in ring_pts(k)) + ' Z'
    op = 0.9 if k == 0 else (0.32 if k % 4 == 0 else 0.16)
    lines.append(f'<path d="{d}" fill="none" stroke="{AZ if k == 0 else TEN}" stroke-opacity="{op}" '
                 f'stroke-width="{2.4 if k % 4 == 0 else 1.4}"/>')

(QUI / 'copertina-linkedin.html').write_text(f'''<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,400..900&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&display=block" rel="stylesheet">
<style>
html, body {{ margin: 0; }}
.c {{ width: {W}px; height: {H}px; background: {PAGE}; position: relative; overflow: hidden; color: {INK}; font-family: 'Bricolage Grotesque'; }}
svg {{ position: absolute; inset: 0; }}
.testo {{ position: absolute; right: 96px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; text-align: right; }}
h1 {{ font-family: Anybody; font-variation-settings: 'wdth' 130; font-weight: 800; font-size: 66px; line-height: 1; margin: 0; letter-spacing: -0.01em; }}
.ruolo {{ margin-top: 22px; font-size: 28px; color: {TEN}; font-weight: 500; }}
.barra {{ width: 110px; height: 9px; background: {AZ}; margin-top: 26px; }}
</style></head><body><div class="c">
<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}">{''.join(lines)}<circle cx="{CX}" cy="{CY}" r="6" fill="{AZ}"/></svg>
<div class="testo"><h1>Gestionali su misura</h1><div class="ruolo">Ingegnere gestionale freelance · San Marino e da remoto</div><div class="barra"></div></div>
</div></body></html>
''', encoding='utf-8')
print('scritto copertina-linkedin.html')
