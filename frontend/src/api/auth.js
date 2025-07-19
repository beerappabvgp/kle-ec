// API utility functions for authentication

import api from './axios';

export async function login({ email, password }) {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
}

export async function signup({ name, email, password }) {
    console.log('Sending signup request to:', '/auth/register');
    console.log('Request data:', { name, email, password: '***' });
    const res = await api.post('/auth/register', { name, email, password });
    console.log('Signup response:', res.data);
    return res.data;
}

export async function logout() {
    try {
        // Call the backend logout endpoint
        await api.post('/auth/logout');
    } catch (error) {
        // Even if the backend call fails, we should still clear the local token
        console.error('Logout API call failed:', error);
    } finally {
        // Always remove token from localStorage
        localStorage.removeItem('token');
    }
} 