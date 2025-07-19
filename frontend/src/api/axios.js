import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://kle-ec.onrender.com/api',
    withCredentials: false,
});

// Attach token to every request
api.interceptors.request.use(
    (config) => {
        console.log('Making API request:', config.method?.toUpperCase(), config.url);
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Log responses for debugging
api.interceptors.response.use(
    (response) => {
        console.log('API response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('API error:', error.response?.status, error.config?.url, error.message);

        // Handle 401 errors globally - redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api; 