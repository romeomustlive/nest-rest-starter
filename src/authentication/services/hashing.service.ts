import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt();

    return hash(password, salt);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
