import { MovieDb, UserMovie } from "@/types"
import { api } from "./utils/api"

class UserService {
    private readonly handler = api('/user')
    async addMovie(movie: MovieDb) {
        await this.handler.post('/add', movie)
    }
    async updateMovie(id: string, movie: UserMovie) {
        const response = await this.handler.put(`/update/${id}`, movie)
        return response.data
    }
    async getMovies() {
        const result = await this.handler.get('/movies')
        return result.data
    }
}

export default new UserService()