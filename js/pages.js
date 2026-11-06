/* ============================================================
   Cart / Wishlist / Checkout / Home / Track Order logic
   ============================================================ */

/* ---------------- Cart page ---------------- */
function renderCartPage(){
  const root = document.getElementById("cart-root");
  if(!root) return;
  const items = Cart.items();
  if(items.length === 0){
    root.innerHTML = `<div class="empty-state"><h3>Your cart is empty</h3><p>Looks like you haven't added anything yet.</p><a class="btn btn-primary" href="mobiles.html" style="margin-top:14px;">Continue Shopping</a></div>`;
    return;
  }
  let subtotal = 0, mrpTotal = 0;
  const rows = items.map((it,idx)=>{
    const p = getProduct(it.id);
    if(!p) return "";
    subtotal += p.price * it.qty;
    mrpTotal += p.mrp * it.qty;
    return `
    <div class="cart-row" data-idx="${idx}">
      <div class="cart-thumb">${phoneMockHTML(p.id,'small')}</div>
      <div>
        <h3 class="card-title"><a href="product.html?id=${p.id}">${p.model}</a></h3>
        <p style="font-size:12.5px;color:var(--text-dim);margin:4px 0;">${it.color||p.colors[0]} · ${it.storage||p.storage[0]}GB</p>
        <div class="qty-selector">
          <button data-dec="${idx}">−</button><span>${it.qty}</span><button data-inc="${idx}">+</button>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="card-price">${formatINR(p.price*it.qty)}</div>
        <button class="btn btn-outline btn-sm" data-remove="${idx}" style="margin-top:8px;">Remove</button>
      </div>
    </div>`;
  }).join("");

  const discount = mrpTotal - subtotal;
  const delivery = subtotal >= 9999 ? 0 : 99;
  const couponDiscount = Store.get("mm_coupon_discount", 0);
  const grandTotal = subtotal + delivery - couponDiscount;

  root.innerHTML = `
  <div class="cart-layout" style="display:grid;grid-template-columns:1.6fr 1fr;gap:32px;align-items:start;">
    <div>${rows}</div>
    <div class="cart-summary">
      <h3 style="margin-top:0;">Order Summary</h3>
      <div class="summary-line"><span>Product Total</span><span>${formatINR(mrpTotal)}</span></div>
      <div class="summary-line"><span>Discount</span><span style="color:var(--success)">−${formatINR(discount)}</span></div>
      <div class="summary-line"><span>Delivery</span><span>${delivery===0?"FREE":formatINR(delivery)}</span></div>
      ${couponDiscount>0?`<div class="summary-line"><span>Coupon Discount</span><span style="color:var(--success)">−${formatINR(couponDiscount)}</span></div>`:""}
      <div class="coupon-row">
        <input type="text" id="coupon-input" placeholder="Enter coupon code">
        <button class="btn btn-outline btn-sm" id="apply-coupon">Apply</button>
      </div>
      <div class="summary-line total"><span>Grand Total</span><span>${formatINR(grandTotal)}</span></div>
      <a class="btn btn-primary btn-block" href="checkout.html" style="margin-top:16px;">Proceed to Checkout</a>
      <a class="btn btn-outline btn-block" href="mobiles.html" style="margin-top:10px;">Continue Shopping</a>
    </div>
  </div>`;

  root.querySelectorAll("[data-inc]").forEach(b=>b.addEventListener("click", ()=>{
    const idx=+b.dataset.inc, it=Cart.items()[idx], p=getProduct(it.id);
    if(it.qty < p.stock) Cart.setQty(idx, it.qty+1); else toast(`Only ${p.stock} units are currently available.`);
    renderCartPage();
  }));
  root.querySelectorAll("[data-dec]").forEach(b=>b.addEventListener("click", ()=>{
    const idx=+b.dataset.dec, it=Cart.items()[idx];
    if(it.qty>1) Cart.setQty(idx, it.qty-1); renderCartPage();
  }));
  root.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click", ()=>{ Cart.remove(+b.dataset.remove); renderCartPage(); }));
  document.getElementById("apply-coupon")?.addEventListener("click", ()=>{
    const code = document.getElementById("coupon-input").value.trim().toUpperCase();
    if(code === "MYTHILI10"){ Store.set("mm_coupon_discount", Math.round(subtotal*0.1)); toast("Coupon applied successfully."); }
    else { toast("Invalid or expired coupon code."); }
    renderCartPage();
  });
}

