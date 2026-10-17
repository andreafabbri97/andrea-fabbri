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

Niente link alle demo né al codice (17/10/2026, Andrea): i programmi hanno un accesso e i repository sono
privati. Dal 17/10/2026 è tolto anche il pulsante «Presentazione e lista d'attesa» di PRYOR (chiesto da Andrea);
chi vuole il codice usa i pulsanti GitHub in alto e nei contatti.

Cifre in inglese: dollari americani con gli australiani tra parentesi, convertiti dagli euro (cambio in DESIGN.md).
Icone e anteprima dei link: `strumenti/icone/`.

Lingua: si apre in italiano se il browser è in italiano, altrimenti in inglese; la scelta fatta con EN/IT resta salvata
nel browser (`af-lingua-scelta`). Fino al 17/10/2026 si apriva sempre in inglese.

## Motori di ricerca (17/10/2026)

Il sito non blocca l'indicizzazione. In `index.html` ci sono il collegamento canonico e la scheda «Person»
(JSON-LD, coi profili GitHub e LinkedIn); la mappa del sito è `public/sitemap.xml`. Il file
`public/<chiave>.txt` è la chiave di IndexNow, con cui il sito è stato segnalato a Bing e Yandex:
non va tolto. Per Google serve Google Search Console, dall'account di Andrea: verifica col meta tag
`google-site-verification` in `index.html`, poi invio di `sitemap.xml`.
