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
- `border-radius: 0` ovunque (unica eccezione: `rx=6` sul ponte di comando nell'SVG della nave)
- Nessun bordo di contenimento: solo `border-top`/`border-bottom` da `1px solid var(--line)`
- Ogni etichetta di sistema è mono uppercase (JetBrains Mono); ogni testo umano è Rajdhani; ogni numero/titolo che deve "urlare" è Orbitron
- I design tokens vivono in `styles/tokens.css`; non inventare/hardcodare valori altrove — richiamare sempre il README per i valori esatti
- `design/spaceship-blueprint.png` è solo riferimento: non va mai pubblicato in `public/`

## Design tokens
Definiti in `styles/tokens.css`: tema dark (default, `:root`) e tema light (`:root[data-theme="light"]`), applicato tramite `data-theme` sul contenitore radice, persistito in `localStorage`. Valori esatti e regole tipografiche/spaziatura complete in `design/README.md`.

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
Solo setup iniziale completato (init Next.js, token, font, struttura cartelle vuota). Nessuna sezione/blocco visivo implementato. Sviluppo per blocchi, uno alla volta, con verifica a video prima di passare al successivo — vedi `design/NEXT-STEPS.md` §3.
