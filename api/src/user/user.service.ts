import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movie/dto/update-movie.dto';
import { FolderRepository } from 'src/shared/database/repositories/folder.repository';
import { MovieRepository } from 'src/shared/database/repositories/movie.repository';
import { UserRepository } from 'src/shared/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepository,
    private readonly movieRepo: MovieRepository,
    private readonly folderRepo: FolderRepository
  ) { }
  async create(dto: SignUpDto) {
    const existing = await this.repo.findByEmail(dto.email)
    if (existing) {
      throw new ConflictException('Invalid credentials')
    }
    const hashPass = await hash(dto.password, 8)
    return await this.repo.create({
      ...dto,
      password: hashPass
    })
  }

  findByEmail(email: string) {
    return this.repo.findByEmail(email)
  }
  findById(id: string) {
    return this.repo.findById(id)
  }

  async addMovie(dto: CreateMovieDto, userId: string) {
    const folder = await this.folderRepo.findById(dto.folderId)
    if (folder?.userId !== userId) {
      throw new UnauthorizedException('Folder does not belong to this user')
    }
    const alreadyHasThisMovie = await this.repo.getMovies(userId)
    if (alreadyHasThisMovie?.Movies.find(movie => movie.externalId === dto.externalId)) {
      throw new ConflictException('User already has this movie')
    }
    return await this.movieRepo.create(dto, userId)
  }

  async getMovies(userId: string) {
    const movies = await this.repo.getMovies(userId)
    return (movies?.Movies ?? [])
  }

  async updateMovie(dto: UpdateMovieDto, userId: string, movieId: string) {
    const folder = await this.folderRepo.findById(dto.folderId ?? '')
    if (folder?.userId !== userId) {
      throw new UnauthorizedException('Folder does not belong to this user')
    }

    return await this.movieRepo.update(dto, movieId)
  }
}
