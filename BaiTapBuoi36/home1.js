const base_url = 'https://api.escuelajs.co/api/v1';

const userInfoEl = document.getElementById('userInfo');
const productList = document.getElementById('product-list');
const logoutBtn = document.getElementById('logout-btn');

// Guard: if no token -> redirect to login (BOM navigation)
const token = localStorage.getItem('access_token');
if (!token) {
    window.location.href = './login.html';
}

// Attach token to every axios request via default header
axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;

// Fetch current user profile -> GET auth/profile
async function fetchProfile() {
    const res = await axios.get(`${base_url}/auth/profile`);
    const u = res.data;
    userInfoEl.innerHTML = `
     <img src="${u.avatar}"alt="avatar" width="60" /><br>
     <strong>Name:</strong> {u.name}<br>
     <strong>Email:</strong> ${u.email}<br>
     <strong>Role:</strong> ${u.role}
    `;
}

// Fetch products list