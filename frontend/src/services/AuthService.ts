import { api } from "./utils/api";

class AuthService {
    private handler = api('/auth')
    async authenticate({ email, password }: { email: string, password: string }) {
        const { data } = await this.handler.post('/signin', { email, password }, { withCredentials: true })
        localStorage.setItem('accessToken', data.accessToken)
        return data.accessToken
    }
    async signup({ name, email, password }: { name: string, email: string, password: string }) {
        const { data } = await this.handler.post('/signup', { email, password, name }, { withCredentials: true })
        localStorage.setItem('accessToken', data.accessToken)
        return data.accessToken
    }

    async refresh() {
        const { data } = await this.handler.get('/refresh', { withCredentials: true })
        return data
    }
}

export default new AuthService()