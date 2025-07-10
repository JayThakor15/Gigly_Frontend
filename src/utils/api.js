import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if your server is hosted elsewhere
});

export default API;
