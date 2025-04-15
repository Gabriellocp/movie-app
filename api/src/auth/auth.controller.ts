import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto)
  }
}
