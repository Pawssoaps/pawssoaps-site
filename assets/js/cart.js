const CART_KEY = "paws_cart_v1";

function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function cartCount(cart){
  return Object.values(cart).reduce((s,n)=>s+n,0);
}
function money(n){ return `$${(Math.round(n*100)/100).toFixed(2)}`; }

function findProduct(id){
  return (window.PAWS_PRODUCTS || []).find(p => p.id === id);
}

window.addToCart = function(id){
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  renderCartUI();
  toggleCart(true);
}

function setQty(id, qty){
  const cart = loadCart();
  const q = Math.max(0, parseInt(qty,10) || 0);
  if(q === 0) delete cart[id];
  else cart[id] = q;
  saveCart(cart);
  renderCartUI();
}

window.toggleCart = function(forceOpen){
  const drawer = document.getElementById("cartDrawer");
  if(!drawer) return;
  const isOpen = drawer.classList.contains("is-open");
  const next = (forceOpen === true) ? true : (forceOpen === false ? false : !isOpen);
  drawer.classList.toggle("is-open", next);
  drawer.setAttribute("aria-hidden", next ? "false" : "true");
}

window.renderCartUI = function(){
  const cart = loadCart();
  const countEl = document.getElementById("cartCount");
  if(countEl) countEl.textContent = cartCount(cart);

  const itemsEl = document.getElementById("cartItems");
  const subEl = document.getElementById("cartSubtotal");

  if(itemsEl){
    const lines = Object.entries(cart).map(([id, qty]) => {
      const p = findProduct(id);
      if(!p) return "";
      return `
        <div class="cart-item">
          <div>
            <strong>${p.name}</strong>
            <div class="micro">${money(p.price)} each</div>
          </div>
          <div class="qty">
            <button onclick="setQty('${id}', ${qty-1})">−</button>
            <strong>${qty}</strong>
            <button onclick="setQty('${id}', ${qty+1})">+</button>
          </div>
        </div>
      `;
    }).join("");

    itemsEl.innerHTML = lines || `<p class="micro">Your cart is empty.</p>`;
  }

  if(subEl){
    const subtotal = Object.entries(cart).reduce((sum,[id,qty])=>{
      const p = findProduct(id);
      return sum + (p ? p.price*qty : 0);
    }, 0);
    subEl.textContent = money(subtotal);
  }
}
