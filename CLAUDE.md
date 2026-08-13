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
Setup iniziale + **Blocco 1 (shell HUD) completato**: status bar, sidebar (7 voci + telemetria), viewport centrale (solo intestazione + segnaposto), colonna destra (ship navigator/pannello/last entries come contenitori, contenuto ancora segnaposto), footer, sfondo (pianeta/anelli/meteore/velo), toggle tema con persistenza `localStorage` e script anti-flash (`app/layout.tsx`), stato di sezione attiva. `data-theme` è applicato su `document.documentElement`, non su un wrapper locale. Nessuna sezione reale, form, dossier modale, SVG nave animato o i18n IT/ES implementati — Blocchi 2-7, vedi `design/NEXT-STEPS.md` §3.

Nota tecnica per i blocchi successivi: la colonna `1fr` della griglia centrale (`.main` in `hud.module.css`) usa `minmax(0, 1fr)`, non `1fr` semplice, e `.viewportCol` ha `min-width:0` — necessario perché contenuto non wrappato (es. il marquee del ticker) fa esplodere la larghezza della colonna in CSS Grid altrimenti. Mantenere questo pattern se si aggiungono altri elementi `white-space:nowrap` nella colonna centrale.
