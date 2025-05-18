import axios from 'axios';

export const backendURL = 'http://localhost:5555/api/v1';

const axiosInstance = axios.create({
    baseURL: `${backendURL}/auth`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;