import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { CreateFolderDto } from "src/folder/dto/create-folder.dto";
import { UpdateFolderDto } from "src/folder/dto/update-folder.dto";
import { PrismaService } from "../prisma.service";

@Injectable()

export class FolderRepository {
    constructor(private readonly db: PrismaService) { }
    findFolder(args: Prisma.FolderFindFirstArgs<DefaultArgs>) {
        return this.db.folder.findFirst(args)
    }
    create(dto: CreateFolderDto, userId: string) {
        const { name } = dto

        return this.db.folder.create({
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
    findById(id: string) {
        return this.db.folder.findUnique({
            where: { id }
        })
    }

    update(id: string, dto: UpdateFolderDto) {
        const { name } = dto

        return this.db.folder.update({
            where: { id },
            data: { ...dto }
        })

    }
}