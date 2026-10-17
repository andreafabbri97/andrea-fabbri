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

Lingua (dal 18/10/2026): ogni lingua ha il suo indirizzo, `/andrea-fabbri/` in inglese e `/andrea-fabbri/it/`
in italiano, così Google le indicizza tutte e due. Chi apre la pagina inglese con il browser in italiano, senza
aver mai scelto, passa da solo alla pagina italiana (lo script in testa alla pagina, prima che si veda);
la scelta fatta con EN/IT resta salvata nel browser (`af-lingua-scelta`) e vale da lì in poi. I motori di ricerca
non vengono mai spostati: niente scelta salvata e browser in inglese.

## Motori di ricerca e IA

`npm run build` fa tre cose: la build normale, la build per il server di `src/entry-server.jsx` e
`scripts/prerender.mjs`, che scrive la pagina **già piena di testo** nelle due lingue (`dist/index.html` e
`dist/it/index.html`). Così Google, e i programmi delle IA che non eseguono JavaScript (ChatGPT, Claude,
Perplexity), leggono tutti i progetti; fino al 18/10/2026 la pagina senza JavaScript aveva 106 parole.
Nel browser React riscrive la pagina (`createRoot`, non `hydrateRoot`: righello, tema e linea corta
dipendono dallo schermo).

In testa a ogni pagina, scritti dal prerender con i dati di `src/entry-server.jsx`: titolo e descrizione nella
lingua, collegamento canonico, `hreflang` verso l'altra lingua, Open Graph e i dati strutturati (Person,
ProfilePage e l'elenco dei sedici lavori). Il prerender scrive anche `sitemap.xml` (le due pagine con le
alternative) e `llms.txt` (il sito in testo semplice per le IA). Nel `index.html` sorgente quel posto è il
segnaposto `<!--seo-->`, la pagina è `<!--app-->`: non toglierli, se no la build si ferma.

Il file `public/<chiave>.txt` è la chiave di IndexNow, con cui il sito è segnalato a Bing e Yandex: non va
tolto. Google Search Console è attiva dal 18/10/2026 sull'account di Andrea (proprietà con prefisso URL),
verificata col meta tag `google-site-verification` in `index.html`: non toglierlo.