/* ---------------- Wishlist page ---------------- */
function renderWishlistPage(){
  const root = document.getElementById("wishlist-root");
  if(!root) return;
  const ids = Wishlist.items();
  if(ids.length === 0){
    root.innerHTML = `<div class="empty-state"><h3>Your wishlist is empty</h3><p>Save mobiles you love for later.</p><a class="btn btn-primary" href="mobiles.html" style="margin-top:14px;">Browse Mobiles</a></div>`;
    return;
  }
  const products = ids.map(getProduct).filter(Boolean);
  root.innerHTML = `<div class="product-grid">${products.map(productCardHTML).join("")}</div>`;
}

/* ---------------- Checkout page ---------------- */
function renderCheckoutPage(){
  const root = document.getElementById("checkout-root");
  if(!root) return;
  let step = 1;
  const items = Cart.items();
  if(items.length === 0){
    root.innerHTML = `<div class="empty-state"><h3>Your cart is empty</h3><p>Add a product before checking out.</p><a class="btn btn-primary" href="mobiles.html" style="margin-top:14px;">Browse Mobiles</a></div>`;
    return;
  }

  function total(){
    return items.reduce((s,it)=>{ const p=getProduct(it.id); return s + (p?p.price*it.qty:0); },0);
  }

  function draw(){
    root.innerHTML = `
    <div class="step-track">
      <div class="step ${step>=1?'done':''} ${step===1?'active':''}"><div class="dot">1</div><span>Address</span></div>
      <div class="step ${step>=2?'done':''} ${step===2?'active':''}"><div class="dot">2</div><span>Summary</span></div>
      <div class="step ${step>=3?'done':''} ${step===3?'active':''}"><div class="dot">3</div><span>Payment</span></div>
      <div class="step ${step>=4?'done':''} ${step===4?'active':''}"><div class="dot">4</div><span>Confirmed</span></div>
    </div>
    <div id="step-content"></div>`;
    const c = document.getElementById("step-content");

    if(step === 1){
      c.innerHTML = `
      <h2 class="section-title" style="font-size:22px;">Delivery Address</h2>
      <div class="form-grid" style="max-width:640px;margin-top:16px;">
        <div class="form-field"><label>Full Name</label><input id="f-name" required></div>
        <div class="form-field"><label>Phone Number</label><input id="f-phone" required></div>
        <div class="form-field full"><label>Address</label><input id="f-address" required></div>
        <div class="form-field"><label>City</label><input id="f-city" required></div>
        <div class="form-field"><label>PIN Code</label><input id="f-pin" required maxlength="6"></div>
      </div>
      <button class="btn btn-primary" id="to-step2">Continue to Summary</button>`;
      document.getElementById("to-step2").addEventListener("click", ()=>{
        const req = ["f-name","f-phone","f-address","f-city","f-pin"];
        for(const id of req){ if(!document.getElementById(id).value.trim()){ toast("Please fill in all address fields."); return; } }
        step = 2; draw();
      });
    }
    else if(step === 2){
      const rows = items.map(it=>{ const p=getProduct(it.id); return `<div class="summary-line"><span>${p.model} × ${it.qty}</span><span>${formatINR(p.price*it.qty)}</span></div>`; }).join("");
      c.innerHTML = `
      <h2 class="section-title" style="font-size:22px;">Order Summary</h2>
      <div style="max-width:480px;">${rows}
        <div class="summary-line"><span>Delivery</span><span>${total()>=9999?"FREE":formatINR(99)}</span></div>
        <div class="summary-line total"><span>Total</span><span>${formatINR(total() + (total()>=9999?0:99))}</span></div>
      </div>
      <div style="display:flex;gap:12px;margin-top:16px;">
        <button class="btn btn-outline" id="back1">Back</button>
        <button class="btn btn-primary" id="to-step3">Continue to Payment</button>
      </div>`;
      document.getElementById("back1").addEventListener("click", ()=>{ step=1; draw(); });
      document.getElementById("to-step3").addEventListener("click", ()=>{ step=3; draw(); });
    }
    else if(step === 3){
      c.innerHTML = `
      <h2 class="section-title" style="font-size:22px;">Payment Method</h2>
      <div style="max-width:420px;display:flex;flex-direction:column;gap:10px;margin:16px 0;">
        <label class="filter-option"><input type="radio" name="pay" value="upi" checked> UPI</label>
        <label class="filter-option"><input type="radio" name="pay" value="card"> Credit / Debit Card</label>
        <label class="filter-option"><input type="radio" name="pay" value="netbanking"> Net Banking</label>
        <label class="filter-option"><input type="radio" name="pay" value="cod"> Cash on Delivery</label>
      </div>
      <p style="font-size:12.5px;color:var(--text-dim);max-width:420px;">This is a demo checkout. No real payment is processed — a live store would connect to a licensed payment gateway here.</p>
      <div style="display:flex;gap:12px;margin-top:10px;">
        <button class="btn btn-outline" id="back2">Back</button>
        <button class="btn btn-primary" id="place-order">Place Order</button>
      </div>`;
      document.getElementById("back2").addEventListener("click", ()=>{ step=2; draw(); });
      document.getElementById("place-order").addEventListener("click", ()=>{
        const orderId = "MM" + Date.now().toString().slice(-8);
        const orders = Store.get("mm_orders", []);
        orders.push({ id: orderId, items, total: total(), date: new Date().toISOString(), status: "Order Placed" });
        Store.set("mm_orders", orders);
        Cart.clear(); Store.set("mm_coupon_discount", 0);
        step = 4; draw(orderId);
        document.getElementById("confirm-order-id").textContent = orderId;
      });
    }
    else if(step === 4){
      const orders = Store.get("mm_orders", []);
      const last = orders[orders.length-1];
      c.innerHTML = `
      <div class="empty-state">
        <h3>✅ Order Successfully Placed</h3>
        <p>Order ID: <b id="confirm-order-id">${last?.id||""}</b></p>
        <p>Estimated delivery: 3–5 business days</p>
        <a class="btn btn-primary" href="track-order.html" style="margin-top:14px;">Track Your Order</a>
      </div>`;
    }
  }
  draw();
}

