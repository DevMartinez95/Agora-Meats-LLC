# Ágora Meats, LLC — Website

Static bilingual (English / Español) website. No build step, no dependencies — plain HTML, CSS and JavaScript, ready for GitHub Pages.

## Structure

```
index.html          Landing page (English)
privacy.html        Privacy Policy (English)
terms.html          Terms of Use (English)
es/index.html       Landing page (Español)
es/privacy.html     Política de Privacidad (Español)
es/terms.html       Términos de Uso (Español)
css/main.css        Landing page styles
css/legal.css       Privacy / Terms styles
js/main.js          Menu, product tabs, trade inquiry form
assets/logo-mark.png
.nojekyll           Tells GitHub Pages to serve files as-is
```

The English / Español switch in the header links between the root pages and the matching page in `/es/`.

## Preview on your computer

Double-click `index.html`, or for the most accurate preview run a local server from this folder:

```
python3 -m http.server 8000
```

then open http://localhost:8000

## Before going live

1. **Connect the Trade Inquiry form.** GitHub Pages can't receive form submissions on its own. Create a free form endpoint (for example at formspree.io), then paste its URL into `data-endpoint=""` on the `<form id="inquiry">` tag in **both** `index.html` and `es/index.html`:
   ```html
   <form id="inquiry" data-endpoint="https://formspree.io/f/XXXXXXX" method="post">
   ```
   While `data-endpoint` is empty the form runs in demo mode: it shows the confirmation message but sends nothing.
2. **Phone number.** Replace `+1 (305) XXX-XXXX` in `index.html`, `es/index.html` and the four legal pages.
3. **Legal review.** Have an attorney review the Privacy Policy and Terms of Use (both languages).

## Publish on GitHub Pages

1. Create a new repository on GitHub and upload the **contents** of this folder (so `index.html` is at the top level).
2. In the repository go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, and save.
3. To use a custom domain such as agorameats.com, add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

## Brand

- Agora Deep Sea `#1A3A4B` — headings, menu, dark sections
- Miami Trade Blue `#4B82A6` — primary buttons, links, interactive accents
- Compliance White `#FAFAFA` / `#FFFFFF` — backgrounds
- Precision Gold `#C59B27` — prestige accents and highlights
- Headings: Inter (Semi-Bold / Bold) · Body: Noto Sans (Regular) — loaded from Google Fonts
