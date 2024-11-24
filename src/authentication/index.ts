import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthUserSerializer } from './serializers/auth-user.serializer';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuhtenticationService } from './services/authentication.service';
import { HashingService } from './services/hashing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthUserSerializer, AuhtenticationService, HashingService],
  controllers: [AuthenticationController],
  exports: [HashingService],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: true,
            httpOnly: true,
            maxAge: 300000000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
