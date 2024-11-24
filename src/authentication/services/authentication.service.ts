import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from '../dto/sign-in.dto';
import { HashingService } from './hashing.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { RolesEnum } from 'src/user/constants/user.constants';

@Injectable()
export class AuhtenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const userByUsername = await this.usersRepository.findOneBy({
      username: signUpDto.username,
    });

    if (userByUsername) {
      throw new BadRequestException('Username already given by another user.');
    }

    const userByEmail = await this.usersRepository.findOneBy({
      email: signUpDto.email,
    });

    if (userByEmail) {
      throw new BadRequestException('User already exist.');
    }

    const hashingPassword = await this.hashingService.hash(signUpDto.password);

    this.usersRepository.save({
      ...signUpDto,
      hashingPassword,
      role: RolesEnum.User,
    });
  }

  async signin(signInDto: SignInDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are wrong.');
    }

    const isEqual = await this.hashingService.compare(signInDto.password, user.hashingPassword);

    if (!isEqual) {
      throw new UnauthorizedException('Credentials are wrong.');
    }

    return user;
  }
}
