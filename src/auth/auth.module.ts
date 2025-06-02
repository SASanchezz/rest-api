import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { CryptModule } from 'src/crypt/crypt.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    CryptModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
