const $ = document.querySelector.bind(document);

// Task 1:
// Get DOM
const inputName = $("#input-name");
const saveBtn = $("#save-btn");
const readBtn = $("#read-btn");
const readName = $("#read-name");

// Get name to localStorage
const getName = () => localStorage.getItem("username") || "Khách";

// Render UI
const renderName = (name) => {
    readName.textContent = `Name: ${name}`;
};
renderName(getName());

// Handle start space
inputName.addEventListener("input", () => {
    if (inputName.value.startsWith(" ")) {
        inputName.value = inputName.value.trimStart();
        return;
    }
});

// Handle Save
const handleSave = () => {
    const value = inputName.value.trim();

    if (!value) return;

    // save localStorage
    localStorage.setItem("username", value);

    // Clear input
    inputName.value = "";
};

saveBtn.addEventListener("click", handleSave);

// Handle read
readBtn.addEventListener("click", () => {
    renderName(getName());
});

// -------------------------------------------------------------------------------

// Task 2:
const heading = $("#heading");
const resetBtn = $("#reset-btn");

// Get count in localStoage
// const getCount = () => Number(localStorage.getItem("count")) || 0;

// Render UI
const renderCount = (count) => {
    heading.textContent = `You have visited this page ${count} times.`;
};

// fake reset page
const hasResetPage = sessionStorage.getItem("page-opened");

// Get cur count
let currentCount = Number(localStorage.getItem("count")) || 0;

if (!hasResetPage) {
    currentCount = 0;
    sessionStorage.setItem("page-opened", "true");
} else {
    currentCount++;
}

localStorage.setItem("count", currentCount);
renderCount(currentCount);

// Handle reset
resetBtn.addEventListener("click", () => {
    const startCount = 0;
    localStorage.setItem("count", startCount);
    renderCount(startCount);
});

// -------------------------------------------------------------------------------

// Task 3:
const productList = $("#product-list");
const productCart = $("#product-cart");
const cartList = $("#cart-list");
const cartCount = $("#cart-count");
const deleteCart = $("#delete-cart");
const products = [];

// Create product
for (let i = 1; i <= 8; i++) {
    products.push({
        id: i,
        name: `Name: Product ${i}`,
        price: `Price: ${i}00$`,
        image: `https://picsum.photos/300/100?random=${i}`,
        quantity: 0,
    });
}

// Get cart to sessionStorage
const getCart = () => JSON.parse(sessionStorage.getItem("cart")) || [];

// Save cart
const saveCart = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCartCount();
};

// Render cart
const renderCart = () => {
    const carts = getCart();

    const html = carts
        .map(
            (cart) =>
                `<div class="cart-item-container p-4 product-card">
                    <img src="${cart.image}" alt="${cart.name}" class="rounded-t-xl w-full" />
                    <div class="flex justify-between items-center mt-4">
                        <div>
                        <p>${cart.name}</p>
                        <p>${cart.price}</p>
                        <p>Quantity: ${cart.quantity}</p>
                        </div>
                    </div>
                </div>`,
        )
        .join("");

    productCart.innerHTML = html;
};

// Render UI
const renderProduct = () => {
    const html = products.map(
        (product) => `
        <div class="p-4 product-card">
            <img src="${product.image}" alt="${product.name}" class="rounded-t-xl w-full" />
            <div class="flex justify-between items-center mt-4">
                <div>
                <p>${product.name}</p>
                <p>${product.price}</p>
                
                </div>
                <button class="p-2 cursor-pointer" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-arrow-down text-xl"></i>
                </button>
            </div>
        </div>
    `,
    );

    productList.innerHTML = html.join("");
};
renderProduct();

// Handle add cart
window.addToCart = (id) => {
    const cart = getCart();
    const existingItemCart = cart.findIndex((item) => item.id === id);

    if (existingItemCart > -1) {
        cart[existingItemCart].quantity += 1;
    } else {
        const product = products.find((p) => p.id === id);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }

    saveCart(cart);
};

cartList.addEventListener("click", () => {
    renderCart();
});

// Handel cart count
const renderCartCount = () => {
    const carts = getCart();
    cartCount.textContent = 0;
    let cartQuantity = 0;

    if (carts) {
        carts.forEach((cart) => {
            cartQuantity += cart.quantity;
        });

        cartCount.textContent = cartQuantity;
    }
};
renderCartCount();

// Handle delete cart
deleteCart.addEventListener("click", function () {
    const icon = this.querySelector("i");

    if (icon) {
        icon.classList.add("icon-fly-away");

        setTimeout(() => {
            this.innerHTML = `<span class="x-mark"><i class="fa-solid fa-trash"></i></span>`;
            setTimeout(() => {
                sessionStorage.removeItem("cart");
                renderCart();
                renderCartCount();
                this.innerHTML = `Delete: <i class="fa-solid fa-cart-flatbed text-xl"></i>`;
            }, 1000);
        }, 1000);
    }
});