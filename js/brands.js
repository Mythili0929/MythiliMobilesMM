/* ============================================================
   brands.html — renders every brand with live product count and
   a working link into the filtered catalog (mobiles.html?brand=id)
   ============================================================ */
document.addEventListener("DOMContentLoaded", ()=>{
  const grid = document.getElementById("brands-grid");
  if(!grid) return;
  grid.innerHTML = BRANDS.map(b=>{
    const count = PRODUCTS.filter(p=>p.brand===b.id).length;
    const initial = b.name.replace("Google ","").charAt(0);
    return `
    <a class="brand-card" href="mobiles.html?brand=${b.id}">
      <div class="brand-dot" style="background:${b.finish}">${initial}</div>
      <h3>${b.name}</h3>
      <p>${b.tagline}</p>
      <span class="count">${count} model${count!==1?"s":""}</span>
    </a>`;
  }).join("");
});
