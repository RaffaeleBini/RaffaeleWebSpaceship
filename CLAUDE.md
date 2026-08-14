# Portfolio HUD — Raffaele Bini

Portfolio personale one-page a sezioni, estetica "cockpit di astronave" (HUD). La specifica di design vincolante è in `design/README.md` — leggerla per intero prima di implementare qualunque sezione. La guida operativa per l'ordine di sviluppo è in `design/NEXT-STEPS.md`.

## Stack
- Next.js (App Router, TypeScript), export statico dove possibile
- React client components solo per la HUD interattiva; il resto statico
- **CSS puro + CSS custom properties** (CSS Modules per lo scoping) — **niente Tailwind**, niente librerie UI
- Contenuti in Markdown sotto `content/`, letti a build time
- i18n: EN alla root, poi `/it`, `/es` (fase 2)
- Form contatto: Web3Forms (POST diretto, no backend)
- Hosting: Vercel

## Regole non negoziabili
- `border-radius: var(--radius)` (4px) su componenti/bottoni, non 0 — vedi "Riconciliazione con rb-system-tokens.json" sotto (unica eccezione invariata: `rx=6` sul ponte di comando nell'SVG della nave, valore SVG non CSS)
- Nessun bordo di contenimento: solo `border-top`/`border-bottom` da `1px solid var(--line)`
- Ogni etichetta di sistema è mono uppercase (JetBrains Mono); ogni testo umano è Rajdhani; ogni numero/titolo che deve "urlare" è Orbitron
- I design tokens vivono in `styles/tokens.css`; non inventare/hardcodare valori altrove — richiamare sempre il README per i valori esatti
- `design/spaceship-blueprint.png` è solo riferimento: non va mai pubblicato in `public/`

## Design tokens
Definiti in `styles/tokens.css`: tema dark (default, `:root`) e tema light (`:root[data-theme="light"]`), applicato tramite `data-theme` sul contenitore radice, persistito in `localStorage`. Valori esatti e regole tipografiche/spaziatura complete in `design/README.md`.

## Riconciliazione con rb-system-tokens.json
Alla radice esiste `rb-system-tokens.json`, il design system di brand più ampio ("RB System"). È stato confrontato con `design/README.md` (spec specifica di questo portfolio) e con l'utente sono state decise queste riconciliazioni — valide finché non indicato diversamente:
- **Colore accento**: aggiornato a `#EFCD00` (dal JSON) in `--amber` del tema **dark**. Il tema **light** mantiene il suo amber originale `#A8690A` (variante già pensata per contrasto su sfondo chiaro, il JSON non distingue i due temi) — se va allineato anche lui, va deciso esplicitamente.
- **Border-radius**: aggiornato a 4px (dal JSON, token `--radius`) al posto di 0. Da applicare quando si implementano i componenti (bottoni, chip, thumbnail, dossier, ecc.).
- **Font corpo**: resta **Rajdhani** (non Work Sans del JSON) — deviazione intenzionale confermata dall'utente.
- **Griglia/spaziatura** (gap 8px, padding 12px, griglia 12 colonne) e **testo minimo 16px** del JSON: **non applicati**, resta la spaziatura specifica del portfolio HUD (griglia 3 colonne `250px 1fr 258px` gap 28px, microtipografia mono fino a 8.5px) — deviazione intenzionale confermata dall'utente.
- Logo (`public/images/logo.png`), icone e tono di voce del JSON: nessun conflitto rilevato / non ancora applicabili, nessuna modifica necessaria.

## Struttura file
```
app/                        # layout.tsx (font + tokens.css), page.tsx
components/
  Hud/                       # shell HUD (client component) + hud.module.css
  sections/                  # Home, About, Skills, Projects, Experience, Contact, Log
content/
  en/ (it/ es/ in fase 2)
    about.md, experience.md, projects/<slug>.md, log/<slug>.md
lib/
  content.ts                 # lettura Markdown
  i18n.ts                    # dizionario UI
styles/
  tokens.css
public/
  images/
    logo.png                 # badge in alto a sinistra nella sidebar
    about-portrait.png        # ritratto sezione About
    projects/                 # immagini progetti
design/                       # bundle di design originale (riferimento, non da pubblicare per intero)
```

## Immagini
- `public/images/logo.png` — logo (badge sidebar in alto a sinistra, al posto del testo "RB" del prototipo)
- `public/images/about-portrait.png` — ritratto reale per la sezione About
- `public/images/projects/{refresh-food,chef-hippo,owly-api}.png` — immagini progetto
- `design/images/RaffaelePortrait.png` e `design/images/RBLogoScuro.png` non sono ancora assegnati a un uso — da chiarire prima di pubblicarli

## Gestione contenuti
Per ora sorgente unica: Markdown + frontmatter in `content/`, versionato con il codice (nessun servizio esterno, coerente con l'hosting gratuito "hobby" su Vercel). Per rendere sostenibile l'aggiunta/modifica di progetti, esperienza e skill senza toccare il codice, valutare in una fase successiva un editor git-based (es. Decap CMS o TinaCMS) che scrive sugli stessi file Markdown — nessuna migrazione di dati necessaria. Evitare un CRUD custom con database: aggiungerebbe hosting a pagamento e complessità non necessarie per un sito statico personale.

## Stato del progetto
Setup iniziale + **Blocco 1 (shell HUD)** + **Blocco 2 (Ship Navigator)** + **Blocco 3 (sezioni Home/About/Skills/Experience)** completati. Blocco 1: status bar, sidebar (7 voci + telemetria), viewport centrale, colonna destra, footer, sfondo (pianeta/anelli/meteore/velo), toggle tema con persistenza `localStorage` e script anti-flash (`app/layout.tsx`), stato di sezione attiva. `data-theme` è applicato su `document.documentElement`, non su un wrapper locale. Blocco 2 (`components/Hud/ShipNavigator.tsx`): SVG reale a 7 parti, rotazione 3D per sezione (`SHIP_ORIENT`/`PART_LABELS` in `components/Hud/sections.ts`), highlight della parte attiva, transizione disattivata sotto `prefers-reduced-motion` (classe `.shipSvg`, non inline style).

Blocco 3: `components/sections/{Home,About,Skills,Experience}.tsx` + `sections.module.css` condiviso. Contenuti letti a build time da `content/en/{about,skills,experience}.md` via `lib/content.ts` (gray-matter + remark/remark-html, dipendenze aggiunte). `about.md` usa il body Markdown (resa a HTML, paragrafi differenziati via CSS `:first-child`); `skills.md` ed `experience.md` tengono i dati in frontmatter YAML (liste), non nel body, letti direttamente da gray-matter senza remark. Il caricamento avviene in `app/page.tsx` (Server Component) che passa `content: PortfolioContent` a `<Hud>` (client) e da lì a `Viewport`/sezioni — è l'unico punto che tocca il filesystem. `public/images/about-portrait.png` (in realtà `RaffaeleCommander.png`, per scelta esplicita dell'utente) è ora usato in About con un filtro "scansione tecnica" (`saturate/brightness/contrast`), non più segnaposto. Aggiunto il peso Rajdhani 600 (mancante da Blocco 1, serve per i titoli ruolo in Experience/Log) in `app/layout.tsx`.

Home/About/Skills/Experience non usano più il placeholder "Blocco 3". Home ha due CTA (`REQUEST A BRIEFING` → Contact, `VIEW MY WORK` → Projects) tramite `onNavigate` passato da `Hud.tsx`.

**Blocco 4 (Projects + Dossier) completato**: `content/en/projects/{refresh-food,chef-hippo,owly-api}.md` (frontmatter con code/title/short/tech/impact/status/image/detailTech/detailImpact, body = case study placeholder "[CASE STUDY — 3 paragraphs...]", ancora da scrivere) letti da `getProjectsContent()` in `lib/content.ts`, ordinati per `code`. Le etichette impatto erano in italiano nel prototipo (AMBIENTE/SOCIETÀ) e una label della UI ("CLICCA UN PROGETTO...") era rimasta non tradotta: entrambe tradotte in inglese per coerenza con il resto del sito EN-only — se in futuro si trovano altre stringhe italiane residue nel prototipo, vanno tradotte allo stesso modo. `components/sections/Projects.tsx` renderizza la lista cliccabile; `components/Hud/Dossier.tsx` è il modale (overlay `z-index:20`, scrim + blur, parentesi angolari 18px), montato da `Hud.tsx` solo quando `dossier` (slug) è valorizzato, cercando il progetto in `content.projects`. `Hud.tsx` gestisce anche: chiusura con `Esc` e blocco scroll (listener su `window` per `wheel`/`touchmove` con `preventDefault`, attivi solo mentre il dossier è aperto) — verificato che lo scroll della lista dietro il modale resti bloccato. Nota: i tag `<p>` generati da remark (about.md, dossier body) vanno sempre azzerati esplicitamente (`margin:0` + regola dedicata per lo spazio tra paragrafi), perché `globals.css` non ha un reset universale dei margini e il margine di default del browser altrimenti si somma a quello del design.

**Blocco 5 (Contact) completato**: `components/sections/Contact.tsx` è un client component autonomo (stato locale `name/email/message/formState`, non sollevato a `Hud.tsx` — nessun altro componente ne ha bisogno). POST diretto a `https://api.web3forms.com/submit` con `access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY`. Stati `idle/sending/sent/error` mostrati nella console mono con cursore lampeggiante; su successo il form si svuota e torna a `idle` dopo 4s, su errore i campi restano compilati. Chiave in `.env.local` (gitignored, vedi `.env.local.example` — creato e reso eccezione esplicita in `.gitignore` con `!.env.local.example`, perché la regola `.env*` altrimenti lo avrebbe ignorato). **Nota importante non ancora risolvibile in locale**: testato in questo ambiente (browser headless + curl) e Web3Forms ha risposto sempre con blocco CORS/403 — il messaggio del loro endpoint è esplicito: *"This method is not allowed. Use our API in client side or contact support with server IP address (Pro plan is required)"*. Web3Forms blocca le richieste che arrivano da IP di datacenter/server (come questo ambiente), non solo le richieste non-browser — quindi il percorso `sending → error` è verificato, ma il percorso `sending → sent` **non è verificabile da qui** e va testato solo a sito deployato su Vercel con una vera access key, da un browser reale su una rete residenziale/ufficio.

Contact non usa più il placeholder. Log resta placeholder (fase 2, non un blocco NEXT-STEPS separato).

**Blocco 6 (mobile, sotto 900px) completato.** Il prototipo era solo desktop, quindi le scelte sotto sono state decise con l'utente (non dedotte dal prototipo): nav come barra orizzontale scrollabile (non hamburger), identità+telemetria in un header compatto sempre visibile (non solo dentro Home), nave come accento statico (senza rotazione) solo in Home.

Architettura: niente `matchMedia`/JS per il breakpoint, tutto risolto con CSS media query `@media (max-width: 899px)` — stesso DOM per entrambi i layout, elementi desktop-only (`NavRail`, `SidePanels`, il velo `.veil`) e mobile-only (`MobileHeader`, `.shipAccent`, la telemetria duplicata in `Home`) nascosti con `display:none` a seconda del breakpoint. Vantaggio: nessun rischio di hydration mismatch, funziona anche a JS disabilitato. Svantaggio noto: alcuni elementi (es. le 7 voci di navigazione) esistono duplicati nel DOM, uno per layout — accettabile perché `display:none` li rimuove comunque dall'accessibility tree e dal tab order, ma se in futuro serve un audit screen-reader completo (Blocco 7) è il primo posto da controllare.

Nuovi file: `components/Hud/ShipSvg.tsx` (le 25 forme SVG della nave estratte da `ShipNavigator.tsx`, ora condivise anche da `ShipAccent.tsx` — evita di duplicare tutta la geometria); `components/Hud/ShipAccent.tsx` (nave statica, sempre `activePart="bridge"`, nessuna rotazione); `components/Hud/MobileHeader.tsx` (logo+nome+ruolo compatti + nav orizzontale, riusa `SECTIONS` da `sections.ts`). `TELEMETRY` spostato da `NavRail.tsx` a `sections.ts` perché ora renderizzato in due punti (sidebar desktop e `Home.tsx` mobile).

Su mobile `.hud` passa da `height:100vh;overflow:hidden` (shell fissa con scroll interni per colonna) a `height:auto;overflow:visible` (la pagina scrolla normalmente, niente scroll-in-scroll) — `.background` diventa `position:fixed` per restare un fondale coerente durante lo scroll invece di stirarsi sull'altezza totale della pagina. `About`/`Contact` passano da griglia due colonne a colonna singola; `Projects` riduce la thumbnail e nasconde la freccia `→`; il modale `Dossier` passa a `width:92%` e corpo a colonna singola. Verificato: nessun overflow orizzontale in nessuna sezione (incluso il dossier), nessuna regressione visiva sopra i 900px (screenshot pixel-identici al Blocco 5).

Nessun i18n IT/ES implementato — resta solo il Blocco 7 (rifiniture: focus visibile, aria, meta/OG, audit accessibilità) prima del primo deploy, vedi `design/NEXT-STEPS.md` §3 e §6 (checklist pre-lancio).

Nota tecnica per i blocchi successivi: la colonna `1fr` della griglia centrale (`.main` in `hud.module.css`) usa `minmax(0, 1fr)`, non `1fr` semplice, e `.viewportCol` ha `min-width:0` — necessario perché contenuto non wrappato (es. il marquee del ticker) fa esplodere la larghezza della colonna in CSS Grid altrimenti. Mantenere questo pattern se si aggiungono altri elementi `white-space:nowrap` nella colonna centrale.
