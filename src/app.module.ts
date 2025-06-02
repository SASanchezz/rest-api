import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/Database.module";
import { CryptService } from "./crypt/crypt.service";
import { NoteModule } from "./note/note.module";

@Module({
  imports: [DatabaseModule, UserModule, NoteModule],
  providers: [CryptService],
})
export class AppModule {}
