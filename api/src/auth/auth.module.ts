import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: env.jwtSecret,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule { }
