import api from './axios';

// Add product to cart
export async function addToCart(productId, quantity = 1) {
    const res = await api.post('/cart/add', { productId, quantity });
    return res.data;
}

// Get current user's cart
export async function getCart() {
    const res = await api.get('/cart');
    return res.data;
}

// Update quantity of a cart item
export async function updateCartItem(productId, quantity) {
    const res = await api.put('/cart/update', { productId, quantity });
    return res.data;
}

// Remove item from cart
export async function removeCartItem(productId) {
    const res = await api.delete(`/cart/remove/${productId}`);
    return res.data;
}

// Clear cart
export async function clearCart() {
    const res = await api.delete('/cart/clear');
    return res.data;
} 