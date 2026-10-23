# ShopSmart — Mini E-commerce Hackathon Project

A React + Vite frontend prototype with a product catalog, search, category filters, shopping cart, quantity controls, coupon discounts, checkout form, and order confirmation.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Demo coupons
- `SAVE10` — 10% off
- `SHOP15` — 15% off

## Team module ownership suggestion
- Product catalog: `src/data/products.js`, `src/components/ProductCard.jsx`
- Cart: `src/components/CartPanel.jsx` and cart state/functions in `src/App.jsx`
- Coupon + checkout: `src/components/Checkout.jsx`
- Integration + global styling: `src/App.jsx`, `src/App.css`, `src/index.css`

Agree on product/cart data structures before splitting work. Create a feature branch for each module and use pull requests to merge.

## Current limitations
This is a frontend-only demo. Orders are not saved to a database, user authentication is not implemented, and no real payment is collected. Do not enter sensitive personal or payment information.
# mini-amazon
# shas
