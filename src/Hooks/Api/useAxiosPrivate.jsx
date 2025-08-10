import axios from 'axios';

const useAxiosPrivate = () => {
    // Environment based base URL
    const baseURL = process.env.NODE_ENV === 'production' 
        ? 'https://saonlinezone-server.vercel.app'
        : 'http://localhost:5000'; // Local development এর জন্য

    const axiosPrivate = axios.create({
        baseURL: baseURL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 second timeout
    });

    // Request interceptor
    axiosPrivate.interceptors.request.use(
        (config) => {
            console.log('Making request to:', config.url);
            return config;
        },
        (error) => {
            console.log('Request error:', error);
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosPrivate.interceptors.response.use(
        (response) => {
            console.log('Response received:', response.data);
            return response;
        },
        (error) => {
            console.log('Response error:', error.response?.data || error.message);
            
            if (error.response?.status === 401) {
                console.log('Unauthorized - redirecting to login');
                // localStorage.clear(); // Clear any stored data
                // window.location.href = '/login';
            }
            
            return Promise.reject(error);
        }
    );

    return axiosPrivate;
};

export default useAxiosPrivate;