import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { FolderRepository } from "./repositories/folder.repository";
import { MovieRepository } from "./repositories/movie.repository";
import { UserRepository } from "./repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, FolderRepository, UserRepository, MovieRepository],
    exports: [FolderRepository, UserRepository, MovieRepository]
})
export class DatabaseModule { }