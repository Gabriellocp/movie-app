import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/CurrentUser.decorator';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post()
  create(@CurrentUser() userId: string, @Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto, userId);
  }

  @Get()
  findByTitle(
    @Query('name') name: string,
    @Query('page', ParseIntPipe) page: number
  ) {
    console.log(name, page)
    return this.movieService.findByTitle({ name, page });
  }
  @Get('detail/:id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id)
  }

}
