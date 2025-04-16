import { api } from "./utils/api"

class FolderService {
    private readonly handler = api('/folder')
    async getUserFolders() {
        const result = await this.handler.get('')
        return result.data
    }
    async update(id: string, folder: { name: string }) {
        const result = await this.handler.put(`/${id}`, folder)
        return result.data
    }
    async create(name: string) {
        const result = await this.handler.post('/', { name })
        return result.data
    }
}

export default new FolderService()