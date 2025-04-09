import { CreateMovieDto } from "src/movie/dto/create-movie.dto";
import { PrismaService } from "../prisma.service";

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

}