import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8800',
});

// Adjunta el token en cada petición si existe
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
