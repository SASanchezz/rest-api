import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from './jwt.config';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule, JwtModule.registerAsync(jwtModuleConfig)],
  exports: [ConfigModule, JwtModule],
})
export class JwtGlobalModule {}
