import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }
  private async generateJwt(user: User) {
    const payload = { sub: user.id, name: user.name }
    const accessToken = await this.jwtService.signAsync(payload)
    return accessToken
  }
  async signUp(dto: SignUpDto) {
    const user = await this.userService.create(dto)
    return { accessToken: await this.generateJwt(user) }
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const validPass = await compare(password, user.password)
    if (!validPass) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return { accessToken: await this.generateJwt(user) }
  }



}
