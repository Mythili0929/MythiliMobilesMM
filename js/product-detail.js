/* ============================================================
   product.html — Product detail page
   ============================================================ */
function getParam(name){ return new URLSearchParams(window.location.search).get(name); }

let currentProduct, selectedColor, selectedStorage, qty = 1;

function renderProductDetail(){
  const id = getParam("id");
  currentProduct = getProduct(id);
  const root = document.getElementById("pd-root");
  if(!currentProduct){
    root.innerHTML = `<div class="empty-state"><h3>Product not found</h3><p>The item you're looking for may have been removed.</p><a class="btn btn-primary" href="mobiles.html" style="margin-top:14px;">Browse Mobiles</a></div>`;
    return;
  }
  const p = currentProduct;
  const brand = getBrand(p.brand);
  selectedColor = p.colors[0];
  selectedStorage = p.storage[0];
  const disc = discountPct(p);

  document.title = `${p.model} — MythiliMobiles`;
  document.getElementById("breadcrumb-brand").textContent = brand.name;
  document.getElementById("breadcrumb-brand").href = `mobiles.html?brand=${brand.id}`;
  document.getElementById("breadcrumb-name").textContent = p.model;

  root.innerHTML = `
  <div class="pd-layout">
    <div>
      <div class="pd-gallery-main" id="pd-main-visual">${phoneMockHTML(p.id, '', 'front')}</div>
      <div class="pd-thumbs">
        <div class="thumb active" data-thumb="photo" title="Uploaded product photo">${phoneMockHTML(p.id,'small','front')}</div>
      </div>
      <p style="font-size:11.5px;color:var(--text-dim);margin-top:8px;">Product photo supplied for this website. Where a matching photo was not available in the uploaded ZIP, the site keeps its studio-style fallback visual.</p>
    </div>
    <div>
      <span class="card-brand">${brand.name}</span>
      <h1 class="pd-title">${p.model}</h1>
      <div class="card-rating"><span class="stars">★ ${p.rating}</span><span>(${p.reviews} reviews)</span> · <span>SKU: MM-${p.id.toUpperCase()}</span></div>
      <p style="color:var(--text-dim);max-width:520px;">${p.short}</p>
      <div class="pd-price-block">
        <span class="pd-price">${formatINR(p.price)}</span>
        ${disc>0?`<span class="card-mrp">${formatINR(p.mrp)}</span><span class="badge badge-sale">${disc}% OFF</span>`:""}
      </div>
      ${disc>0?`<p class="card-save">You save ${formatINR(p.mrp-p.price)} · EMI available</p>`:""}
      ${p.stock<=5 && p.stock>0 ? `<p class="stock-note">Only ${p.stock} units left — order soon</p>`:""}
      ${p.stock===0 ? `<p class="stock-note" style="color:var(--danger)">Currently out of stock</p>`:""}

      <div class="option-row">
        <label>Color — <span id="color-label">${selectedColor}</span></label>
        <div class="option-pills" id="color-pills">
          ${p.colors.map(c=>`<button class="option-pill ${c===selectedColor?'selected':''}" data-color="${c}">${c}</button>`).join("")}
        </div>
      </div>
      <div class="option-row">
        <label>Storage</label>
        <div class="option-pills" id="storage-pills">
          ${p.storage.map(s=>`<button class="option-pill ${s===selectedStorage?'selected':''}" data-storage="${s}">${s} GB</button>`).join("")}
        </div>
      </div>
      <div class="option-row">
        <label>Quantity</label>
        <div class="qty-selector">
          <button id="qty-minus">−</button><span id="qty-val">1</span><button id="qty-plus">+</button>
        </div>
      </div>

      <div class="pd-actions">
        <button class="btn btn-primary" id="add-cart-btn" ${p.stock===0?'disabled':''}>Add to Cart</button>
        <button class="btn btn-gold" id="buy-now-btn" ${p.stock===0?'disabled':''}>Buy Now</button>
        <button class="btn btn-outline" id="wish-btn-pd">${Wishlist.has(p.id)?'♥ Wishlisted':'♡ Add to Wishlist'}</button>
      </div>

      <div class="option-row">
        <label>Check Delivery</label>
        <div class="pincode-box">
          <input type="text" id="pincode-input" placeholder="Enter PIN code" maxlength="6">
          <button class="btn btn-outline btn-sm" id="pincode-check">Check</button>
        </div>
        <p id="pincode-result" style="font-size:13px;margin-top:8px;color:var(--text-dim);"></p>
      </div>
    </div>
  </div>

  <div style="margin-top:56px;">
    <div class="tabs">
      <button class="tab-btn active" data-tab="overview">Overview</button>
      <button class="tab-btn" data-tab="specs">Specifications</button>
      <button class="tab-btn" data-tab="camera">Camera</button>
      <button class="tab-btn" data-tab="display">Display</button>
      <button class="tab-btn" data-tab="battery">Battery</button>
      <button class="tab-btn" data-tab="performance">Performance</button>
      <button class="tab-btn" data-tab="reviews">Reviews</button>
    </div>
    <div class="tab-panel active" data-panel="overview"><p>${p.short}. The ${p.model} comes with ${p.warranty.toLowerCase()} and is available with easy EMI options and doorstep delivery across India.</p></div>
    <div class="tab-panel" data-panel="specs">
      <table class="spec-table">
        <tr><td>Processor</td><td>${p.processor}</td></tr>
        <tr><td>Display</td><td>${p.display}</td></tr>
        <tr><td>RAM</td><td>${p.ram.join(" / ")} GB</td></tr>
        <tr><td>Storage</td><td>${p.storage.join(" / ")} GB</td></tr>
        <tr><td>Camera</td><td>${p.camera}</td></tr>
        <tr><td>Battery</td><td>${p.battery}</td></tr>
        <tr><td>OS</td><td>${p.os}</td></tr>
        <tr><td>Network</td><td>${p.fiveG?"5G / 4G":"4G"}</td></tr>
        <tr><td>Warranty</td><td>${p.warranty}</td></tr>
      </table>
    </div>
    <div class="tab-panel" data-panel="camera"><p>${p.camera}. Optimised for low-light performance, portrait depth mapping and stabilised video capture.</p></div>
    <div class="tab-panel" data-panel="display"><p>${p.display}${p.amoled?", AMOLED panel with deep blacks and vivid colour accuracy.":"."}</p></div>
    <div class="tab-panel" data-panel="battery"><p>${p.battery}${p.fastCharging?" with fast charging support for quick top-ups.":"."}</p></div>
    <div class="tab-panel" data-panel="performance"><p>Powered by the ${p.processor}, paired with up to ${p.ram[p.ram.length-1]}GB RAM for smooth multitasking and gaming.</p></div>
    <div class="tab-panel" data-panel="reviews"><p>★ ${p.rating} average from ${p.reviews} verified customers. Full review submission is available after a verified purchase.</p></div>
  </div>`;

  wireDetailEvents();
}

