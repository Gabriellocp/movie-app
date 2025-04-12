import { api } from "./utils/api"

class UserService {
    private readonly handler = api('/user')
    async addMovie(movie: any) {
        await this.handler.post('/add', movie)
    }
    async getMovies() {
        const result = await this.handler.get('/movies')
        return result.data
    }
}

export default new UserService()