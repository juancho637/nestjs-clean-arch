import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';
import { HashServiceInterface } from '../domain';

@Injectable()
export class HashBcryptService implements HashServiceInterface {
  async hash(hashString: string): Promise<string> {
    const salt = await genSalt();

    return await hash(hashString, salt);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await compare(password, hashPassword);
  }
}
