import { api } from "./utils/api";

class MovieService {
    private readonly handler = api('/movie')
    async search(name: string, page?: number) {
        const result = await this.handler.get('', {
            params: {
                name,
                page
            }
        })
        return result.data
    }
    async details(id: string) {
        const result = await this.handler.get(`/detail/${id}`)
        return result.data
    }
}

export default new MovieService()