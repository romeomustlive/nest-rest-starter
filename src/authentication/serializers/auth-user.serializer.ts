import { PassportSerializer } from '@nestjs/passport';
import { AuthUser } from '../types/auth-user.types';

export class AuthUserSerializer extends PassportSerializer {
  serializeUser(user: AuthUser, done: (err: Error, user: AuthUser) => void) {
    done(null, {
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  deserializeUser(
    payload: AuthUser,
    done: (err: Error, user: AuthUser) => void,
  ) {
    done(null, payload);
  }
}
