# Prossimi passi — dal prototipo al sito online

Guida operativa. Da eseguire nell'ordine. Il riferimento di design è `README.md` in questa cartella: Claude Code deve leggerlo per primo, sempre.

---

## 0. Cosa serve prima di iniziare (30 minuti)

| Cosa | Dove | Note |
|---|---|---|
| Node.js 20+ | nodejs.org | `node -v` per verificare |
| Git | git-scm.com | |
| Account GitHub | github.com | repo privato o pubblico, indifferente |
| Account Vercel | vercel.com | login con GitHub |
| Access key Web3Forms | web3forms.com | gratuita, arriva via email |
| Claude Code | `npm i -g @anthropic-ai/claude-code` | poi `claude` nella cartella del progetto |
| Accesso DNS Aruba | pannello Aruba | serve solo alla fine, per il dominio |

**Materiali che mancano e che devi produrre tu** (senza questi il sito parte con segnaposto):
1. Ritratto per la sezione About — foto verticale, sfondo semplice, 1200px di lato minimo.
2. Tre case study, uno per progetto: 3 paragrafi ciascuno (contesto → cosa hai fatto → risultato misurato).
3. Conferma dei numeri pubblici: 21 progetti, 165 persone formate, 18+ anni.

---

## 1. Preparare la cartella

```bash
cd ~/percorso/RaffaeleWebSpaceship
npx create-next-app@latest . --ts --app --no-tailwind --eslint --src-dir=false --import-alias "@/*"
git init && git add -A && git commit -m "init"
```

Poi copia dentro il bundle di design:

```
RaffaeleWebSpaceship/
  design/                 ← copia qui TUTTO il contenuto di design_handoff_portfolio_hud
    README.md
    NEXT-STEPS.md
    Portfolio HUD.dc.html
    spaceship-blueprint.png
    bio.md
    images/projects/*.png
```

Le tre immagini progetto vanno poi spostate in `public/images/projects/` con questi nomi: `refresh-food.png`, `chef-hippo.png`, `owly-api.png`.

---

## 2. Primo prompt a Claude Code (setup + memoria di progetto)

Apri il terminale nella cartella e lancia `claude`. Incolla:

> Leggi `design/README.md` per intero: è la specifica di design del sito. Leggi anche `design/Portfolio HUD.dc.html` come riferimento visivo (è un prototipo scritto in un runtime di design: ignora `support.js`, i tag `<x-dc>` e la sintassi `{{ }}`, leggilo come markup + stili inline + logica di stato).
>
> Non scrivere ancora codice applicativo. Fai solo questo:
> 1. crea un `CLAUDE.md` alla radice che riassuma stack, token di design, struttura file e regole non negoziabili (CSS puro + custom properties, `border-radius: 0`, nessuna libreria UI, nessun Tailwind);
> 2. crea `styles/tokens.css` con i due temi (dark default, light su `[data-theme="light"]`) esattamente con i valori del README;
> 3. imposta i font in `app/layout.tsx` con `next/font/google`: Orbitron 400, Rajdhani 300/400/500, JetBrains Mono 400;
> 4. crea la struttura di cartelle vuota descritta nel README.
>
> Poi fermati e mostrami cosa hai creato.

Perché così: il `CLAUDE.md` diventa la memoria del progetto e nelle sessioni successive non devi rispiegare le regole.

---

## 3. Ordine di sviluppo (una sessione per blocco)

Non chiedere tutto insieme. Un blocco per volta, con verifica a video prima di passare al successivo.

**Blocco 1 — la shell.** Status bar, sidebar con le 7 voci, viewport vuota, colonna destra vuota, footer, sfondo (pianeta + anelli + meteore + velo). Stato `section` e toggle tema funzionanti.
> Prompt: «Implementa solo la shell HUD come client component `components/Hud/Hud.tsx` + `hud.module.css`, secondo il README, sezioni "Screens / Views" e "Design tokens". Le sezioni centrali restano segnaposto. Verifica il contrasto del testo della colonna destra sopra il pianeta in entrambi i temi.»

