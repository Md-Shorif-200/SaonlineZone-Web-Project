// useAxiosPrivate.js
import axios from 'axios';
import React from 'react';

const useAxiosPrivate = () => {
    const axiosPrivate = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true // HTTP-only cookies পাঠানোর জন্য প্রয়োজন
    });

    // Response interceptor - token expired হলে handle করার জন্য
    axiosPrivate.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Token expired বা invalid - user কে login page এ redirect করুন
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return axiosPrivate;
};

export default useAxiosPrivate;