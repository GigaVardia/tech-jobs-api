import { SignInDto, SignUpDto } from './../dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signInLocal(dto: SignInDto) {
    const user = await this.userService.findOne(dto.email);

    if (!user) throw new UnauthorizedException('User does not exist');

    if (user.password !== dto.password)
      throw new UnauthorizedException('Email or password is incorrect');

    return this.signUser(user._id.toString(), user.email, 'user');
  }

  async signUpLocal(dto: SignUpDto) {
    //
  }

  signUser(userId: string, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type,
    });
  }
}
