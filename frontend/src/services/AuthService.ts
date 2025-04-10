import { api } from "./utils/api";

class AuthService {
    private handler = api('/auth')
    async authenticate({ email, password }: { email: string, password: string }) {
        const { data } = await this.handler.post('/signin', { email, password })
        localStorage.setItem('accessToken', data.accessToken)
        return data.accessToken
    }
    async signup({ name, email, password }: { name: string, email: string, password: string }) {
        const { data } = await this.handler.post('/signup', { email, password, name })
        localStorage.setItem('accessToken', data.accessToken)
        return data.accessToken
    }
}

export default new AuthService()