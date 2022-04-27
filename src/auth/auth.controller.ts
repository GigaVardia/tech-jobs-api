import { SignInDto, SignUpDto } from './../dto/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signInLocal(@Body() dto: SignInDto) {
    return this.authService.signInLocal(dto);
  }

  @Post('signup')
  signUpLocal(@Body() dto: SignUpDto) {
    return this.authService.signUpLocal(dto);
  }
}
