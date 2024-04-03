import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ROOT || 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  console.log('token', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
