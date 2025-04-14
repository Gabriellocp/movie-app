import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "src/movie/dto/create-movie.dto";
import { UpdateMovieDto } from "src/movie/dto/update-movie.dto";
import { PrismaService } from "../prisma.service";
@Injectable()
export class MovieRepository {
    constructor(private readonly db: PrismaService) { }

    create(dto: CreateMovieDto, userId: string) {
        const {
            annotation,
            categories,
            externalId,
            folderId,
            rate,
            status
        } = dto
        return this.db.movie.create({
            data: {
                userId,
                annotation,
                categories,
                externalId,
                folderId,
                rate,
                status
            }
        })
    }
    update(dto: UpdateMovieDto, movieId: string) {
        return this.db.movie.update({
            where: { id: movieId },
            data: {
                ...dto
            }
        })
    }

}