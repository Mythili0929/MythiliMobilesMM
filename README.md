# MythiliMobiles — E-Commerce Website

A complete, ready-to-run mobile shop e-commerce website built with plain HTML, CSS and JavaScript (no build step, no server required).

## What was fixed in this version
- **Brands module rebuilt from scratch.** `brands.html` lists all 15 brands with live product counts. Brand cards link to `mobiles.html?brand=<id>`, and the catalog reads the URL and filters correctly.
- **Uploaded product photos integrated.** The supplied phone-photo ZIP is now included under `assets/products/` and used throughout product cards, offers, pre-booking and product-detail pages.
- **Photo quality safeguard.** Two brand groups in the supplied ZIP (Honor and iQOO) did not contain matching handset photos, so those products retain the site's clean CSS fallback instead of displaying the wrong model.
- **Pre-booking photo bug fixed.** Upcoming phones now use their own product IDs/photos rather than the brand ID.
- **Catalog count corrected.** The homepage now shows 33+ current catalog models; 3 additional upcoming models are available for pre-booking.

## How to run it
No installation needed.
1. Unzip the folder.
2. Double-click `index.html` to open it in your browser — **or**, for the most reliable experience (especially so the pincode/cart/wishlist features behave exactly as in a real store), serve it locally:
   ```
   cd MythiliMobiles
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

## What's new in this update
- **Real product photos** — the supplied product images are used wherever a matching image was available.
- **Elegant redesigned logo** — refined mark with a gold-accent inner line, serif wordmark, used consistently in header and footer.
- **Premium homepage hero** — layered three-phone composition with soft glow and a floating rating badge.
- **Free delivery threshold corrected** to orders above ₹9,999 (topbar, cart, checkout).
- **Team section upgraded** to elegant illustrated professional avatars (blazer silhouette) — see note below on real photos.
- **Store details section added** to Contact page and footer with clearly labeled placeholders — swap in your real address, phone and email in `contact.html` and `js/main.js` (search for "Insert").

## Note on images
The supplied product-photo ZIP is included in `/assets/products/`. Images were cleaned to remove the embedded filename/title strip where it was present. The website uses a CSS-rendered fallback only when the supplied ZIP did not contain a matching photo.

## Note on scope
This is a complete front-end demo (the same approach used for your earlier MythiliMart and ShopSphere projects) using `localStorage` in place of a real backend/database, so it runs instantly with zero setup. The original brief also described a full Node.js/Express/MySQL backend with an admin panel — that is a much larger, separate build (server code, database schema, hosting) that would need to run on an actual server rather than open directly in a browser. Let me know if you'd like that backend built out next as a separate piece.

## Structure
```
/index.html, mobiles.html, brands.html, product.html, cart.html,
/wishlist.html, checkout.html, offers.html, prebooking.html,
/track-order.html, account.html, about.html, contact.html
/css/style.css
/js/data.js, main.js, products.js, product-detail.js, pages.js, brands.js
/assets/products/        — supplied product photos used by the catalog
/assets/brand/            — site branding and hero imagery
```
