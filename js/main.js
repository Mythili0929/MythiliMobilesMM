/* ============================================================
   MythiliMobiles — Core App Logic
   ============================================================ */

/* ---------------- Storage helpers ---------------- */
const Store = {
  get(key, fallback){ try{ const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }catch(e){ return fallback; } },
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
};

const Cart = {
  key: "mm_cart",
  items(){ return Store.get(this.key, []); },
  save(items){ Store.set(this.key, items); updateHeaderCounts(); },
  add(productId, opts={}){
    const items = this.items();
    const existing = items.find(i => i.id === productId && i.color === opts.color && i.storage === opts.storage);
    if(existing){ existing.qty += (opts.qty || 1); }
    else { items.push({ id: productId, color: opts.color, storage: opts.storage, qty: opts.qty || 1 }); }
    this.save(items);
  },
  remove(index){ const items = this.items(); items.splice(index,1); this.save(items); },
  setQty(index, qty){ const items = this.items(); if(qty<1) return; items[index].qty = qty; this.save(items); },
  count(){ return this.items().reduce((s,i)=>s+i.qty,0); },
  clear(){ this.save([]); }
};

const Wishlist = {
  key: "mm_wishlist",
  items(){ return Store.get(this.key, []); },
  save(items){ Store.set(this.key, items); updateHeaderCounts(); },
  has(id){ return this.items().includes(id); },
  toggle(id){
    let items = this.items();
    if(items.includes(id)) items = items.filter(x=>x!==id);
    else items.push(id);
    this.save(items);
    return items.includes(id);
  }
};

/* ---------------- Toast ---------------- */
function toast(msg){
  let box = document.getElementById("toast-container");
  if(!box){ box = document.createElement("div"); box.id="toast-container"; document.body.appendChild(box); }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(()=> el.remove(), 2600);
}

/* ---------------- Header counts ---------------- */
function updateHeaderCounts(){
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = Cart.count());
  document.querySelectorAll(".wishlist-count").forEach(el => el.textContent = Wishlist.items().length);
}

/* ---------------- Uploaded product photography ----------------
   Product photos supplied with this project. The two missing brands
   (Honor and iQOO) intentionally keep the CSS fallback visual rather
   than showing a photo of the wrong handset. */
const PRODUCT_PHOTO_IDS = new Set(["apl-iphone-14", "apl-iphone-15", "apl-iphone-15-pro", "apl-iphone-16", "moto-edge-50-pro", "moto-g85", "nokia-c32", "nokia-g42", "nothing-2", "nothing-2a", "op-12", "op-12r", "op-13", "op-nord-4", "oppo-find-x7", "oppo-reno-12", "pixel-8", "pixel-8-pro", "poco-m6-pro", "poco-x6-pro", "rlm-12-pro", "rlm-gt6", "rmi-13c", "rmi-note-13-pro", "sam-m35", "sam-s24", "sam-s24-ultra", "sam-s25-ultra", "vivo-v30", "vivo-x100", "xia-13-5g", "xia-14"]);

function uploadedProductPhotoHTML(productId, size=""){
  const p = typeof getProduct === "function" ? getProduct(productId) : null;
  const upcoming = typeof UPCOMING !== "undefined" ? UPCOMING.find(x => x.id === productId) : null;
  const name = p?.model || upcoming?.model || "MythiliMobiles smartphone";
  const sizeClass = size ? ` ${size}` : "";
  return `<div class="uploaded-product-photo${sizeClass}">
    <img src="assets/products/${productId}.jpg" alt="${name} product photo" loading="lazy">
  </div>`;
}

/* ---------------- Product visual renderer ----------------
   Uses supplied product photography when available. Products without
   a matching uploaded photo use the site's CSS-rendered fallback.
   `view` is retained for the fallback visual and compatibility. */
