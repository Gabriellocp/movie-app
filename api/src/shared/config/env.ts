import { plainToInstance } from "class-transformer"
import { IsNotEmpty, IsString, validateSync } from "class-validator"

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string
    @IsString()
    @IsNotEmpty()
    movieDbAuth: string
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
    movieDbAuth: process.env.MOVIE_DB_AUTH
})


const errors = validateSync(env)

if (errors.length !== 0) {
    throw new Error(JSON.stringify(errors, null, 2))
}