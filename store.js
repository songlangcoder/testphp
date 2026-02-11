/**
 * Beauty Nail Salon - Store Data & Logic
 * Kết nối PHP API + MySQL (XAMPP)
 * Giỏ hàng dùng localStorage, Sản phẩm & Đơn hàng dùng API
 */
const STORE_KEYS = { cart: 'beauty_cart' };

// Base URL cho API - tự động detect
const API_BASE = (function() {
    const p = window.location.pathname;
    const parts = p.split('/').filter(Boolean);
    if (parts.length > 1) {
        return '/' + parts[0] + '/api/';
    }
    return 'api/';
})();

async function api(url, options = {}) {
    const res = await fetch(API_BASE + url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'API error');
    return data;
}

// === SẢN PHẨM (API) ===
async function getProducts() {
    try {
        return await api('products.php');
    } catch (e) {
        console.warn('API products failed:', e);
        return [];
    }
}

async function updateProductPrice(id, price) {
    const r = await api('products.php', {
        method: 'PUT',
        body: JSON.stringify({ id, price: parseInt(price) || 0 })
    });
    return r.success;
}

async function deleteProduct(id) {
    const r = await api('products.php', {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });
    return r.success;
}

// === GIỎ HÀNG (localStorage) ===
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(STORE_KEYS.cart) || '[]');
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(STORE_KEYS.cart, JSON.stringify(cart));
    if (typeof updateCartBadge === 'function') updateCartBadge();
}

async function addToCart(productId, qty = 1) {
    const products = await getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) item.qty += qty;
    else cart.push({ id: productId, name: product.name, image: product.image, price: product.price, qty: qty });
    saveCart(cart);
    return true;
}

function updateCartQty(productId, qty) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return false;
    if (qty <= 0) return removeFromCart(productId);
    item.qty = qty;
    saveCart(cart);
    return true;
}

function removeFromCart(productId) {
    const cart = getCart().filter(i => i.id !== productId);
    saveCart(cart);
    return true;
}

function getCartTotal() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

// === ĐƠN HÀNG (API) ===
async function getOrders() {
    try {
        return await api('orders.php');
    } catch (e) {
        console.warn('API orders failed:', e);
        return [];
    }
}

async function createOrder(customer, items, paymentMethod) {
    const r = await api('orders.php', {
        method: 'POST',
        body: JSON.stringify({ customer, items, paymentMethod })
    });
    if (r.success) {
        saveCart([]);
        return { id: r.orderId, total: r.total, customer, items, paymentMethod, status: 'pending' };
    }
    throw new Error('Failed to create order');
}

async function updateOrderStatus(orderId, status) {
    const r = await api('order_status.php', {
        method: 'PUT',
        body: JSON.stringify({ orderId, status })
    });
    return r.success;
}

// Format giá VND
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(price) + 'đ';
}