function phoneMockHTML(productId, size="", view="front"){
  if(PRODUCT_PHOTO_IDS.has(productId)) return uploadedProductPhotoHTML(productId, size);
  const p = getProduct(productId);
  const brand = p ? getBrand(p.brand) : (getBrand(productId) || BRANDS[0]);
  const finish = brand ? brand.finish : "linear-gradient(145deg,#888,#333)";
  const camCount = p && /triple|3 /i.test(p.camera||"") ? 3 : (p && /dual|2 /i.test(p.camera||"") ? 2 : (p && /quad|4 /i.test(p.camera||"") ? 4 : 3));

  if(view === "back"){
    return `
    <div class="phone-mock ${size} view-back">
      <div class="phone-body back-panel" style="background:${finish}">
        <div class="back-sheen"></div>
        <div class="cam-module">
          <div class="cam-module-plate">
            ${Array.from({length:camCount}).map(()=>`<div class="cam-lens big"><span class="cam-lens-inner"></span></div>`).join("")}
            <div class="cam-flash"></div>
          </div>
        </div>
        <div class="back-wordmark">${brand.name}</div>
        <div class="side-btn"></div>
        <div class="side-btn two"></div>
      </div>
    </div>`;
  }

  if(view === "side"){
    return `
    <div class="phone-mock ${size} view-side">
      <div class="phone-body side-panel" style="background:${finish}">
        <div class="side-edge-sheen"></div>
        <div class="side-btn"></div>
        <div class="side-btn two"></div>
      </div>
    </div>`;
  }

  return `
  <div class="phone-mock ${size} view-front">
    <div class="phone-body" style="background:${finish}">
      <div class="phone-screen">
        <div class="notch"></div>
        <div class="screen-glow" style="background:radial-gradient(circle at 30% 20%, ${brand.color}70, transparent 60%)"></div>
        <div class="status-row"><span>9:41</span><span>●●●</span></div>
        <div class="app-grid">
          ${Array.from({length:8}).map(()=>`<div class="app-icon"></div>`).join("")}
        </div>
        <div class="brand-wordmark">${brand.name}</div>
        <div class="screen-sheen"></div>
      </div>
      <div class="cam-bump"><div class="cam-lens"></div><div class="cam-lens"></div><div class="cam-lens"></div></div>
      <div class="side-btn"></div>
      <div class="side-btn two"></div>
    </div>
  </div>`;
}

