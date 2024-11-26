import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from 'src/authentication';
import { AuthorizationModule } from 'src/authorization';
import { CommonModule } from 'src/common';
import { DatabaseModule } from 'src/database';
import { UserModule } from 'src/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().positive(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required().allow(''),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthenticationModule,
    UserModule,
    AuthorizationModule,
    CommonModule,
  ],
})
export class AppModule {}
