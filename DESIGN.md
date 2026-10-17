# DESIGN.md — il sito di Andrea Fabbri

Scritto il 17/10/2026 prima del restyling, con la skill `frontend-design` e confrontato con i suoi cliché.
Vale per ogni modifica grafica successiva.

## Di chi è e a cosa serve

- **Chi:** Andrea Fabbri, ingegnere gestionale di San Marino che costruisce software operativo per
  aziende vere: sostituisce fogli di calcolo e lavoro a mano con sistemi in produzione.
- **Chi lo legge:** chi assume (la lingua di partenza è l'inglese, con le cifre in dollari australiani)
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

## Caratteri

**Bricolage Grotesque**, una famiglia sola (Google Fonts, variabile per peso, larghezza e corpo ottico).
- Titoli: peso 700-800, larghezza 85-90%, interlinea stretta. Il nome in apertura è grande e fa da
  immagine: niente sfumature colorate sopra.
- Testo: peso 400, corpo 17 px sul telefono e 18 px sul computer, righe sotto i 75 caratteri.
- Cifre: `tabular-nums`, così i numeri dell'indice e dei riquadri si allineano.
- Etichette in minuscolo con l'iniziale maiuscola, mai in maiuscoletto spaziato.

## Impaginazione

Allineamento a sinistra ovunque (niente blocchi centrati, tranne nessuno).

```
Telefono (390)                 Portatile (≈1520)                          4K (≈2560 col 150%)
┌──────────────┐               ┌──────────────────────────────────────┐   come il portatile, con tutto
│ nome         │               │ nome, ruolo, testo │ indice dei lavori│   in rem e la radice più grande
│ ruolo, testo │               │ bottoni            │ (16 righe, stato)│   (da 2200 px: 20 px, da 3000: 22)
│ bottoni      │               ├──────────────────────────────────────┤
│ indice       │               │ gruppo: titolo + una riga             │
├──────────────┤               │ progetto: testo (7) │ numeri (5)      │
│ progetto     │               │           funzioni in due colonne     │
│ numeri       │               │           schermata a tutta larghezza │
│ mostra di più│               └──────────────────────────────────────┘
└──────────────┘
```

- Contenitore: 1240 px fino al portatile, poi cresce in `rem` con la radice: a 4K la pagina occupa lo
  schermo come sul portatile, invece di restare una colonna in mezzo al vuoto.
- Bordo laterale: 16 px sul telefono.
- I progetti sono tutti dello stesso modello (settore, titolo, stato, frase, descrizione, numeri,
  funzioni, tecnologie), così si confrontano a colpo d'occhio. I due di punta (Lenny, PRYOR) aggiungono
  i moduli; Lenny anche il conto dei risparmi.
- Gruppi: Prodotti di punta · Lavori per i clienti · Prodotti e progetti propri · Sistemi personali.

## Movimento

Ricette della skill `animazioni-scroll` del Second Brain, rifatte senza librerie (`src/components/motion.js`).
Poche cose, ognuna perché aiuta a capire o a orientarsi:

- **Apertura** (l'unico momento che parte da solo): il nome sale e l'indice dei lavori si compone riga per riga.
- **I numeri contano** la prima volta che compaiono (1,4 s, curva che rallenta alla fine), compreso il risparmio di
  Lenny. Il valore vero è quello scritto nella pagina e quello letto dai lettori di schermo; il conteggio scrive
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
