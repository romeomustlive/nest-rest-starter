import { Module } from '@nestjs/common';
import { MeController } from './controllers/me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { HashingService } from 'src/authentication/services/hashing.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [MeController, UserController],
  providers: [UserService, HashingService],
})
export class UserModule {}
