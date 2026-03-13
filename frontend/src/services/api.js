import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const scanAPI = {
  uploadImage: async (formData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await api.post('/scans/image', formData, config);
    return data;
  },
  scanBarcode: async (barcode) => {
    const { data } = await api.post('/scans/barcode', { barcode });
    return data;
  },
  getHistory: async () => {
    const { data } = await api.get('/scans');
    return data;
  }
};

export default api;
