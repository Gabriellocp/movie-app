import { Injectable } from "@nestjs/common";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { PrismaService } from "../prisma.service";
@Injectable()
export class UserRepository {
    constructor(private readonly db: PrismaService) { }
    create(dto: SignUpDto) {
        const { email, name, password } = dto
        return this.db.user.create({
            data: {
                email,
                name,
                password
            }
        })
    }
    findByEmail(email: string) {
        return this.db.user.findUnique({
            where: { email }
        })
    }
    getMovies(userId: string) {
        return this.db.user.findUnique({
            where: { id: userId },
            select: { Movies: true }
        })
    }
}