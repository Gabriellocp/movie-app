import { getCookies } from '@/app/actions/getSSCookies'
import axios from 'axios'
import AuthService from '../AuthService'
export const api = (suffix?: string) => {
    const axiosInstance = axios.create()
    axiosInstance.defaults.baseURL = `http://localhost:3001${suffix ? suffix : ''}`
    axiosInstance.interceptors.request.use(async (config) => {
        if (typeof window === "undefined") {
            config.headers.Authorization = `Bearer ${await getCookies('accessToken')}`
            return config
        }
        console.log('BABCCASDOIASHDI', localStorage.getItem('accessToken'))
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
    })
    axiosInstance.interceptors.response.use((response) => response, async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await AuthService.refresh()
                const { accessToken } = response;
                localStorage.setItem('accessToken', accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(new Error(error?.response?.data?.message ?? 'Unexpected error'));
    })
    return axiosInstance
}
