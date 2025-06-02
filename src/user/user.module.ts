import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptModule } from 'src/crypt/crypt.module';

import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { jwtModuleConfig } from 'src/jwt/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtModuleConfig),
    CryptModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
