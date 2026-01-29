import axios from 'axios';

// Determine the API base URL based on environment
const getBaseURL = () => {
    // If VITE_API_URL is explicitly set, use it (for Render backend)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // In production, use relative path (for Vercel monorepo deployment)
    if (import.meta.env.PROD) {
        return '';
    }
    
    // In development, use localhost
    return 'http://localhost:5000';
};

const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
