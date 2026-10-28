# Whitish Skincare — website

Open `index.html` in a modern browser. For hosting, upload the contents of this folder to your web host's public/root directory (e.g. GitHub Pages, Netlify, Vercel static hosting).

## Add your real product photos

Put your photos inside `images/` using these exact names (case-sensitive on many hosts). Use `.jpg`, `.png`, `.jpeg`, or `.webp` formats:

- `Hydra glow.jpg`
- `Glutathione.jpg`
- `Korean glass.jpg`
- `Avocado.jpg`
- `Apricot.jpg`
- `Fruity.jpg`
- `Orange.jpg`
- `Strawberry.jpg`
- `Kojic acid.jpg`
- `Kit.jpg` (Whitish Facial Kit — optional but recommended)

The site automatically tries different image extensions; if a file is absent, it displays a generic skincare lifestyle photo from Unsplash. Current hero, category and editorial background photos are placeholders sourced online and require internet access. Replace those URLs in `index.html` / `style.css` with owned/licensed banner photos before publishing.

## How it works

- Automatic hero slider (every 5.5 seconds), arrows and indicators.
- Right-to-left animated product-name strip.
- 3 category tiles; product-category filters, keyword search.
- Product-detail views with descriptions, ingredients/directions where supplied.
- Working cart with add/remove/change quantity; saved in browser `localStorage`.
- WhatsApp checkout sends an order summary to `+92 300 2737388`. **It does not charge a card or automatically place/record an order**. Final delivery/payment must be arranged by the merchant.
- Prices and strikethrough comparison values are in `script.js`. Listed current prices are Rs. 1 less than supplied prices; comparison/original prices are illustrative and should be replaced with genuine prior prices before publishing. Percentage-off labels are mathematically consistent with these illustrative comparison prices, but must not be described as actual discounts without substantiation.
- The Facebook link is a generic facebook.com link because no business page was given: update before launch.
- Other missing product descriptions, ingredient lists, exact kit contents, delivery policy, refund policy, and product photos should be completed before launch.

## Editing contact, products and prices

Edit `WA` and the `products` array in `script.js`. Instagram link is in `index.html`. This is a fully usable static customer-facing demo, **not** a production e-commerce backend; it does not have stock management, payment gateway, accounts, analytics or order database.
