# Icone e anteprima

Rifanno l'icona dell'app, quella della scheda del browser e l'anteprima dei link condivisi (DESIGN.md, «Icone e anteprima»).

1. I due caratteri accanto a questi file (non sono nel repository):
   `curl -o anybody.woff2 https://fonts.gstatic.com/s/anybody/v13/VuJxdNvK2Ib2ppdWSKHdOQ.woff2` e
   `curl -o bricolage.woff2 https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y996as8bTXq_nANBjzKo3IeZx8z6up5L-iNGQ.woff2`
   (se Google cambia gli indirizzi: aprire il CSS di Google Fonts per Anybody e Bricolage Grotesque e prendere il file `latin`).
2. `pip install fonttools brotli`, poi `python3 -I disegna.py`.
3. `node rendi.cjs` (Playwright installato), poi `convert anteprima.png -strip -quality 88 ../../public/anteprima.jpg`.
4. Se cambiano le icone, alzare il numero della cache in `public/sw.js`.
