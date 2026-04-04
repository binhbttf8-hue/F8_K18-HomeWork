// ==================== DATA LAYER (LocalStorage) ====================

const KEYS = {
  products: 'shopadmin_products',
  orders: 'shopadmin_orders',
  customers: 'shopadmin_customers'
};

// ---- Generic helpers ----
function getData(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function formatMoney(n) {
  return Number(n).toLocaleString('vi-VN') + 'đ';
}

// ---- PRODUCTS ----
function getProducts() { return getData(KEYS.products); }
function saveProducts(data) { saveData(KEYS.products, data); }

function addProduct(product) {
  const products = getProducts();
  product.id = generateId('PRD');
  products.push(product);
  saveProducts(products);
  return product;
}

function updateProduct(id, updated) {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx !== -1) { products[idx] = { ...products[idx], ...updated }; saveProducts(products); }
}

function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

// ---- ORDERS ----
function getOrders() { return getData(KEYS.orders); }
function saveOrders(data) { saveData(KEYS.orders, data); }

function addOrder(order) {
  const orders = getOrders();
  order.id = 'ORD-' + (7720 + orders.length + 1);
  order.date = order.date || new Date().toISOString().split('T')[0];
  orders.push(order);
  saveOrders(orders);
  return order;
}

function updateOrderStatus(id, status) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx !== -1) { orders[idx].status = status; saveOrders(orders); }
}

function deleteOrder(id) {
  saveOrders(getOrders().filter(o => o.id !== id));
}

// ---- CUSTOMERS ----
function getCustomers() { return getData(KEYS.customers); }
function saveCustomers(data) { saveData(KEYS.customers, data); }

function addCustomerData(customer) {
  const customers = getCustomers();
  customer.id = 'CUST-' + String(customers.length + 1).padStart(3, '0');
  customer.orders = customer.orders || 0;
  customer.totalSpent = customer.totalSpent || 0;
  customer.createdAt = customer.createdAt || new Date().toISOString().split('T')[0];
  customers.push(customer);
  saveCustomers(customers);
  return customer;
}

function updateCustomerData(id, updated) {
  const customers = getCustomers();
  const idx = customers.findIndex(c => c.id === id);
  if (idx !== -1) { customers[idx] = { ...customers[idx], ...updated }; saveCustomers(customers); }
}

function deleteCustomerData(id) {
  saveCustomers(getCustomers().filter(c => c.id !== id));
}

// ---- SEED DATA (only on first load) ----
function seedIfEmpty() {
  if (getProducts().length === 0) {
    saveProducts([
      { id: 'PRD-001', name: 'iPhone 15 Pro', sku: 'IP15P-01', category: 'Điện thoại', price: 28900000, costPrice: 25000000, stock: 45, image: '', status: 'Đang bán', description: 'iPhone 15 Pro chính hãng' },
      { id: 'PRD-002', name: 'Tai nghe AirPods Pro', sku: 'AP-02', category: 'Phụ kiện', price: 5500000, costPrice: 4000000, stock: 3, image: '', status: 'Đang bán', description: 'AirPods Pro 2nd gen' },
      { id: 'PRD-003', name: 'iPad Air M2', sku: 'IPA-03', category: 'Máy tính bảng', price: 16900000, costPrice: 14000000, stock: 20, image: '', status: 'Đang bán', description: 'iPad Air chip M2' },
      { id: 'PRD-004', name: 'Ốp lưng Silicon', sku: 'OL-04', category: 'Phụ kiện', price: 250000, costPrice: 80000, stock: 150, image: '', status: 'Đang bán', description: 'Ốp lưng silicon cao cấp' },
      { id: 'PRD-005', name: 'Sạc nhanh 20W', sku: 'SN-05', category: 'Phụ kiện', price: 490000, costPrice: 200000, stock: 80, image: '', status: 'Đang bán', description: 'Sạc nhanh USB-C 20W' },
      { id: 'PRD-006', name: 'Samsung Galaxy S24', sku: 'SS24-06', category: 'Điện thoại', price: 22900000, costPrice: 19000000, stock: 30, image: '', status: 'Đang bán', description: 'Samsung Galaxy S24 Ultra' }
    ]);
  }

  if (getCustomers().length === 0) {
    saveCustomers([
      { id: 'CUST-001', name: 'Nguyễn Anh', email: 'anh.nguyen@email.com', phone: '0912.345.678', tier: 'gold', orders: 25, totalSpent: 45200000 },
      { id: 'CUST-002', name: 'Trần Lan', email: 'lan.tran@email.com', phone: '0988.777.888', tier: 'silver', orders: 12, totalSpent: 18500000 },
      { id: 'CUST-003', name: 'Vũ Duy', email: 'duy.vu@email.com', phone: '0355.999.111', tier: 'bronze', orders: 3, totalSpent: 2100000 },
      { id: 'CUST-004', name: 'Phạm Minh Cường', email: 'cuong.pham@email.com', phone: '0355.123.456', tier: 'bronze', orders: 5, totalSpent: 3200000 },
      { id: 'CUST-005', name: 'Hoàng Anh Tuấn', email: 'tuan.hoang@email.com', phone: '0909.888.999', tier: 'silver', orders: 8, totalSpent: 12000000 }
    ]);
  }

  if (getOrders().length === 0) {
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    saveOrders([
      { id: 'ORD-7721', customerName: 'Nguyễn Văn An', customerPhone: '0912.345.xxx', products: 'iPhone 15 Pro Max (x1)', total: 32500000, status: 'shipping', date: dates[0] },
      { id: 'ORD-7722', customerName: 'Lê Thị Bình', customerPhone: '0988.777.xxx', products: 'AirPods Pro (x2), Case (x2)', total: 11200000, status: 'completed', date: dates[1] },
      { id: 'ORD-7723', customerName: 'Phạm Minh Cường', customerPhone: '0355.123.xxx', products: 'Ốp lưng Silicon', total: 250000, status: 'pending', date: dates[2] },
      { id: 'ORD-7724', customerName: 'Hoàng Anh Tuấn', customerPhone: '0909.888.xxx', products: 'Sạc nhanh 20W', total: 490000, status: 'cancelled', date: dates[3] },
      { id: 'ORD-7725', customerName: 'Nguyễn Anh', customerPhone: '0912.345.678', products: 'iPad Air M2 (x1)', total: 16900000, status: 'completed', date: dates[4] },
      { id: 'ORD-7726', customerName: 'Trần Lan', customerPhone: '0988.777.888', products: 'Samsung Galaxy S24 (x1)', total: 22900000, status: 'completed', date: dates[5] },
      { id: 'ORD-7727', customerName: 'Vũ Duy', customerPhone: '0355.999.111', products: 'Ốp lưng Silicon (x3)', total: 750000, status: 'pending', date: dates[6] }
    ]);
  }
}