function wireDetailEvents(){
  document.querySelectorAll("[data-thumb]").forEach(thumb=>{
    thumb.addEventListener("click", ()=>{
      document.querySelectorAll("[data-thumb]").forEach(t=>t.classList.toggle("active", t===thumb));
      document.getElementById("pd-main-visual").innerHTML = phoneMockHTML(currentProduct.id, '', thumb.dataset.thumb);
    });
  });
  document.querySelectorAll("[data-color]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      selectedColor = btn.dataset.color;
      document.getElementById("color-label").textContent = selectedColor;
      document.querySelectorAll("[data-color]").forEach(b=>b.classList.toggle("selected", b===btn));
    });
  });
  document.querySelectorAll("[data-storage]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      selectedStorage = +btn.dataset.storage;
      document.querySelectorAll("[data-storage]").forEach(b=>b.classList.toggle("selected", b===btn));
    });
  });
  document.getElementById("qty-plus").addEventListener("click", ()=>{
    if(qty < currentProduct.stock){ qty++; document.getElementById("qty-val").textContent = qty; }
  });
  document.getElementById("qty-minus").addEventListener("click", ()=>{
    if(qty > 1){ qty--; document.getElementById("qty-val").textContent = qty; }
  });
  document.getElementById("add-cart-btn").addEventListener("click", ()=>{
    Cart.add(currentProduct.id, { color:selectedColor, storage:selectedStorage, qty });
    toast("Added to cart successfully.");
  });
  document.getElementById("buy-now-btn").addEventListener("click", ()=>{
    Cart.add(currentProduct.id, { color:selectedColor, storage:selectedStorage, qty });
    window.location.href = "checkout.html";
  });
  document.getElementById("wish-btn-pd").addEventListener("click", (e)=>{
    const active = Wishlist.toggle(currentProduct.id);
    e.target.textContent = active ? "♥ Wishlisted" : "♡ Add to Wishlist";
    toast(active ? "Added to your wishlist." : "Removed from wishlist.");
  });
  document.getElementById("pincode-check").addEventListener("click", ()=>{
    const val = document.getElementById("pincode-input").value.trim();
    const result = document.getElementById("pincode-result");
    if(!/^\d{6}$/.test(val)){ result.style.color = "var(--danger)"; result.textContent = "Please enter a valid 6-digit PIN code."; return; }
    result.style.color = "var(--success)";
    result.textContent = `Delivery available to ${val}. Estimated delivery in 2–4 business days.`;
  });
  document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b===btn));
      document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active", p.dataset.panel===btn.dataset.tab));
    });
  });
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
