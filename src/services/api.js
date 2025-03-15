import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = async (username, password) => {
  try {
    const { data } = await api.post('/auth/register', { username, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Coupons API
export const claimCoupon = async (sessionId) => {
  try {
    const { data } = await api.post('/coupons/claim', { sessionId });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to claim coupon');
  }
};

export const getCoupons = async () => {
  try {
    const { data } = await api.get('/coupons');
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch coupons');
  }
};

export const addCoupon = async (code) => {
  try {
    const { data } = await api.post('/coupons', { code });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add coupon');
  }
};

export const updateCoupon = async (id, updateData) => {
  try {
    const { data } = await api.patch(`/coupons/${id}`, updateData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update coupon');
  }
};