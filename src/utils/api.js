import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if your server is hosted elsewhere
});
// Add interceptor to add token to each request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
