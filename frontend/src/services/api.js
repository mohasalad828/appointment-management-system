import axios from 'axios';
import { logoutUser } from './authUtils';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add interceptor for handling token expiration
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && error.response.data.message === "Token expired") {
      alert("Session expired. Please log in again.");
      logoutUser(); // Log the user out automatically
    }
    return Promise.reject(error);
  }
);

export default api;
