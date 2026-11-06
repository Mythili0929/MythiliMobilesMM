/* ============================================================
   mobiles.html — Catalog logic
   Reads ?brand=, ?q=, ?featured=, ?offer= from URL so links from
   Brands, Home, Search and Offers all filter correctly.
   ============================================================ */

const state = {
  brand: null,
  q: "",
  price: null,
  ram: new Set(),
  storage: new Set(),
  features: new Set(),
  sort: "popular",
};

function readURLParams(){
  const params = new URLSearchParams(window.location.search);
  if(params.get("brand")) state.brand = params.get("brand");
  if(params.get("q")) state.q = params.get("q");
  if(params.get("featured")) state.featuredOnly = true;
  if(params.get("new")) state.newOnly = true;
}

function matchesFilters(p){
  if(state.brand && p.brand !== state.brand) return false;
  if(state.q){
    const hay = `${p.model} ${getBrand(p.brand).name} ${p.short}`.toLowerCase();
    if(!hay.includes(state.q.toLowerCase())) return false;
  }
  if(state.featuredOnly && !p.featured) return false;
  if(state.newOnly && !p.isNew) return false;
  if(state.price){
    const [min,max] = state.price;
    if(!(p.price >= min && p.price <= max)) return false;
  }
  if(state.ram.size && !p.ram.some(r => state.ram.has(r))) return false;
  if(state.storage.size && !p.storage.some(s => state.storage.has(s))) return false;
  if(state.features.size){
    for(const f of state.features){
      if(f==="5G" && !p.fiveG) return false;
      if(f==="Fast Charging" && !p.fastCharging) return false;
      if(f==="AMOLED" && !p.amoled) return false;
      if(f==="High Refresh Rate" && !p.highRefresh) return false;
      if(f==="Dual SIM" && !p.dualSim) return false;
      if(f==="NFC" && !p.nfc) return false;
    }
  }
  return true;
}

function sortProducts(list){
  const arr = [...list];
  switch(state.sort){
    case "price-low": arr.sort((a,b)=>a.price-b.price); break;
    case "price-high": arr.sort((a,b)=>b.price-a.price); break;
    case "newest": arr.sort((a,b)=> (b.isNew?1:0) - (a.isNew?1:0)); break;
    case "rated": arr.sort((a,b)=>b.rating-a.rating); break;
    case "discount": arr.sort((a,b)=>discountPct(b)-discountPct(a)); break;
    default: arr.sort((a,b)=>(b.reviews)-(a.reviews));
  }
  return arr;
}

function renderChips(){
  const row = document.getElementById("chip-row");
  if(!row) return;
  const chips = [];
  if(state.brand) chips.push({label:`Brand: ${getBrand(state.brand).name}`, clear:()=>{state.brand=null;}});
  if(state.q) chips.push({label:`"${state.q}"`, clear:()=>{state.q="";}});
  if(state.featuredOnly) chips.push({label:"Featured", clear:()=>{state.featuredOnly=false;}});
  if(state.newOnly) chips.push({label:"New Arrivals", clear:()=>{state.newOnly=false;}});
  state.ram.forEach(r => chips.push({label:`${r}GB RAM`, clear:()=>state.ram.delete(r)}));
  state.storage.forEach(s => chips.push({label:`${s}GB`, clear:()=>state.storage.delete(s)}));
  state.features.forEach(f => chips.push({label:f, clear:()=>state.features.delete(f)}));
  if(state.price) chips.push({label:"Price Range", clear:()=>state.price=null});

  row.innerHTML = chips.map((c,i)=>`<div class="chip">${c.label}<button data-chip="${i}">✕</button></div>`).join("");
  row.querySelectorAll("[data-chip]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ chips[+btn.dataset.chip].clear(); syncFilterUI(); renderCatalog(); });
  });
}

function syncFilterUI(){
  document.querySelectorAll("[data-ram]").forEach(cb => cb.checked = state.ram.has(+cb.dataset.ram));
  document.querySelectorAll("[data-storage]").forEach(cb => cb.checked = state.storage.has(+cb.dataset.storage));
  document.querySelectorAll("[data-feature]").forEach(cb => cb.checked = state.features.has(cb.dataset.feature));
  document.querySelectorAll("[data-price]").forEach(cb => cb.checked = false);
}

function renderCatalog(){
  const grid = document.getElementById("product-grid");
  const results = sortProducts(PRODUCTS.filter(matchesFilters));
  document.getElementById("results-count").textContent = `${results.length} mobile${results.length!==1?"s":""} found`;
  document.getElementById("catalog-heading").textContent = state.brand ? `${getBrand(state.brand).name} Mobiles` : "All Mobiles";
  renderChips();
  if(results.length === 0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <h3>No mobiles match your filters</h3>
      <p>Try adjusting your filters or search terms.</p>
      <button class="btn btn-primary" id="reset-filters" style="margin-top:14px;">Reset Filters</button>
    </div>`;
    document.getElementById("reset-filters").addEventListener("click", resetFilters);
    return;
  }
  grid.innerHTML = results.map(productCardHTML).join("");
}

function resetFilters(){
  state.brand=null; state.q=""; state.price=null; state.ram.clear(); state.storage.clear(); state.features.clear();
  state.featuredOnly=false; state.newOnly=false;
  history.replaceState(null,"","mobiles.html");
  syncFilterUI();
  renderCatalog();
}

function initFilterEvents(){
  document.querySelectorAll("[data-ram]").forEach(cb=>{
    cb.addEventListener("change", ()=>{ cb.checked ? state.ram.add(+cb.dataset.ram) : state.ram.delete(+cb.dataset.ram); renderCatalog(); });
  });
  document.querySelectorAll("[data-storage]").forEach(cb=>{
    cb.addEventListener("change", ()=>{ cb.checked ? state.storage.add(+cb.dataset.storage) : state.storage.delete(+cb.dataset.storage); renderCatalog(); });
  });
  document.querySelectorAll("[data-feature]").forEach(cb=>{
    cb.addEventListener("change", ()=>{ cb.checked ? state.features.add(cb.dataset.feature) : state.features.delete(cb.dataset.feature); renderCatalog(); });
  });
  document.querySelectorAll("[data-price]").forEach(cb=>{
    cb.addEventListener("change", ()=>{
      document.querySelectorAll("[data-price]").forEach(o=>{ if(o!==cb) o.checked=false; });
      state.price = cb.checked ? JSON.parse(cb.dataset.price) : null;
      renderCatalog();
    });
  });
  document.getElementById("sort-select")?.addEventListener("change", e=>{ state.sort = e.target.value; renderCatalog(); });
  document.getElementById("catalog-search")?.addEventListener("input", e=>{ state.q = e.target.value; renderCatalog(); });
}

document.addEventListener("DOMContentLoaded", ()=>{
  readURLParams();
  const searchInput = document.getElementById("catalog-search");
  if(searchInput) searchInput.value = state.q;
  initFilterEvents();
  syncFilterUI();
  renderCatalog();
});
