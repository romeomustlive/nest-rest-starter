import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/authentication/decorators/auth-user.decorator';
import { AuthUser } from 'src/authentication/types/auth-user.types';
import { SessionAuthenticationGuard } from 'src/authentication/guards/session-authentication.guard';

@UseGuards(SessionAuthenticationGuard)
@Controller('me')
export class MeController {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  @Get()
  async me(@CurrentUser() currentUser: AuthUser) {
    return await this.usersRepository.findOneByOrFail({ id: currentUser.id });
  }
}
