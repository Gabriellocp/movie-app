import { getCookies, getHeaderCookies } from '@/app/actions/getSSCookies'
import axios from 'axios'
export const api = (suffix?: string) => {
    const axiosInstance = axios.create()
    axiosInstance.defaults.baseURL = `http://localhost:3001${suffix ? suffix : ''}`
    axiosInstance.interceptors.request.use(async (config) => {
        if (typeof window === "undefined") {
            config.headers.Authorization = `Bearer ${await getCookies('accessToken')}`
            return config
        }
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
    })
    axiosInstance.interceptors.response.use((response) => response, async (error) => {

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // let refreshToken;
                let headers = {};
                if (typeof window === 'undefined') {
                    headers = {
                        Cookie: await getHeaderCookies()
                    }
                }
                //     refreshToken = localStorage.getItem('refreshToken')
                // }
                const response = await axiosInstance.get(`${process.env.API_URL}/auth/refresh`, { withCredentials: true, headers })
                const { accessToken } = response.data;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', accessToken);
                }
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/';
                }
                return Promise.reject(refreshError);
            }
        }
        if (typeof window === 'undefined') {

            return Promise.reject(JSON.stringify(error?.response.status));
        }
        return Promise.reject(new Error(error?.response?.data?.message ?? 'Unexpected error'));
    })
    return axiosInstance
}
