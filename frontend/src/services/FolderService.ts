import { api } from "./utils/api"

class FolderService {
    private readonly handler = api('/folder')
    async getUserFolders() {
        const result = await this.handler.get('')
        return result.data
    }
}

export default new FolderService()