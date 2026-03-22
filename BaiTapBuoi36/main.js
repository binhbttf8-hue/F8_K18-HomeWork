const BASE_URL = 'https://dummyjson.com/products';

// ── State ──────────────────────────────────────────────────────────────────
let products = [];

// ── DOM refs ───────────────────────────────────────────────────────────────
const listEl = document.getElementById('product-list');
const addBtn = document.getElementById('add-btn');

// ── Render list ────────────────────────────────────────────────────────────
function renderList() {
    listEl.innerHTML = products.map((p) => `
        <li id="item-${p.id}">
            <strong>[${p.id}]</strong> ${p.title} &nbsp;|&nbsp; $${p.price}
            &nbsp;
            <button onclick="goDetail(${p.id})">Detail</button>
            <button onclick="editProduct(${p.id})">Edit</button>
            <button onclick="deleteProduct(${p.id})">Delete</button>
        </li>
    `).join('');
}

// ── READ: fetch all products ───────────────────────────────────────────────
async function fetchProducts() {
    const res = await axios.get(`${BASE_URL}?limit=10`);
    products = res.data.products;
    renderList();
}

// ── NAVIGATE: go to detail page using BOM ─────────────────────────────────
function goDetail(id) {
    // Use BOM location to navigate to detail page with id as query param
    window.location.href = `detail.html?id=${id}`;
}

// ── CREATE: add new product ────────────────────────────────────────────────
addBtn.addEventListener('click', async () => {
    // Show dialog to enter title
    const title = window.prompt('Enter product title:');
    if (!title || !title.trim()) return;

    const res = await axios.post(BASE_URL + '/add', {
        title: title.trim(),
        price: 0,
        stock: 0,
        rating: 0,
        thumbnail: '',
        description: '',
        category: 'general',
    });

    // Add to local list and re-render (API returns fake new id)
    products.unshift(res.data);
    renderList();
    alert(`Product "${res.data.title}" added! (ID: ${res.data.id})`);
});

// ── UPDATE: edit product title ─────────────────────────────────────────────
async function editProduct(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    // Show dialog pre-filled with current title
    const newTitle = window.prompt('Edit product title:', product.title);
    if (!newTitle || !newTitle.trim()) return;
    if (newTitle.trim() === product.title) return; // no change

    const res = await axios.put(`${BASE_URL}/${id}`, {
        title: newTitle.trim(),
    });

    // Update local state and re-render
    product.title = res.data.title;
    renderList();
}

// ── DELETE: remove product ─────────────────────────────────────────────────
async function deleteProduct(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    // Confirm dialog before deleting
    const confirmed = window.confirm(`Are you sure you want to delete "${product.title}"?`);
    if (!confirmed) return;

    await axios.delete(`${BASE_URL}/${id}`);

    // Remove from local list and re-render
    products = products.filter((p) => p.id !== id);
    renderList();
}

// ── Init ───────────────────────────────────────────────────────────────────
fetchProducts();
