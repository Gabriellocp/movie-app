import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { MovieService } from 'src/movie/movie.service';
import { CurrentUser } from 'src/shared/decorators/CurrentUser.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly movieService: MovieService
  ) { }

  @Post('add')
  addMovie(@CurrentUser() userId: string, @Body() dto: CreateMovieDto) {
    return this.userService.addMovie(dto, userId)
  }
  @Get('movies')
  async getAllMovies(@CurrentUser() userId: string) {
    const movies = await this.userService.getMovies(userId)
    return await Promise.all(movies.map(async (movie) => {
      const details = await this.movieService.findById(movie.externalId)
      return ({
        ...details,
        ...movie,
      })
    }))
  }
}
