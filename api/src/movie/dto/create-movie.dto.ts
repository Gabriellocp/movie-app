import { MOVIE_STATUS_TYPE } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateMovieDto {
    @IsArray()
    @IsNotEmpty()
    categories: string[]
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value))
    externalId: string
    @IsEnum(MOVIE_STATUS_TYPE)
    @IsNotEmpty()
    status: MOVIE_STATUS_TYPE
    @IsNumber()
    @IsNotEmpty()
    rate: number
    @IsString()
    annotation: string | undefined
    @IsUUID()
    @IsNotEmpty()
    folderId: string
}
