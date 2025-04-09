import { Injectable } from '@nestjs/common';
import { env } from 'src/shared/config/env';
import { MovieRepository } from 'src/shared/database/repositories/movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly repo: MovieRepository) { }
  create(createMovieDto: CreateMovieDto, userId: string) {
    return this.repo.create(createMovieDto, userId)
  }
  private fetchUrl(url: string) {
    return fetch(
      url,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${env.movieDbAuth}`
        }
      })
  }
  async findByTitle(dto: SearchMovieDto) {
    const response = await this.fetchUrl(
      `https://api.themoviedb.org/3/search/movie?query=${dto.name}&page=${dto.page}&language=pt-BR`)
    return await response.json()
  }
  async findById(id: string) {
    const response = await this.fetchUrl(
      `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
    )
    return response.json()
  }


}
