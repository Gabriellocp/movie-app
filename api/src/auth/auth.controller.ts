import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() dto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.signUp(dto);
    response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false })
    return response.json({ accessToken })
  }

  @Post('signin')
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(dto);
    response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false })
    return response.json({ accessToken })
  }

  @Get('refresh')
  async refresh(@Req() request: Request) {
    const refreshToken = request.cookies['refreshToken']
    if (!refreshToken) {
      throw new BadRequestException('No token provided')
    }
    return await this.authService.refresh({ refreshToken })
  }
}
