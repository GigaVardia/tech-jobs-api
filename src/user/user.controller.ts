import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Res,
  Controller,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findOne(createUserDto.email);
    if (user)
      return res.status(HttpStatus.CONFLICT).send('User already exists!');

    return await this.userService.create(createUserDto);
  }
}
