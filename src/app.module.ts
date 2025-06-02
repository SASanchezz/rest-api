import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/Database.module";
import { CryptService } from "./crypt/crypt.service";
import { NoteModule } from "./note/note.module";
import { AuthModule } from './auth/auth.module';
import { JwtGlobalModule } from "./jwt/jwt.module";

@Module({
  imports: [JwtGlobalModule, DatabaseModule, UserModule, NoteModule, AuthModule],
  providers: [CryptService],
})
export class AppModule {}
