import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up.dto';

import { AuhtenticationService } from '../services/authentication.service';
import { SignInDto } from '../dto/sign-in.dto';
import { Request } from 'express';
import { promisify } from 'util';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuhtenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    await this.authenticationService.signup(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Req() request: Request, @Body() signInDto: SignInDto) {
    const user = await this.authenticationService.signin(signInDto);
    await promisify(request.logIn).call(request, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() request: Request) {
    request.session.destroy(() => true);
  }
}
