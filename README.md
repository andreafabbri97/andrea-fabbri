# Andrea Fabbri — sito personale

Il biglietto da visita di Andrea: chi è, l'indice di tutti i progetti e, per ognuno, cosa fa e con quali numeri.
Online su https://andreafabbri97.github.io/andrea-fabbri/

## Come si pubblica

```bash
npm install
npm run dev       # in locale
npm run deploy    # costruisce e pubblica sul ramo gh-pages (è lui che va online, non main)
```

Il push su `main` salva il codice ma **non** aggiorna il sito: serve `npm run deploy`.

## Com'è fatto

- Vite + React 19 + Tailwind CSS 3, nessun server.
- L'aspetto è deciso in [`DESIGN.md`](DESIGN.md): colori, carattere, impaginazione, movimento. Va letto prima di
  ogni modifica grafica.
- Tema chiaro, scuro o automatico (bottone in alto), lingua inglese o italiana: tutte e due le scelte restano nel browser.
- Sopra i 2200 pixel di larghezza (il 4K del fisso) tutta la pagina cresce in proporzione.

## Dove stanno i testi

| File | Cosa |
|---|---|
| `src/data/projectsMeta.js` | i gruppi, l'ordine dei progetti, stato, tecnologie, link |
| `src/data/projectsEn.js`, `projectsIt.js` | i testi di ogni progetto nelle due lingue |
| `src/data/flagship.js` | i moduli di Platform e PRYOR |
| `src/data/siteCopy.jsx` | apertura, esperienza, competenze, contatti, barra in alto |

Un progetto nuovo: una riga in `projectsMeta.js` (nel gruppo giusto), il suo testo nei due file di lingua e il suo disegno
in `src/components/drawings/` (registrato in `drawings/index.js`). Niente schermate: ogni progetto ha un disegno.
Compare da solo nell'indice dei lavori e nella pagina.

🔴 **AniZip (e StreamZip, MusicZip) non si mette e non si cita.** I progetti dei clienti si descrivono senza nome,
luogo preciso, link o schermate.

Cifre in inglese: dollari americani con gli australiani tra parentesi, convertiti dagli euro (cambio in DESIGN.md).
Icone e anteprima dei link: `strumenti/icone/`.
