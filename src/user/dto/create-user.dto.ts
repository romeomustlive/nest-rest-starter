import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { RolesEnum } from '../constants/user.constants';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6)
  public readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  public readonly password: string;

  @IsNotEmpty()
  @IsEnum(RolesEnum)
  public readonly role: RolesEnum;
}
