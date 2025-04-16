'use server'

import FolderService from "@/services/FolderService"
import { revalidatePath } from "next/cache"

export const createFolderAction = async (formData: FormData) => {
    const name = formData.get('name')
    if (!name) {
        return
    }
    await FolderService.create(String(name))
    revalidatePath('/folder')
}