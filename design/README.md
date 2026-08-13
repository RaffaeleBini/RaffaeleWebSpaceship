# Handoff: Portfolio HUD — Raffaele Bini

## Overview
Portfolio personale one-page a sezioni, con estetica da cockpit di astronave: shell fissa (status bar, sidebar di navigazione, colonna destra di telemetria) e viewport centrale che cambia contenuto per sezione. Sette sezioni: Home, About, Skills, Projects, Experience, Contact, Log.

## About the Design Files
I file in questo bundle sono **riferimenti di design scritti in HTML** — prototipi che mostrano aspetto e comportamento previsti, **non codice di produzione da copiare**. Il compito è **ricreare questo design nel codebase target** (Next.js, vedi stack sotto) usando i suoi pattern.

Il prototipo usa un runtime proprietario dell'ambiente di design (`support.js`, tag `<x-dc>`, `{{ }}`): serve solo per far girare il prototipo. Ignoralo. Leggi il file come una descrizione di markup + stili inline + logica di stato.

## Fidelity
**High-fidelity.** Colori, tipografia, spaziature, transizioni e microinterazioni sono definitivi. Ricrearli fedelmente.

---

## Stack tecnico (deciso con il cliente)

| Ambito | Scelta | Note |
|---|---|---|
| Framework | **Next.js** (App Router, TypeScript) | export statico dove possibile |
| Interattività | **React client components** | la HUD è client-side; il resto statico |
| Styling | **CSS puro + CSS custom properties** (CSS Modules per scoping) | nessun Tailwind: il design vive su ~12 variabili, mantenerlo semplice |
| Contenuti | **Markdown nel repo** (`content/`), letto a build time | progetti, esperienza, log |
| i18n | **EN default**, poi `/it`, `/es` | routing `[locale]`, EN a root |
| Form contatto | **Web3Forms** (POST diretto, no backend) | access key in env var |
| Hosting | **Vercel** | dominio `raffaelebini.com` (registrato Aruba → puntare i DNS a Vercel) |
| Analytics | **Vercel Web Analytics** | gratuito, zero configurazione, no cookie |
| Repo locale | `RaffaeleWebSpaceship` | il progetto Next va inizializzato qui |

### Perché queste scelte
- CSS puro: il linguaggio visivo è un set piccolo di token e nessun componente “di libreria”. Tailwind aggiungerebbe una toolchain senza risolvere nulla.
- Markdown nel repo: zero servizi esterni, versionato con il codice, editabile da Claude Code.
- Vercel: preview per ogni commit, dominio custom e analytics inclusi. Attenzione: il piano free è "hobby" (non commerciale). Se in futuro il sito diventa vetrina commerciale, valutare Cloudflare Pages (stesso deploy statico, senza clausola).

---

## Struttura file proposta

```
app/
  layout.tsx                 # <html>, font, theme provider, analytics
  page.tsx                   # EN (default) — monta <Hud locale="en"/>
  [locale]/page.tsx          # it | es
  api/                       # (non necessario: Web3Forms è client-side)
components/
  Hud/
    Hud.tsx                  # shell + stato di sezione (client component)
    StatusBar.tsx
    NavRail.tsx
    Viewport.tsx             # switch per sezione
    ShipNavigator.tsx        # SVG blueprint + rotazione + highlight
    SidePanels.tsx           # ship navigator, index/crew/stack, last entries
    Ticker.tsx
    Dossier.tsx              # modale progetto
    hud.module.css
  sections/
    Home.tsx About.tsx Skills.tsx Projects.tsx Experience.tsx Contact.tsx Log.tsx
content/
  en/ it/ es/
    about.md
    experience.md            # frontmatter con lista posizioni
    projects/<slug>.md       # frontmatter: code, title, short, tech, impact, status, image
    log/<slug>.md
lib/
  content.ts                 # lettura Markdown (gray-matter + remark)
  i18n.ts                    # dizionario UI + helper locale
styles/
  tokens.css                 # :root e [data-theme="light"]
public/
  images/projects/…
```

Dipendenze minime: `next`, `react`, `gray-matter`, `remark` + `remark-html`, `@vercel/analytics`. Nient'altro.

