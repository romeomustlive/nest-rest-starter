import { BaseEntity } from 'src/common/entities/base.entity';
import { RolesEnum } from '../constants/user.constants';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public hashingPassword: string;

  @Column({ enum: RolesEnum, default: RolesEnum.User })
  public role: RolesEnum;
}
