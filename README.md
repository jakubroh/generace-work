# generace.work

One-page landing pro **generace.work** — sub-brand Než zazvoní pro firemní klienty (HR, management, employer branding).

## Stack
- Pure HTML + CSS + Vanilla JS (žádné build tooling, žádné dependencies)
- Google Fonts: Gabarito + Sanchez
- Formspree.io kontaktní formulář
- Static hosting přes Vercel

## Lokální vývoj
```bash
python3 -m http.server 8000
# nebo: npx serve
```

## Deploy
```bash
vercel --prod
```

## Struktura
- `index.html` — single-page markup
- `styles.css` — všechny styly (BEM)
- `app.js` — interakce (nav scroll, form submit, fade-in observer)
- `assets/` — logo, foto kontaktní osoby

## Brand
- Vychází z NZ brand manuálu (Gabarito + Sanchez, navy `#04193c`, červená `#f0324b`, oranžová `#ffa000`, světle modrá `#c9e8fb`)
- Sub-brand vůči Než zazvoni, s.r.o. (IČO 03741561)

## Form
Formspree endpoint `mnjlywbe` — odesílá na `info@nezzazvoni.cz`. Free tier 50 odeslání/měsíc.

## Domain
`generace.work` (custom doména přes Vercel)
