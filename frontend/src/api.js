// Interceptor from axios
// To intercept requests and responses, to automatically add headers, show loading indicators, etc.

import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL, // Import anything from .env file
});

// Add a request interceptor to add the access token to the request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) { // If token exists, add it to the headers
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;