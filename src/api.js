// src/api.js
import axios from 'axios';

// Use environment variable to support both local and production
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});

// Automatically include the token with requests
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
