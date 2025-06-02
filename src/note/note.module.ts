import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";
import { NoteEntity } from "./entity/note.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity])
  ],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
