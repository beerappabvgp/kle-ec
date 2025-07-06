import api from './axios';

// Get all products (with optional query params for filtering/pagination)
export async function getAllProducts(params) {
    const res = await api.get('/products', { params });
    return res.data;
}

// Get a single product by ID
export async function getProduct(id) {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

// Create a new product
export async function createProduct(product) {
    const res = await api.post('/products', product);
    return res.data;
}

// Update a product by ID
export async function updateProduct(id, product) {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
}

// Delete a product by ID (soft delete)
export async function deleteProduct(id) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
}

// Rate a product (add/update user rating)
export async function rateProduct(productId, rating) {
    const res = await api.post(`/products/${productId}/rate`, { rating });
    return res.data;
}

// Get all reviews for a product
export async function getProductReviews(productId) {
    const res = await api.get(`/products/${productId}/reviews`);
    return res.data;
}

// Add or update a review for a product
export async function addOrUpdateProductReview(productId, reviewData) {
    const res = await api.post(`/products/${productId}/reviews`, reviewData);
    return res.data;
}

// Delete a review
export async function deleteProductReview(productId, reviewId) {
    const res = await api.delete(`/products/${productId}/reviews/${reviewId}`);
    return res.data;
} 