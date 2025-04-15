import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

interface IJWTPayload {
  sub: string;
  name: string
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }
  private async generateJwt(user: User) {
    const payload: IJWTPayload = { sub: user.id, name: user.name }
    const accessToken = await this.jwtService.signAsync(payload)
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '3d' })
    return { accessToken, refreshToken }
  }
  async signUp(dto: SignUpDto) {
    const user = await this.userService.create(dto)
    const { accessToken, refreshToken } = await this.generateJwt(user)
    return { accessToken, refreshToken }
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
    const { accessToken, refreshToken } = await this.generateJwt(user)
    return { accessToken, refreshToken }
  }

  async refresh(dto: RefreshTokenDto) {
    const { refreshToken } = dto
    const payload = this.jwtService.verify<IJWTPayload>(refreshToken)
    if (!payload) {
      throw new BadRequestException('No refresh token provided')
    }
    const user = await this.userService.findById(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    const { accessToken } = await this.generateJwt(user)
    return { accessToken }
  }

}
