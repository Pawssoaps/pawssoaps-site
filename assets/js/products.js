// Edit this list for your real soaps (first 8 to start)
window.PAWS_PRODUCTS = [
  { id:"lavender-oatmeal", name:"Lavender Oatmeal", price:8, desc:"Calm + cozy", image:"" },
  { id:"charcoal-tea-tree", name:"Charcoal Tea Tree", price:8, desc:"Fresh + clean", image:"" },
  { id:"vanilla-oak", name:"Vanilla Oak", price:8, desc:"Warm + sweet", image:"" },
  { id:"citrus-sunshine", name:"Citrus Sunshine", price:8, desc:"Bright + happy", image:"" },
];
function money(n){ return `$${(Math.round(n*100)/100).toFixed(2)}`; }

window.renderFeatured = function(){
  const grid = document.getElementById("featuredGrid");
  if(!grid) return;
  const items = window.PAWS_PRODUCTS.slice(0, 4);
  grid.innerHTML = items.map(p => `
    <div class="card">
      <div class="card__img">${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">` : "Product photo"}</div>
      <div class="card__body">
        <div class="card__title">${p.name}</div>
        <div class="micro">${p.desc || ""}</div>
        <div class="card__price">${money(p.price)}</div>
        <div class="card__actions">
          <button class="btn btn--primary" onclick="addToCart('${p.id}')">Add to cart</button>
          <a class="btn" href="shop.html">View</a>
        </div>
      </div>
    </div>
  `).join("");
}
