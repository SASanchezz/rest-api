import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CryptModule } from "src/crypt/crypt.module";

import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CryptModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
