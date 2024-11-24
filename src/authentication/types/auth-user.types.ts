import { RolesEnum } from 'src/user/constants/user.constants';

export interface AuthUser {
  id: number;
  email: string;
  role: RolesEnum;
}
