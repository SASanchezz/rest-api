import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/Database.module';
import { CryptService } from './crypt/crypt.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [CryptService],
})
export class AppModule {}
