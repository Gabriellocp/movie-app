import { IsNumber, IsString } from "class-validator";

export class SearchMovieDto {
    @IsString()
    name: string | undefined
    @IsNumber()
    page: number
}