import axios from 'axios'
export const api = (suffix?: string) => axios.create({
    baseURL: `http://localhost:3001${suffix ? suffix : ''}`
})