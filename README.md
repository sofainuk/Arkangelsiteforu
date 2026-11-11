# ARKangel Medical Visits London — animated website

Fast, bilingual (English + Arabic RTL) animated medical website built with **Next.js 15 (App Router) + TypeScript**.
No animation library: all motion is lightweight CSS (transform/opacity only), and looping animations pause when off screen.

- `/en` — English · `/ar` — Arabic (right-to-left). `/` redirects to `/en`.
- Photos of doctors, patients, nurses, hospitals and London (free Unsplash licence), served
  resized and in modern formats (WebP/AVIF) by the Unsplash image CDN — no Vercel image quota used.
- Rotating headline, floating cards, live pulse line, counters, auto-playing five-day programme
  explorer, animated flight route, orbiting network, marquee, image zoom on hover, animated FAQ
  and enquiry form, scroll progress bar.
- Respects "reduce motion" settings on the visitor's device.

## Deploy to Vercel (no coding needed)

**Option 1 — GitHub (recommended)**
1. Unzip this folder.
2. Create a new repository on GitHub and upload all the files inside the folder
   (drag and drop on github.com → "Add file" → "Upload files").
3. Go to vercel.com → "Add New…" → "Project" → import that repository → **Deploy**.
   Vercel detects Next.js automatically; no settings needed.

**Option 2 — Vercel CLI**
```bash
npm i -g vercel
cd arkangel-medical-website
vercel
```

## Run on your computer (optional)
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```
Requires Node.js 18.18 or newer.

## Edit content
- All English and Arabic text: `src/i18n/dictionaries.ts`
- Email, phone, WhatsApp, website URL: `src/lib/site.ts` (empty values show "To be confirmed")
- Colours and styling: `src/app/globals.css` (variables at the top)
- Photos: `src/lib/photos.ts` — replace any photo with your own image URL

## Receive enquiries by email
The form works straight away but runs in **demo mode** (it confirms to the visitor and shows a small
"demo mode" note) until you connect a form service:
1. Create a free form at https://formspree.io and copy its endpoint (e.g. `https://formspree.io/f/abcd1234`).
2. In Vercel → your project → Settings → Environment Variables, add
   `FORM_ENDPOINT` = that URL, then redeploy.
Any service that accepts a JSON POST (Make, Zapier, Google Apps Script) also works.

## Notes
Hospital names are shown only as potential hosts, with the "not confirmed partners" note, and the
Important Programme Information disclaimer appears in the FAQ and footer.
