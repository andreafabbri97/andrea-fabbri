# DESIGN.md — il sito di Andrea Fabbri

Scritto il 17/10/2026 prima del restyling, con la skill `frontend-design` e confrontato con i suoi cliché.
Vale per ogni modifica grafica successiva.

## Di chi è e a cosa serve

- **Chi:** Andrea Fabbri, ingegnere gestionale di San Marino che costruisce software operativo per
  aziende vere: sostituisce fogli di calcolo e lavoro a mano con sistemi in produzione.
- **Dove lavora:** vive a San Marino ma prende lavori in tutto il mondo, da remoto, e si sposta volentieri (detto da lui il 17/10/2026): il sito non lo presenta come uno sviluppatore solo per San Marino, ed è per questo che è anche in inglese.
- **Chi lo legge:** chi assume (la lingua di partenza è l'inglese, con le cifre in dollari americani e tra parentesi in australiani, convertite dagli euro al cambio BCE del 16/10/2026: 1 € = 1,1253 US$ = 1,6171 A$)
  e chi potrebbe commissionargli un lavoro.
- **Il compito della pagina:** in dieci secondi far capire «questa persona porta in produzione sistemi
  che fanno risparmiare soldi», poi lasciar scegliere quale progetto aprire.

## L'idea

**L'indice dei lavori.** Accanto al nome, in apertura, c'è l'elenco di tutti i progetti con settore e
stato (in produzione, in sviluppo, demo, beta). È la cosa più vera che il sito possa dire di lui: tanti
sistemi, quasi tutti in uso, per settori diversi. Ed è anche la navigazione: la pagina è lunga, l'indice
porta dove si vuole in un tocco. È l'unico elemento «forte»; il resto è sobrio.

Il resto è disciplina da ingegnere gestionale: misure vere, numeri allineati, stati scritti a parole e
non solo a colori, nessuna decorazione che non dica qualcosa.

## Colori

L'accento è l'**azzurro della bandiera di San Marino**, il posto da cui vengono quasi tutti i clienti.
Il secondo è l'**oro della corona dello stemma**, usato solo per i soldi (risparmi, ROI).

| Nome | Chiaro | Scuro | Uso |
|---|---|---|---|
| carta | `#F3F6F8` | `#0E1822` | fondo della pagina |
| foglio | `#FFFFFF` | `#152330` | riquadri (numeri, indice) |
| inchiostro | `#122130` | `#E7EEF4` | testo e titoli |
| tenue | `#566676` | `#9BAEBF` | testo secondario |
| linea | `#D5DEE6` | `#263A4C` | bordi e divisori |
| azzurro | `#1C74AE` | `#6CC3EE` | collegamenti, accento, stato «demo» |
| oro | `#9A6F12` | `#E2B653` | solo cifre di denaro |

Gli stati hanno colore **e** parola: produzione verde (`#2E7D4F` / `#5DD39E`), sviluppo ambra
(`#A8670D` / `#F0B357`), demo azzurro, beta viola tenue (`#6B5BA8` / `#B4A6F0`).

Tema: segue il sistema; si sceglie chiaro, scuro o automatico dal bottone in alto, come nel cruscotto
del Second Brain. La scelta resta nel browser.

### Il colore di ogni progetto (17/10/2026)

Ogni progetto ha il colore del suo settore (`hue` in `src/data/projectsMeta.js`, una tinta OKLCH da 0 a 360; il
tema decide luminosità e saturazione: 52% e 0,15 in chiaro, 78% e 0,13 in scuro). Compare nel quadratino
dell'indice, nella frase di sintesi, nelle tacche dei numeri, nei pallini delle funzioni e nel disegno.
Le cornici dei disegni seguono il tema (`--cornice`, 17/10/2026, su richiesta di Andrea): nel chiaro un foglio bianco
con le linee nel colore del settore al 54%, nello scuro una cornice scura con le linee all'80%. Prima erano scure in
tutti e due i temi, e nel chiaro sembravano macchie nere. Il colore viene dal contenuto, l'interfaccia resta sobria.

## Caratteri

Due famiglie, scelte per contrasto di **larghezza** (non grazie contro bastoni):
- **Anybody** allargato (`wdth` 130, classe `.largo`): il nome in apertura, i titoli dei gruppi e delle sezioni,
  i numeri. È il gesto forte.
- **Bricolage Grotesque** (`wdth` 88-100): titoli dei progetti, testo, etichette. Corpo 17 px sul telefono e
  18 px sul computer, righe sotto i 75 caratteri. Cifre `tabular-nums`.
- Niente parola in corsivo con le grazie, niente etichette in maiuscolo monospazio: sono i cliché.
- Il titolo dell'indice resta in Bricolage: la «I» maiuscola di Anybody allargato sembra minuscola.

## Le cinque cose che danno ricchezza (studiate su ArtCraft il 17/10/2026)

1. **Il colore lo portano i contenuti.** Per ogni progetto un **disegno a linee fatto con quello che il progetto
   gestisce** (`src/components/drawings/`). Niente schermate (tolte il 17/10/2026, scelto da Andrea): possono mostrare
   dati dei clienti e ogni gestionale ha una grafica sua, che non si lega al sito. Platform: il quadrante delle 24 ore con
   i 12 cron e l'ERP fra driver, partner, clienti e IA; PRYOR: la pipeline con i segnali di rischio e la mossa di oggi;
   Restaurant: la sala e il conto diviso in tre; SUP: il calendario del giorno per tavola e pedalò; B2Work: il raggio di
   ricerca con i lavoratori dentro. Poi
   le fasce del forno della pizzeria con il tetto di 14, le due strade dell'NCC, la griglia del sostegno, le tre
   ore dell'impresa di scavi, la partita doppia, le unità di misura del magazzino, i negozi aperti, il codice
   WhatsApp, il repository del Second Brain, la mappa del coach, il d20. Sono schemi, non dati dei clienti.
   Si tracciano da soli la prima volta che arrivano sullo schermo.
2. **Un disegno di sfondo in apertura:** le curve di livello del Monte Titano (739 m, da Wikipedia), che si
   tracciano all'avvio e scorrono piano con la pagina. Sul telefono sfumano verso l'alto per non stare sotto il
   testo, e la scritta della vetta non c'è.
   Sul telefono e sul tablet la vetta si sposta accanto all'ultimo pulsante dell'apertura (misurato sulla pagina),
   perché sotto ci sarebbe l'indice; l'indice è un vetro smerigliato (fondo al 45% e sfocatura di 1,5 px: con 75% e 12 px le curve sparivano), così le curve si
   intravedono anche sotto. La sfumatura in alto è in rem (14rem), non in percentuale: l'apertura sul telefono è lunga.
3. **La struttura si vede:** binari ai lati della colonna, crocette dove le righe li incontrano, cornici con la
   barra in alto («Schema · settore» e «3 di 16», cioè il posto nell'indice), numeri in una fila a bordi
   disegnati, la striscia che scorre con tutte le tecnologie.
4. **Movimento legato allo scorrimento** (solo mouse e almeno 1440 pixel): il righello a destra con la
   percentuale letta, e in basso a destra i nomi delle sezioni impilati, con quella attuale in evidenza.
   Dove non ci sta (telefono, tablet, portatile stretto) c'è il righello corto (`Avanzamento.jsx`, 17/10/2026,
   chiesto da Andrea): una linea sottile sul bordo basso della barra in alto che si riempie leggendo, con una
   tacca alta dove inizia ogni sezione e una bassa dove inizia ogni progetto. Senza percentuale: sotto la barra
   coprirebbe il testo.
5. **Contrasto di caratteri:** vedi sopra.

## Icone e anteprima

- **Icona dell'app** (`pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png`): «AF» in Anybody largo (wdth 112,
  peso 850) su fondo scuro, con le curve del Titano dietro e la barretta azzurra. Le lettere stanno nel cerchio sicuro
  del 40%, quindi la stessa immagine va bene anche come icona «maskable».