// ---- TOAST NOTIFICATION ----
function showToast(message, type = 'success') {
  // Tạo container nếu chưa có
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(container);
  }

  const colors = {
    success: { bg: '#d4edda', border: '#27ae60', text: '#155724', icon: 'fa-check-circle' },
    error: { bg: '#f8d7da', border: '#e74c3c', text: '#721c24', icon: 'fa-exclamation-circle' },
    warning: { bg: '#fff3cd', border: '#f39c12', text: '#856404', icon: 'fa-exclamation-triangle' },
    info: { bg: '#d1ecf1', border: '#3498db', text: '#0c5460', icon: 'fa-info-circle' }
  };
  const c = colors[type] || colors.success;

  const toast = document.createElement('div');
  toast.style.cssText = `background:${c.bg};border-left:4px solid ${c.border};color:${c.text};padding:14px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:flex;align-items:center;gap:10px;min-width:280px;max-width:400px;font-size:0.95rem;animation:slideIn 0.3s ease;`;
  toast.innerHTML = `<i class="fas ${c.icon}"></i><span>${message}</span>`;

  // Thêm animation CSS nếu chưa có
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}';
    document.head.appendChild(style);
  }

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- CONFIRM DIALOG ĐẸP ----
function showConfirm(message, onConfirm) {
  // Tạo overlay + dialog
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9998;display:flex;justify-content:center;align-items:center;';

  const dialog = document.createElement('div');
  dialog.style.cssText = 'background:white;padding:30px;border-radius:12px;max-width:400px;width:90%;box-shadow:0 10px 30px rgba(0,0,0,0.2);text-align:center;';
  dialog.innerHTML = `
    <i class="fas fa-exclamation-triangle" style="font-size:2.5rem;color:#f39c12;margin-bottom:15px;"></i>
    <h3 style="margin-bottom:10px;color:#2c3e50;">Xác nhận</h3>
    <p style="color:#7f8c8d;margin-bottom:25px;line-height:1.5;">${message}</p>
    <div style="display:flex;gap:10px;justify-content:center;">
      <button id="confirmNo" style="padding:10px 25px;border:1px solid #ddd;background:white;border-radius:8px;cursor:pointer;font-weight:600;color:#7f8c8d;">Hủy</button>
      <button id="confirmYes" style="padding:10px 25px;border:none;background:#e74c3c;color:white;border-radius:8px;cursor:pointer;font-weight:600;">Xác nhận</button>
    </div>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  dialog.querySelector('#confirmYes').onclick = () => {
    overlay.remove();
    onConfirm();
  };
  dialog.querySelector('#confirmNo').onclick = () => overlay.remove();
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

// Run seed on load
seedIfEmpty();
