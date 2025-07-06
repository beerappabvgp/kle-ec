import api from './axios';

// Create Razorpay payment order
export async function createPaymentOrder(amount) {
    const res = await api.post('/orders/create-payment-order', { amount });
    return res.data;
}

// Verify payment and create order
export async function verifyPayment(paymentData) {
    const res = await api.post('/orders/verify-payment', paymentData);
    return res.data;
}

// Get user's orders
export async function getUserOrders() {
    const res = await api.get('/orders');
    return res.data;
}

// Get single order
export async function getOrder(orderId) {
    const res = await api.get(`/orders/${orderId}`);
    return res.data;
}

// Update order status (admin only)
export async function updateOrderStatus(orderId, status) {
    const res = await api.put(`/orders/${orderId}/status`, { orderStatus: status });
    return res.data;
} 