---

## Design tokens

### Colori — tema dark (default)
```
--bg        #06070A     sfondo pagina
--panel     #08090C     superfici (dossier, thumbnail)
--fg        #C9CED3     testo primario
--dim       #7E838A     testo secondario
--faint     #4E5257     label ed etichette tecniche
--amber     #F5B913     accento
--amberSoft rgba(245,185,19,.55)
--line      rgba(245,185,19,.13)   bordi e griglie
--glow      rgba(245,185,19,.13)   hover fill
--planet1   #4A380B  --planet2 #171205  --planet3 #08090C
--scrim     rgba(4,5,7,.72)
--veil      linear-gradient(90deg, rgba(6,7,10,0) 0%, rgba(6,7,10,.82) 20%, rgba(6,7,10,.94) 46%)
```

### Colori — tema light
```
--bg #EAEBED  --panel #F3F4F5  --fg #26292D  --dim #5C6268  --faint #9EA4AA
--amber #A8690A  --amberSoft rgba(168,105,10,.6)
--line rgba(168,105,10,.2)  --glow rgba(168,105,10,.09)
--planet1 #BFA76F  --planet2 #DCD4BE  --planet3 #EAEBED
--scrim rgba(214,216,219,.78)
--veil linear-gradient(90deg, rgba(234,235,237,0) 0%, rgba(234,235,237,.88) 20%, rgba(234,235,237,.97) 46%)
```
Il tema si applica con `data-theme="light"` sul contenitore radice. Default: dark. Persistere la scelta in `localStorage`.

### Tipografia (Google Fonts)
- **Orbitron** 400 — titoli grandi, cifre display. Home: `clamp(38px,5vw,72px)`, `letter-spacing:.01em`, `line-height:1.08`. Titoli sezione 26px. Cifre grandi 42–48px.
- **Rajdhani** 300/400/500 — corpo e navigazione. Corpo 15–16.5px `font-weight:300` `line-height:1.75`. Claim home 24px/1.4. Voci nav 14px `500` `letter-spacing:.1em`.
- **JetBrains Mono** 400 — tutte le etichette tecniche. 8.5–11px, `letter-spacing .1em–.32em`, UPPERCASE.

Regola: ogni etichetta di sistema è mono uppercase; ogni testo umano è Rajdhani; ogni numero o titolo che deve “urlare” è Orbitron.