- **Icona della scheda del browser** (`favicon.svg`): solo «AF» e la barretta, più grandi, perché si vede a 16 pixel.
- **Anteprima dei link condivisi** (`anteprima.jpg`, 1200 × 630, meta `og:` in `index.html`): il nome, il ruolo, «Based in
  San Marino · working remotely, worldwide» e le curve del Titano.
- Si rifanno con `strumenti/icone/` (vedi il suo README): le lettere sono tracciati presi dal font con fontTools,
  non testo, così l'icona non dipende dai caratteri installati.

## Impaginazione

Allineamento a sinistra ovunque (niente blocchi centrati, tranne nessuno).

```
Telefono (390)                 Portatile (≈1520)                          Fisso 4K (3072 × 1516, Windows al 125%)
┌──────────────┐               ┌──────────────────────────────────────┐   come il portatile, con tutto
│ nome         │               │ nome, ruolo, testo │ indice dei lavori│   in rem e la radice più grande
│ ruolo, testo │               │ bottoni            │ (16 righe, stato)│   (da 2200 px: 20 px, da 3000: 22)
│ bottoni      │               ├──────────────────────────────────────┤
│ indice       │               │ gruppo: titolo + una riga             │
├──────────────┤               │ progetto: testo (7) │ numeri (5)      │
│ progetto     │               │           funzioni in due colonne     │
│ numeri       │               │           disegno a tutta larghezza  │
│ mostra di più│               └──────────────────────────────────────┘
└──────────────┘
```

