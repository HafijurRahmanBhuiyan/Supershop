import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getProfile: () => API.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: () => API.get('/products'),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => API.get('/cart'),
  addItem: (data) => API.post('/cart/add', data),
  updateItem: (itemId, data) => API.put(`/cart/update/${itemId}`, data),
  removeItem: (itemId) => API.delete(`/cart/remove/${itemId}`),
  clearCart: () => API.delete('/cart/clear'),
};

// Orders API
export const ordersAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/myorders'),
  getById: (id) => API.get(`/orders/${id}`),
  createPaymentIntent: (data) => API.post('/orders/create-payment-intent', data),
  updateToPaid: (id, data) => API.put(`/orders/${id}/pay`, data),
  // Admin
  getAllOrders: () => API.get('/orders'),
  updateStatus: (id, data) => API.put(`/orders/${id}/status`, data),
};

export default API;
