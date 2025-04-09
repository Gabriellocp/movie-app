import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import 'dotenv/config';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { FolderModule } from './folder/folder.module';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [DatabaseModule, AuthModule, UserModule, FolderModule, MovieModule],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AppModule { }
