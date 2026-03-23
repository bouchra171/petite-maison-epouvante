import axios from 'axios';

// Configuration de base
const API_BASE_URL = 'http://localhost:8080/api';

// Instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion des erreurs 401 - Rediriger vers login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 🔐 Authentification
export const authAPI = {
  register: (userData) => 
    api.post('/auth/register', userData),
  
  login: (credentials) => 
    api.post('/auth/login', credentials),
};

// 📦 Produits
export const productsAPI = {
  getAll: () => 
    api.get('/products'),
  
  getById: (id) => 
    api.get(`/products/${id}`),
  
  create: (product) => 
    api.post('/products', product),
  
  update: (id, product) => 
    api.put(`/products/${id}`, product),
  
  delete: (id) => 
    api.delete(`/products/${id}`),
  
  search: (query) => 
    api.get(`/products/search`, { params: { q: query } }),
};

// 👥 Utilisateurs
export const usersAPI = {
  getAll: () => 
    api.get('/users'),
  
  getProfile: () => 
    api.get('/users/profile'),
  
  update: (userData) => 
    api.put('/users/profile', userData),
  
  delete: (id) => 
    api.delete(`/users/${id}`),
};

// 🛒 Panier (à implémenter)
export const cartAPI = {
  getAll: () => 
    api.get('/cart'),
  
  addItem: (productId, quantity) => 
    api.post('/cart/items', { productId, quantity }),
  
  updateItem: (productId, quantity) => 
    api.put(`/cart/items/${productId}`, { quantity }),
  
  removeItem: (productId) => 
    api.delete(`/cart/items/${productId}`),
  
  clear: () => 
    api.delete('/cart'),
};

// 📋 Commandes (à implémenter)
export const ordersAPI = {
  getAll: () => 
    api.get('/orders'),
  
  getById: (id) => 
    api.get(`/orders/${id}`),
  
  create: (orderData) => 
    api.post('/orders', orderData),
};

export default api;