### Spaziature e geometria
- Shell: status bar `46px`, footer `40px`, contenuto `flex:1`.
- Griglia centrale: `grid-template-columns: 250px 1fr 258px; gap:28px; padding:10px 26px 0`.
- Nessun bordo di contenimento: solo `border-bottom` / `border-top` da `1px solid var(--line)` e parentesi angolari 18×18px sugli angoli del dossier.
- `border-radius: 0` in tutto il design (unica eccezione: `rx=6` sul ponte di comando nell'SVG).
- Transizioni: colori `.25s`, parti nave `.5s cubic-bezier(.4,0,.2,1)`, rotazione nave `.8s cubic-bezier(.4,0,.2,1)`.

---

## Screens / Views

Tutte le sezioni condividono la shell; cambia solo la colonna centrale.

**Status bar (top)** — mono 10px, `letter-spacing:.16em`, colore `--dim`:
sinistra `◤ SYSTEM ONLINE` + pallino ambra che lampeggia (`blink 2.4s`); centro `RAFFAELE BINI · PORTFOLIO v2.0` (`letter-spacing:.24em`); destra `MILANO · 45.46°N 9.19°E`, orologio live `HH:MM:SS` in ambra, switch lingua `EN IT ES` (attiva ambra + underline), toggle tema `☾/☀` in box `1px solid var(--line)`, padding `2px 7px`.

**Sidebar (250px)** — badge `RB` 32×32 con bordo `--amberSoft`; nome su due righe Orbitron 19px ambra; ruolo mono 8.5px `line-height:2`; label `NAVIGATION` mono 9px `--faint`; 7 voci `01`–`07` (numero mono 10px opacità .6 + label Rajdhani 14px); la voce attiva è ambra e mostra una riga `linear-gradient(90deg,var(--amberSoft),transparent)` che si estende a destra. In basso `TELEMETRY`: tre righe chiave/valore separate da `border-bottom 1px solid var(--line)` — PROJECTS DELIVERED 21, PEOPLE TRAINED 165, AVAILABILITY OPEN.

**Viewport (centro)** — riga di intestazione mono 10px: a sinistra `// 0N. NOME`, a destra il meta della sezione (`MAIN VIEWPORT`, `MISSION PROFILE`, `SYSTEMS ONLINE`, `3 RECORDS`, `18+ YEARS`, `CHANNEL OPEN`, `3 ENTRIES`). Contenuto scrollabile. In basso, ticker opzionale alto 34px con `border-top`, marquee 44s, in pausa su hover: `21 DIGITALISATION PROJECTS DELIVERED · +40% PRODUCTIVITY VIA LEAN MANUFACTURING · 165 PEOPLE TRAINED ON DIGITAL TECHNOLOGIES` (duplicare la sequenza per il loop continuo).

**Colonna destra (258px)** — SHIP NAVIGATOR con indicatore `0N/07`; SVG della nave; etichetta della parte attiva; pannello ciclabile con `‹ ›` fra SUSTAINABILITY INDEX (72/100 + tre barre + label AMBIENTE/SOCIETÀ/TECNOLOGIA), CREW & TRAINING (165 people trained, 7 crews, 4 plants), CURRENT STACK (chip mono con bordo `--line`); in fondo LAST ENTRIES con tre righe data + titolo.

**Sfondo** — pianeta: cerchio 900px, `radial-gradient(circle at 28% 30%, --planet1, --planet2 58%, --planet3 76%)`, posizionato `right:-18%; top:46%`. Due anelli ellittici `1px solid var(--line)` ruotati `-18deg`. Tre meteore: righe da 64–90px con gradiente verso ambra, animazione `fall` (6s / 8.5s / 11s, delay diversi) che traslano `-340px, 320px` con fade in/out.

**Velo della colonna destra (importante)** — un layer `position:absolute; right:0; top:0; bottom:0; width:360px` con `background: var(--veil)` e `backdrop-filter: blur(4px)`, dentro il layer di sfondo (`pointer-events:none`), sopra pianeta e anelli. Serve a dare al testo della colonna destra una superficie leggibile **senza aggiungere bordi o card**. Non rimuoverlo: senza velo il testo cade sul pianeta e il contrasto va sotto soglia, soprattutto in tema light.

### Sezioni

1. **Home** — verticalmente centrata. Kicker mono `HELLO, I'M` `letter-spacing:.32em`; nome Orbitron su due righe; claim 24px "Engineering for a just and sustainable world."; paragrafo 16px `--dim` max 520px; CTA primaria: blocco pieno ambra, testo colore `--bg`, mono 11px `letter-spacing:.18em`, padding `14px 20px`, contenuto `REQUEST A BRIEFING →` (hover `opacity:.85`) → va a Contact; CTA secondaria testuale `VIEW MY WORK` con `border-bottom` che passa da `--line` ad ambra in hover → va a Projects.
2. **About** — griglia due colonne: testo (max 560px, titolo `MISSION PROFILE`, tre paragrafi) e a destra un placeholder immagine 270px con `repeating-linear-gradient(135deg, var(--glow) 0 1px, transparent 1px 11px)`, parentesi angolari 14px e didascalia mono centrata. Sostituire con un ritratto reale.
3. **Skills** — sei righe: label mono a sinistra, valore ambra a destra, sotto una barra `height:1px` su fondo `--line` con riempimento ambra alla percentuale. Sotto, chip di stack.
4. **Projects** — titolo `FLIGHT RECORD`, sottotitolo mono, lista di righe cliccabili `grid-template-columns:150px 1fr auto`, `border-bottom`, hover `background: var(--glow)`: thumbnail 76px in `--panel` con immagine `filter: saturate(.12) brightness(.72)` che in hover diventa `sepia(.5) saturate(1.7) hue-rotate(-12deg) brightness(.95)`; titolo Orbitron 16px; descrizione breve; riga meta con tech e impatto (`◈ AMBIENTE · SOCIETÀ`); freccia `→`. Click → dossier.
5. **Experience** — timeline `grid-template-columns:96px 1fr`: anni in mono ambra a sinistra, ruolo Rajdhani 500 + organizzazione mono `--faint` + nota 15.5px a destra. Sette voci (contenuto reale già nel prototipo, da spostare in `experience.md`).
6. **Contact** — due colonne: form (NAME / EMAIL / MESSAGE, input trasparenti con solo `border-bottom: 1px solid var(--line)`, label mono sopra) + bottone `TRANSMIT`; a destra i canali (email, LinkedIn, GitHub, sede) e una console mono che stampa `> encoding message… > routing via deep space net > TRANSMISSION SENT` e torna a `> channel idle` dopo 4s. In produzione: POST a Web3Forms, la console mostra stati reali (invio / ok / errore).
7. **Log** — voci separate da `border-top`: data mono ambra, titolo Rajdhani 500, nota. Tre voci brevi, non un blog completo.

**Dossier (modale progetto)** — overlay `z-index:20`; scrim `var(--scrim)` + `backdrop-filter: blur(7px)`, click fuori per chiudere; pannello 760px (max 88% / 82vh, scrollabile) su `--panel`, `padding:34px 36px`, `box-shadow:0 30px 80px rgba(0,0,0,.55)`; parentesi angolari ambra 18px in alto a sinistra e in basso a destra; header con codice `PROJECT DOSSIER · PRJ-00N`, titolo Orbitron 30px, bottone `CLOSE ✕`; immagine 250px; corpo in griglia `1fr 200px` con testo e tre blocchi meta (TECHNOLOGY, IMPACT DOMAIN, STATUS). Chiudere anche con `Esc` (da aggiungere in produzione).

---

## Ship Navigator (SVG) — specifica

Vista dall'alto, prua in alto, `viewBox="0 0 200 300"`, reso a 152×228 in un contenitore alto 242px con `perspective:820px`. Dietro, una griglia tecnica: `repeating-linear-gradient` a 20px su entrambi gli assi con colore `--line`, sfumata ai bordi con `mask-image: radial-gradient(ellipse at center,#000 40%,transparent 76%)` — deve stare su un div separato, non sul contenitore, altrimenti sfuma anche la nave.

Sette parti, ciascuna un gruppo di forme che condivide lo stesso stile:

| Parte | Sezione | Forme |
|---|---|---|
| `hull` | Experience | polygon dello scafo `100,8 117,66 123,152 119,246 81,246 77,152 83,66` + due pannelli interni |
| `comms` | Contact | due antenne 3×30, punta triangolare, base 14×6 |
| `bridge` | Home | rect 28×36 `rx=6` + cerchio r=7 |
| `labs` | Projects | due rect 44×48 laterali + linee di divisione interne |
| `hold` | Log | cerchio r=15 (nucleo) + rect 18×26 |
| `reactors` | Skills | due rect 34×42 + quattro ugelli 9×15 |
| `quarters` | About | rect 40×34 + linea interna + rect 24×8 |

**Stato attivo** (la parte corrispondente alla sezione corrente):
```
fill: rgba(245,185,19,.30);  stroke: var(--amber);  stroke-width: 1.6;
stroke-opacity: 1;  filter: drop-shadow(0 0 7px rgba(245,185,19,.55));
```
**Stato inattivo**: `fill: transparent; stroke: var(--amber); stroke-width: .9; stroke-opacity: .32; filter: none`.
Transizione `all .5s cubic-bezier(.4,0,.2,1)`.

**Rotazione 3D** per sezione (`transform` sull'`<svg>`, `transform-style: preserve-3d`, transizione `.8s cubic-bezier(.4,0,.2,1)`):
```
bridge    rotateX(52deg)  rotateZ(0deg)   scale(1.02)
quarters  rotateX(-56deg) rotateZ(14deg)  scale(1.04)
reactors  rotateX(-48deg) rotateZ(-20deg) scale(1.05)
labs      rotateX(64deg)  rotateZ(-26deg) scale(1.03)
hull      rotateX(34deg)  rotateZ(8deg)   scale(1)
comms     rotateX(62deg)  rotateZ(20deg)  scale(1.06)
hold      rotateX(46deg)  rotateZ(30deg)  scale(1.08)
```
Etichetta sotto la nave, mono 9px centrata: `COMMAND BRIDGE · HOME`, `CREW QUARTERS · ABOUT`, `REACTORS · SKILLS`, `LAB MODULES · PROJECTS`, `HULL · EXPERIENCE`, `SENSOR ARRAY · CONTACT`, `CARGO HOLD · LOG`.

Riferimento di forma: `spaceship-blueprint.png` in questa cartella. È una nave militare: nel design gli hangar diventano **moduli laboratorio** e i generatori di scudo diventano **reattori**; nessun armamento.

---

## Interactions & Behavior
- Cambio sezione: click su nav → aggiorna stato, ruota la nave, illumina la parte, aggiorna header e meta. Nessun ricaricamento.
- Toggle tema: cambia `data-theme`, persistito in `localStorage`.
- Pannelli laterali: ciclici con `‹ ›`.
- Dossier: apre/chiude con click; chiudere anche con `Esc`; blocco dello scroll sotto.
- Ticker: pausa in hover.
- Orologio: aggiornamento ogni secondo, ora locale.
- `prefers-reduced-motion`: disattivare meteore, marquee, blink e rotazione della nave (la parte attiva resta evidenziata).
- Accessibilità: le voci nav e i pannelli sono elementi cliccabili — in produzione usare `<button>`/`<a>` reali con focus visibile in ambra, e `aria-live` sulla console del form.

## State Management
`section` (una delle 7), `theme` (`dark|light`), `panel` (indice 0–2), `dossier` (slug o null), `clock` (stringa), `formState` (`idle|sending|sent|error`), `locale`. Tutto locale al componente `Hud` (`useState`), nessuna libreria di stato.

## Responsive
Il layout a tre colonne vive sopra 900px. Sotto: **layout mobile diverso**, verticale e senza cornice HUD — status bar ridotta a lingua + tema, nav come barra orizzontale scrollabile o menu, contenuto a piena larghezza, colonna destra soppressa; la nave resta solo come accento (una volta, in Home o About), senza rotazione. Non comprimere la HUD.

## i18n
EN alla root, `/it` e `/es` per le altre. Dizionario UI separato dai contenuti Markdown. Le etichette mono (SYSTEM ONLINE, TELEMETRY, ecc.) restano in inglese in tutte le lingue: sono parte dell'estetica. Le etichette di impatto attualmente in italiano (`AMBIENTE · SOCIETÀ · TECNOLOGIA`) vanno tradotte per locale. `hreflang` + `lang` corretti.

## Fase 1 (primo deploy)
Home, About, Skills, Projects + dossier, Experience, Contact + form. Solo EN. Log, IT/ES e mobile dedicato in fase 2.

## Assets
- `spaceship-blueprint.png` — riferimento di forma per l'SVG (non va pubblicato).
- `bio.md` — fonte dei testi reali di About ed Experience (già inseriti nel prototipo).
- Immagini progetti: tre PNG in `images/projects/` di questa cartella; da spostare in `public/images/projects/`.
- Ritratto per About: **mancante**, da fornire.
- Case study dei tre progetti: **mancanti**, nel prototipo sono segnaposto tra parentesi quadre.

## Files
- `NEXT-STEPS.md` — **guida operativa**: setup, ordine di sviluppo, prompt da dare a Claude Code, deploy, checklist.
- `Portfolio HUD.dc.html` — il prototipo completo (design di riferimento).
- `spaceship-blueprint.png` — riferimento nave.
- `images/projects/` — le tre immagini progetto: `refresh-food.png` (PRJ-001), `chef-hippo.png` (PRJ-002), `owly-api.png` (PRJ-003). Vanno in `public/images/projects/`.
- `bio.md` — testi reali di About ed Experience.
