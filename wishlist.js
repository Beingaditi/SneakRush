

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


function toggleWishlist(product) {
    let wishlist = getWishlist();
    const exists = wishlist.find(p => p.name === product.name);

    if (exists) {
        wishlist = wishlist.filter(p => p.name !== product.name);
    } else {
        wishlist.push(product);
    }

    saveWishlist(wishlist);
    updateWishBadge();
    return !exists; 
}

function isWishlisted(name) {
    return getWishlist().some(p => p.name === name);
}



function updateWishBadge() {
    let wishlist = getWishlist();
    let badge = document.getElementById("wishBadge");
    if (badge) {
        badge.innerText = wishlist.length > 0 ? wishlist.length : "";
    }
}



function renderWishlist() {
    let wishlist = getWishlist();
    let grid = document.getElementById("wishlistGrid");
    let empty = document.getElementById("wishEmpty");

    if (!grid) return;

    grid.innerHTML = "";

    if (wishlist.length === 0) {
        empty.style.display = "flex";
        grid.style.display = "none";
        return;
    }

    empty.style.display = "none";
    grid.style.display = "grid";

    wishlist.forEach(product => {
        let cleanPrice = parseFloat(String(product.price).replace(/[₹,]/g, ""));

        grid.innerHTML += `
        <div class="wish-card" id="wish-${product.name.replace(/\s+/g, '-')}">

            <button class="wish-heart" onclick="removeFromWishlist('${product.name}')" title="Remove from wishlist">
                ❤️
            </button>

            <img src="${product.image}" class="wish-img" alt="${product.name}">

            <h2>${product.name}</h2>

            <h3>₹${cleanPrice.toLocaleString('en-IN')}</h3>

            <button class="wish-add" onclick="moveToCart('${product.name}')">
                🛒 Add to Cart
            </button>

        </div>
        `;
    });

    updateWishBadge();
}


function removeFromWishlist(name) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(p => p.name !== name);
    saveWishlist(wishlist);
    renderWishlist();
    updateWishBadge();
}

function moveToCart(name) {
    let wishlist = getWishlist();
    let product = wishlist.find(p => p.name === name);
    if (!product) return;

    // Add to cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(p => p.name === name);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    
    removeFromWishlist(name);

   
    if (typeof updateCartBadge === "function") updateCartBadge();

   
    showToast(`${name} moved to cart!`);
}



function showToast(message) {
    let existing = document.getElementById("sneakToast");
    if (existing) existing.remove();

    let toast = document.createElement("div");
    toast.id = "sneakToast";
    toast.innerText = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #9b6cff;
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
        box-shadow: 0 0 20px rgba(155,108,255,0.6);
        z-index: 9999;
        animation: fadeInUp 0.3s ease;
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}



let searchBox = document.getElementById("wishlistSearch");
if (searchBox) {
    searchBox.addEventListener("input", function () {
        let value = searchBox.value.toLowerCase();
        document.querySelectorAll(".wish-card").forEach(card => {
            let name = card.querySelector("h2").innerText.toLowerCase();
            card.style.display = name.includes(value) ? "flex" : "none";
        });
    });
}



renderWishlist();
updateWishBadge();