/* ---------------- Product card renderer ---------------- */
function productCardHTML(p){
  const brand = getBrand(p.brand);
  const disc = discountPct(p);
  const wished = Wishlist.has(p.id);
  let stockNote = "";
  if(p.stock === 0) stockNote = `<span class="badge badge-out">Out of Stock</span>`;
  else if(p.stock <= 5) stockNote = `<div class="stock-note">Only ${p.stock} left</div>`;
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="card-media">
      <div class="card-badges">
        ${p.isNew ? `<span class="badge badge-new">New</span>` : ""}
        ${disc > 0 ? `<span class="badge badge-sale">${disc}% OFF</span>` : ""}
      </div>
      <button class="wish-btn ${wished?'active':''}" data-wish="${p.id}" aria-label="Toggle wishlist">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#22242b" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>
      </button>
      <a href="product.html?id=${p.id}">${phoneMockHTML(p.id)}</a>
    </div>
    <div class="card-body">
      <span class="card-brand">${brand.name}</span>
      <h3 class="card-title"><a href="product.html?id=${p.id}">${p.model}</a></h3>
      <p class="card-specs">${p.ram[0]}GB RAM · ${p.storage[0]}GB · ${p.camera.split("+")[0].trim()}</p>
      <div class="card-rating"><span class="stars">★${p.rating}</span><span>(${p.reviews})</span></div>
      <div class="card-price-row">
        <span class="card-price">${formatINR(p.price)}</span>
        ${disc>0 ? `<span class="card-mrp">${formatINR(p.mrp)}</span>` : ""}
      </div>
      ${disc>0 ? `<span class="card-save">Save ${formatINR(p.mrp-p.price)}</span>` : ""}
      ${stockNote}
      <div class="card-actions">
        <button class="btn btn-outline btn-sm" data-add="${p.id}" ${p.stock===0?"disabled":""}>Add to Cart</button>
        <a class="btn btn-primary btn-sm" href="product.html?id=${p.id}">View</a>
      </div>
    </div>
  </div>`;
}

/* Delegate add-to-cart & wishlist clicks anywhere product cards are rendered */
document.addEventListener("click", (e)=>{
  const addBtn = e.target.closest("[data-add]");
  if(addBtn){
    Cart.add(addBtn.dataset.add, { qty:1 });
    toast("Added to cart successfully.");
  }
  const wishBtn = e.target.closest("[data-wish]");
  if(wishBtn){
    const active = Wishlist.toggle(wishBtn.dataset.wish);
    wishBtn.classList.toggle("active", active);
    toast(active ? "Added to your wishlist." : "Removed from wishlist.");
  }
});

/* ---------------- Header / mobile menu ---------------- */
function initHeader(){
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  if(hamburger && menu){
    hamburger.addEventListener("click", ()=> menu.classList.add("open"));
    menu.querySelector(".close-btn")?.addEventListener("click", ()=> menu.classList.remove("open"));
  }
  updateHeaderCounts();

  // desktop + mobile search -> go to catalog with query
  document.querySelectorAll("[data-search-form]").forEach(form=>{
    form.addEventListener("submit", e=>{
      e.preventDefault();
      const q = form.querySelector("input").value.trim();
      window.location.href = `mobiles.html${q?`?q=${encodeURIComponent(q)}`:""}`;
    });
  });

  // highlight active nav link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
}

/* ---------------- Shared header/footer injection ----------------
   Rendered once from JS so every page (including Brands) shares
   identical, correctly-linked navigation. This is what fixes the
   Brands module: brands.html now exists, is linked everywhere,
   and brand cards link to mobiles.html?brand=<id> which the
   catalog page reads and filters on load. */
function renderChrome(){
  const header = document.getElementById("site-header");
  if(header){
    header.innerHTML = `
    <div class="topbar">
      <div class="container">
        <span>Free delivery across India on orders above ₹9,999</span>
        <span><a href="track-order.html">Track your order</a></span>
      </div>
    </div>
    <div class="nav-row container">
      <a href="index.html" class="logo">
        <span class="logo-mark">
          <img src="assets/brand/logo-icon.png" alt="MythiliMobiles logo">
        </span>
        <span class="logo-text">
          <span><span class="word1">Mythili</span><span class="word2">Mobiles</span></span>
          <small>Smart Choices. Smarter Technology.</small>
        </span>
      </a>
      <nav class="nav-links">
        <a href="index.html">Home</a>
        <a href="mobiles.html">Mobiles</a>
        <a href="brands.html">Brands</a>
        <a href="offers.html">Offers</a>
        <a href="prebooking.html">Pre-Booking</a>
        <a href="about.html">About Us</a>
        <a href="contact.html">Contact</a>
      </nav>
      <form class="nav-search" data-search-form>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b6d76" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search mobiles, brands...">
      </form>
      <div class="nav-icons">
        <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#22242b" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>
          <span class="icon-count wishlist-count">0</span>
        </a>
        <a class="icon-btn" href="cart.html" aria-label="Cart">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#22242b" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <span class="icon-count cart-count">0</span>
        </a>
        <a class="icon-btn" href="account.html" aria-label="Account">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#22242b" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
        </a>
        <button class="icon-btn hamburger" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22242b" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="mobile-menu">
      <button class="btn btn-outline close-btn" style="border-color:#fff;color:#fff;">Close ✕</button>
      <a href="index.html">Home</a>
      <a href="mobiles.html">Mobiles</a>
      <a href="brands.html">Brands</a>
      <a href="offers.html">Offers</a>
      <a href="prebooking.html">Pre-Booking</a>
      <a href="about.html">About Us</a>
      <a href="contact.html">Contact</a>
      <a href="cart.html">Cart</a>
      <a href="wishlist.html">Wishlist</a>
    </div>`;
  }

  const footer = document.getElementById("site-footer");
  if(footer){
    footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <span class="logo-mark" style="width:34px;height:34px;"><img src="assets/brand/logo-icon.png" alt="MythiliMobiles logo"></span>
            <h4 style="font-family:var(--font-display);font-size:19px;margin:0;">Mythili<span style="color:var(--gold)">Mobiles</span></h4>
          </div>
          <p style="font-size:13px;line-height:1.6;max-width:280px;">Smart Choices. Smarter Technology.<br>Your trusted destination for the latest smartphones, honest pricing and reliable service.</p>
          <div class="social-row">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>
        <div class="footer-col"><h4>Quick Links</h4><ul>
          <li><a href="index.html">Home</a></li><li><a href="mobiles.html">Mobiles</a></li>
          <li><a href="brands.html">Brands</a></li><li><a href="offers.html">Offers</a></li>
          <li><a href="prebooking.html">Pre-Booking</a></li><li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li></ul></div>
        <div class="footer-col"><h4>Customer Service</h4><ul>
          <li><a href="contact.html">Help Center</a></li><li><a href="#">Shipping</a></li>
          <li><a href="#">Returns</a></li><li><a href="#">Warranty</a></li>
          <li><a href="track-order.html">Order Tracking</a></li><li><a href="#">FAQs</a></li></ul></div>
        <div class="footer-col"><h4>Account</h4><ul>
          <li><a href="account.html">My Account</a></li><li><a href="account.html">Orders</a></li>
          <li><a href="wishlist.html">Wishlist</a></li><li><a href="prebooking.html">Pre-Bookings</a></li></ul></div>
        <div class="footer-col"><h4>Visit Us</h4><ul style="color:#8a8b93;">
          <li>MythiliMobiles – Smart Mobile Store, Kurnool, Andhra Pradesh, India – 518001</li>
          <li><a href="tel:+918309682060" style="color:#8a8b93;">+91 83096 82060</a></li>
          <li><a href="mailto:support@mythilimobiles.com" style="color:#8a8b93;">support@mythilimobiles.com</a></li>
          <li>Mon–Sat, 10AM–8PM · Sun, 10AM–6PM</li></ul></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 MythiliMobiles. All rights reserved. Demo project for academic/portfolio purposes.</span>
        <span><a href="#">Privacy Policy</a> · <a href="#">Terms & Conditions</a></span>
      </div>
    </div>`;
  }
}

document.addEventListener("DOMContentLoaded", ()=>{ renderChrome(); initHeader(); });