/* ---------------- Track order ---------------- */
function renderTrackOrder(){
  const root = document.getElementById("track-root");
  if(!root) return;
  const statuses = ["Order Placed","Confirmed","Packed","Shipped","Out for Delivery","Delivered"];
  root.innerHTML = `
  <div class="pincode-box" style="max-width:420px;">
    <input type="text" id="order-id-input" placeholder="Enter your Order ID (e.g. MM12345678)">
    <button class="btn btn-primary btn-sm" id="track-btn">Track</button>
  </div>
  <div id="track-result" style="margin-top:30px;"></div>`;
  document.getElementById("track-btn").addEventListener("click", ()=>{
    const val = document.getElementById("order-id-input").value.trim();
    const orders = Store.get("mm_orders", []);
    const order = orders.find(o=>o.id === val);
    const result = document.getElementById("track-result");
    if(!order){ result.innerHTML = `<p style="color:var(--danger);">Order not found. Please check your Order ID and try again.</p>`; return; }
    const currentIdx = statuses.indexOf(order.status);
    result.innerHTML = `
    <h3>Order ${order.id}</h3>
    <div class="timeline">
      ${statuses.map((s,i)=>`<div class="tl-item ${i<=currentIdx?'done':''}"><div class="tl-dot"></div><span>${s}</span></div>`).join("")}
    </div>
    <p style="color:var(--text-dim);font-size:13.5px;">Total: ${formatINR(order.total)} · Placed on ${new Date(order.date).toLocaleDateString("en-IN")}</p>`;
  });
}

/* ---------------- Home page dynamic sections ---------------- */
function renderHome(){
  const featuredGrid = document.getElementById("featured-grid");
  if(featuredGrid){
    featuredGrid.innerHTML = PRODUCTS.filter(p=>p.featured).slice(0,4).map(productCardHTML).join("");
  }
  const newGrid = document.getElementById("new-arrivals-grid");
  if(newGrid){
    newGrid.innerHTML = PRODUCTS.filter(p=>p.isNew).slice(0,4).map(productCardHTML).join("");
  }
  const brandStrip = document.getElementById("brand-strip");
  if(brandStrip){
    brandStrip.innerHTML = BRANDS.map(b=>{
      const initial = b.name.replace("Google ","").charAt(0);
      return `<a class="brand-chip" href="mobiles.html?brand=${b.id}">
        <div class="brand-dot" style="background:${b.finish}">${initial}</div>
        <span>${b.name}</span>
      </a>`;
    }).join("");
  }
  const heroVisual = document.getElementById("hero-phone");
  if(heroVisual) heroVisual.innerHTML = `<img class="hero-showcase-img" src="assets/brand/hero-phones.jpg" alt="Latest smartphones available at MythiliMobiles">`;
}

