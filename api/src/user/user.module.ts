import { Module } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MovieService],
})
export class UserModule { }
