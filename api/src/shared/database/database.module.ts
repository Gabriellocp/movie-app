import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { FolderRepository } from "./repositories/folder.repository";
import { UserRepository } from "./repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, FolderRepository, UserRepository],
    exports: [FolderRepository, UserRepository]
})
export class DatabaseModule { }