- Contenitore: 1240 px fino al portatile, poi cresce in `rem` con la radice: 1920 px a 2560 e 2200 px sul
  fisso (3072, testo a 22 px, come il cruscotto del Second Brain). La misura del fisso è nella memoria del
  Second Brain (nota sulla pagina del cruscotto): 4K con Windows al 125%, finestra 3072 × 1516.
- Bordo laterale: 16 px sul telefono.
- I progetti sono tutti dello stesso modello (settore, titolo, stato, frase, descrizione, numeri,
  funzioni, tecnologie), così si confrontano a colpo d'occhio. I due di punta (Platform, PRYOR) aggiungono
  i moduli; Platform anche il conto dei risparmi.
- Il progetto di punta sul food delivery si chiama solo **Platform** (deciso da Andrea il 17/10/2026): il nome
  dell'azienda compare solo nelle esperienze lavorative, mai nella parte dei progetti (titolo, ancora `#platform`, testi).
- Gruppi: Prodotti di punta · Lavori per i clienti · Prodotti e progetti propri · Sistemi personali.

## Movimento

Ricette della skill `animazioni-scroll` del Second Brain, rifatte senza librerie (`src/components/motion.js`).
Poche cose, ognuna perché aiuta a capire o a orientarsi:

- **Apertura** (l'unico momento che parte da solo): il nome sale e l'indice dei lavori si compone riga per riga.
- **I numeri contano** la prima volta che compaiono (1,4 s, curva che rallenta alla fine), compreso il risparmio di
  Platform. Il valore vero è quello scritto nella pagina e quello letto dai lettori di schermo; il conteggio scrive
  il testo direttamente, senza stato di React a ogni fotogramma. I valori senza un numero solo (`16/16`, `WCAG AA`)
  restano fermi.
- **I titoli dei gruppi e delle sezioni entrano** una volta sola: 28 px più in basso, sfocati di 8 px, 0,9 s, quando
  arrivano all'85% dello schermo. Solo quelli: non ogni blocco. Alla fine niente `filter` rimasto (su Windows
  peggiora il testo).
- **La barra in alto dice dove sei**: accanto al nome (sotto, sul telefono) il progetto che stai leggendo, che
  cambia con una dissolvenza breve. I link restano fermi al centro (griglia a tre colonne).
- Tutto il resto si muove solo per un gesto: «Mostra di più», il menu, il tema.
- Con «riduci movimento» nel sistema non si muove niente e la pagina è intera da subito.
- Hover solo dentro `@media (hover: hover)`; niente riquadro azzurro al tocco (`html`).

## Cliché evitati (controllati sull'elenco della skill)

- Via il fondo quasi nero con la sfumatura indaco-viola e il bagliore dietro il titolo: era il cliché
  «scuro con un accento acceso» più la sfumatura decorativa.
- Via le etichette in maiuscolo spaziate sopra ogni titolo e il monospazio per le date.
- Via le schede tutte uguali con lo stesso raggio e l'ombra grigia: i riquadri esistono solo dove
  raccolgono qualcosa (numeri, indice), il resto sta sulla carta.
- Niente «01 / 02»: i progetti non sono una sequenza. I numeri compaiono solo dove sono misure.
- Niente frecce aggiunte ai bottoni, niente parola evidenziata in un titolo.
