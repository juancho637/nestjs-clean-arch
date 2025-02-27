import { Module } from '@nestjs/common';
import { HashProvidersEnum } from '../domain';
import { HashBcryptService } from './hash-bcrypt.service';

@Module({
  providers: [
    {
      provide: HashProvidersEnum.HASH_SERVICE,
      useClass: HashBcryptService,
    },
  ],
  exports: [HashProvidersEnum.HASH_SERVICE],
})
export class HashModule {}