**Blocco 2 — Ship Navigator.** SVG a 7 parti, rotazione per sezione, highlight della parte attiva, griglia tecnica dietro.
> Prompt: «Implementa `ShipNavigator.tsx` seguendo la specifica SVG del README: viewBox 200×300, sette gruppi con i nomi indicati, stato attivo/inattivo e la tabella di rotazioni. La griglia va su un div separato, non sul contenitore.»

**Blocco 3 — le sezioni.** Home, About, Skills, Experience: contenuto statico letto da Markdown in `content/en/`.

**Blocco 4 — Projects + Dossier.** Lista, hover, modale, chiusura con Esc e blocco scroll.

**Blocco 5 — Contact.** Form con POST a Web3Forms, stati `idle/sending/sent/error` mostrati nella console mono, access key in `.env.local` (`NEXT_PUBLIC_WEB3FORMS_KEY`).

**Blocco 6 — mobile.** Layout verticale sotto 900px: **non** comprimere la HUD, vedi sezione "Responsive" del README.

**Blocco 7 — rifiniture.** `prefers-reduced-motion`, focus visibile ambra, `<button>`/`<a>` reali al posto dei div cliccabili, meta tag e Open Graph, `@vercel/analytics`.

Log, IT e ES: fase 2, dopo che il sito è online in inglese.

---

## 4. Come lavorare bene con Claude Code

- **Un obiettivo per prompt.** «Implementa la sezione Projects» funziona; «fai il sito» no.
- **Rimanda sempre al README** invece di riscrivere i valori a mano: «usa i colori del README», non «usa #F5B913».
- **Commit a ogni blocco chiuso.** `git commit -m "blocco 2: ship navigator"`. Se un blocco va storto, torni indietro in un secondo.
- **Verifica tu a video, non fidarti della descrizione.** `npm run dev` aperto in un'altra finestra, ricarica dopo ogni blocco.
- **Quando qualcosa non torna visivamente**, descrivi il sintomo, non la soluzione: «il testo della colonna destra è illeggibile in tema light» dà risultati migliori di «aumenta l'opacità del velo».
- **Non far riscrivere ciò che funziona.** Se chiedi una modifica piccola, dillo esplicitamente: «cambia solo X, lascia tutto il resto invariato».

---

## 5. Deploy

```bash
git remote add origin git@github.com:<utente>/raffaele-portfolio.git
git push -u origin main
```

Su Vercel: *Add New → Project → importa il repo → Deploy*. Aggiungi la variabile `NEXT_PUBLIC_WEB3FORMS_KEY` nelle Environment Variables. Ogni push genera una preview; `main` va in produzione.

**Dominio.** Su Vercel: *Settings → Domains → raffaelebini.com*. Vercel mostra i record da inserire — nel pannello Aruba, sezione DNS:
- `A` su `@` → `76.76.21.21`
- `CNAME` su `www` → `cname.vercel-dns.com`

Propagazione: da pochi minuti a 24 ore. Il certificato HTTPS lo emette Vercel da solo.

Nota sul piano: il free di Vercel è "hobby", non commerciale. Va bene per un portfolio personale. Se diventa vetrina di servizi a pagamento, valuta Cloudflare Pages (stesso flusso di deploy) o il piano Pro.

---

## 6. Checklist prima di dire "online"

- [ ] Le 7 sezioni cambiano senza ricaricare, la nave ruota e la parte giusta si illumina
- [ ] Tema light e dark leggibili ovunque, colonna destra compresa
- [ ] Form contatto: mail ricevuta davvero, stato di errore testato staccando la rete
- [ ] Mobile verificato su telefono vero, non solo nel simulatore
- [ ] Case study reali al posto dei segnaposto tra parentesi quadre
- [ ] Ritratto reale al posto del placeholder in About
- [ ] Title, description e immagine Open Graph impostati
- [ ] `spaceship-blueprint.png` **non** pubblicato in `public/` (è solo riferimento)
- [ ] Test con tastiera: si naviga tutto in Tab, il focus si vede