/* ---------------- Offers page ---------------- */
function renderOffers(){
  const grid = document.getElementById("offers-grid");
  if(!grid) return;
  grid.innerHTML = OFFERS.map(o=>{
    const p = getProduct(o.productId);
    if(!p) return "";
    const disc = discountPct(p);
    return `
    <div class="offer-card">
      <span class="badge badge-gold tag">${o.type}</span>
      <div style="display:flex;gap:14px;align-items:center;margin:8px 0;">
        <div style="width:70px;">${phoneMockHTML(p.id,'small')}</div>
        <div>
          <h4 style="margin:0 0 4px;">${p.model}</h4>
          <div class="card-price-row"><span class="card-price">${formatINR(p.price)}</span><span class="card-mrp">${formatINR(p.mrp)}</span></div>
          <span class="card-save">${disc}% OFF ${o.note?(" · "+o.note):""}</span>
        </div>
      </div>
      <p style="font-size:12.5px;color:var(--text-dim);margin:0;">${o.validity}</p>
      <a class="btn btn-primary btn-sm" href="product.html?id=${p.id}" style="margin-top:10px;">View Deal</a>
    </div>`;
  }).join("");
}

/* ---------------- Pre-booking page ---------------- */
function renderPrebooking(){
  const grid = document.getElementById("prebooking-grid");
  if(!grid) return;
  grid.innerHTML = UPCOMING.map(u=>{
    const brand = getBrand(u.brand);
    return `
    <div class="product-card">
      <div class="card-media">
        <div class="card-badges"><span class="badge badge-new">Coming Soon</span></div>
        ${phoneMockHTML(u.id)}
      </div>
      <div class="card-body">
        <span class="card-brand">${brand.name}</span>
        <h3 class="card-title">${u.model}</h3>
        <p class="card-specs">Expected launch: ${u.launch}<br>${u.slotsLeft} pre-booking slots remaining</p>
        <div class="card-price-row"><span class="card-price">${formatINR(u.expectedPrice)}</span><span style="font-size:12px;color:var(--text-dim);">expected</span></div>
        <ul style="font-size:12px;color:var(--text-dim);margin:8px 0 0;padding-left:16px;">
          ${u.benefits.map(b=>`<li>${b}</li>`).join("")}
        </ul>
        <button class="btn btn-primary btn-block" style="margin-top:12px;" data-prebook="${u.id}">Pre-Book Now — ${formatINR(u.bookingAmount)}</button>
      </div>
    </div>`;
  }).join("");

  grid.querySelectorAll("[data-prebook]").forEach(btn=>{
    btn.addEventListener("click", ()=> openPrebookModal(btn.dataset.prebook));
  });
}

function openPrebookModal(upcomingId){
  const u = UPCOMING.find(x=>x.id===upcomingId);
  const modal = document.getElementById("prebook-modal");
  document.getElementById("prebook-product-name").textContent = u.model;
  document.getElementById("prebook-color").innerHTML = u.colors.map(c=>`<option>${c}</option>`).join("");
  modal.classList.add("open");
  modal.dataset.productId = upcomingId;
}

function initPrebookModal(){
  const modal = document.getElementById("prebook-modal");
  if(!modal) return;
  modal.querySelector(".close-modal").addEventListener("click", ()=> modal.classList.remove("open"));
  modal.querySelector("form").addEventListener("submit", e=>{
    e.preventDefault();
    const u = UPCOMING.find(x=>x.id===modal.dataset.productId);
    const id = "PB" + Date.now().toString().slice(-8);
    const bookings = Store.get("mm_prebookings", []);
    bookings.push({ id, product: u.model, date: new Date().toISOString() });
    Store.set("mm_prebookings", bookings);
    modal.classList.remove("open");
    toast(`Pre-booked successfully! Your ID: ${id}`);
    e.target.reset();
  });
}

/* ---------------- Contact form ---------------- */
function initContactForm(){
  const form = document.getElementById("contact-form");
  if(!form) return;
  form.addEventListener("submit", e=>{
    e.preventDefault();
    toast("Your message has been sent. We'll get back to you soon.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderCartPage();
  renderWishlistPage();
  renderCheckoutPage();
  renderTrackOrder();
  renderHome();
  renderOffers();
  renderPrebooking();
  initPrebookModal();
  initContactForm();
});
