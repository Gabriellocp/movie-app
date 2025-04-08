import { ConflictException, Injectable } from "@nestjs/common";
import { CreateFolderDto } from "src/folder/dto/create-folder.dto";
import { PrismaService } from "../prisma.service";

@Injectable()

export class FolderRepository {
    constructor(private readonly db: PrismaService) { }

    async create(dto: CreateFolderDto, userId: string) {
        const { name } = dto
        const existing = await this.db.folder.findFirst({
            where: { userId, name }
        })
        if (existing) {
            throw new ConflictException('User already have this folder, please change its name')
        }
        return await this.db.folder.create({
            data: {
                name,
                userId
            }
        })
    }

    findByUser(userId: string) {
        return this.db.folder.findMany({
            where: { userId }
        })
    }
}