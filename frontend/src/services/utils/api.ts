import { getCookies } from '@/app/actions/getSSCookies'
import axios from 'axios'
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
    axiosInstance.interceptors.response.use((response) => response, (error) => {
        return Promise.reject(new Error(error?.response?.data?.message ?? 'Unexpected error'));
    })
    return axiosInstance
}
