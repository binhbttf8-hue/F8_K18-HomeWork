const $ = document.querySelector.bind(document);

// ── Task 1: Save and read username (localStorage) ──────────────────────────

const inputName = $('#input-name');
const saveBtn = $('#save-btn');
const readBtn = $('#read-btn');
const readName = $('#read-name');

// Get name from localStorage, default to 'Guest' if not saved yet
const getName = () => localStorage.getItem('username') || 'Guest';

// Display name on screen
const renderName = (name) => {
    readName.textContent = `👤 Saved name: ${name}`;
};

// Show name on page load (if previously saved)
renderName(getName());

// Prevent leading whitespace in input
inputName.addEventListener('input', () => {
    if (inputName.value.startsWith(' ')) {
        inputName.value = inputName.value.trimStart();
    }
});

// Handle Save button → store in localStorage
saveBtn.addEventListener('click', () => {
    const value = inputName.value.trim();
    if (!value) return;

    localStorage.setItem('username', value);
    inputName.value = '';
    renderName(value);
});

// Handle Read button → read from localStorage and display
readBtn.addEventListener('click', () => {
    renderName(getName());
});

// ── Task 2: Count page visits (localStorage + sessionStorage) ───────────────

const heading = $('#heading');
const resetBtn = $('#reset-btn');

// Display visit count
const renderCount = (count) => {
    heading.textContent = `You have visited this page ${count} times.`;
};

// Use sessionStorage to distinguish "page reload" from "new tab"
// If not marked in session → this is a new tab (reset counter)
const hasOpenedInSession = sessionStorage.getItem('page-opened');
let currentCount = Number(localStorage.getItem('count')) || 0;

if (!hasOpenedInSession) {
    // New tab → mark session and start count at 1
    currentCount = 1;
    sessionStorage.setItem('page-opened', 'true');
} else {
    // Page reload → increment by 1
    currentCount++;
}

localStorage.setItem('count', currentCount);
renderCount(currentCount);

// Reset count to 0
resetBtn.addEventListener('click', () => {
    localStorage.setItem('count', 0);
    renderCount(0);
});

// ── Task 3: Temporary shopping cart (sessionStorage) ───────────────────────

const productListEl = $('#product-list');
const productCartEl = $('#product-cart');
const cartListBtn = $('#cart-list');
const cartCountEl = $('#cart-count');
const deleteCartBtn = $('#delete-cart');

// Product list (custom — tech devices)
const products = [
    { id: 1, name: 'MacBook Air M2', price: 28_000_000, image: 'https://picsum.photos/seed/mac/300/100' },
    { id: 2, name: 'iPhone 15 Pro', price: 25_000_000, image: 'https://picsum.photos/seed/iphone/300/100' },
    { id: 3, name: 'Dell XPS 15', price: 32_000_000, image: 'https://picsum.photos/seed/dell/300/100' },
    { id: 4, name: 'Samsung S24', price: 22_000_000, image: 'https://picsum.photos/seed/samsung/300/100' },
    { id: 5, name: 'iPad Pro M4', price: 18_000_000, image: 'https://picsum.photos/seed/ipad/300/100' },
    { id: 6, name: 'AirPods Pro 2', price: 6_500_000, image: 'https://picsum.photos/seed/airpods/300/100' },
];

const formatPrice = (p) => p.toLocaleString('vi-VN') + ' ₫';

// Read cart from sessionStorage (cleared when tab is closed)
const getCart = () => JSON.parse(sessionStorage.getItem('cart')) || [];

// Save cart and update quantity badge
const saveCart = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCartCount();
};

// Render quantity badge on cart button
const renderCartCount = () => {
    const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = total;
};

// Render cart items (right panel)
const renderCart = () => {
    const cart = getCart();

    if (cart.length === 0) {
        productCartEl.innerHTML = '<p class="empty-msg">Cart is empty</p>';
        return;
    }

    productCartEl.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-item-info">
                <p class="item-name">${item.name}</p>
                <p>${formatPrice(item.price)}</p>
                <p class="item-qty">Qty: ${item.quantity}</p>
            </div>
        </div>
    `).join('');
};

// Render product list (left panel)
const renderProducts = () => {
    productListEl.innerHTML = products.map((p) => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" />
            <div class="product-info">
                <div>
                    <p class="product-name">${p.name}</p>
                    <p class="product-price">${formatPrice(p.price)}</p>
                </div>
                <button class="add-cart-btn" onclick="addToCart(${p.id})">+</button>
            </div>
        </div>
    `).join('');
};

// Add product to cart
window.addToCart = (id) => {
    const cart = getCart();
    const idx = cart.findIndex((item) => item.id === id);

    if (idx > -1) {
        cart[idx].quantity += 1;
    } else {
        const product = products.find((p) => p.id === id);
        if (product) cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    renderCart();
};

// Click cart badge → re-render cart
cartListBtn.addEventListener('click', renderCart);

// Clear cart (with animation)
deleteCartBtn.addEventListener('click', function () {
    const icon = this.querySelector('i');
    if (!icon) return;

    icon.classList.add('icon-fly-away');

    setTimeout(() => {
        this.innerHTML = '<span class="x-mark">🗑</span>';
        setTimeout(() => {
            sessionStorage.removeItem('cart');
            renderCart();
            renderCartCount();
            this.innerHTML = 'Clear <i>🗑</i>';
        }, 800);
    }, 800);
});

// Initialize
renderProducts();
renderCartCount();
renderCart();