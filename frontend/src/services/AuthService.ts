import { api } from "./utils/api";

class AuthService {
    private handler = api('/auth')
    async authenticate({ email, password }: { email: string, password: string }) {
        const { data } = await this.handler.post('/signin', { email, password })
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        return data.accessToken
    }
    async signup({ name, email, password }: { name: string, email: string, password: string }) {
        const { data } = await this.handler.post('/signup', { email, password, name })
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        return data.accessToken
    }

    async refresh() {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await this.handler.post('/refresh', { refreshToken })
        return data
    }
}

export default new AuthService()