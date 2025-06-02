import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "src/auth/auth.guard";

import { NoteService } from "./note.service";
import { NoteEntity } from "./entity/note.entity";
import { NoteDto } from "./dto/note.dto";
import { JwtPayload } from "src/jwt/jwt-payload.type";

@ApiTags("Note")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  
  @Get()
  findAll(): Promise<NoteEntity[]> {
    return this.noteService.findAll();
  }

  @Post()
  create(@Req() req: { user: JwtPayload }, @Body() body: NoteDto): Promise<NoteEntity> {
    return this.noteService.create(req.user.userId, body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: Partial<NoteDto>): Promise<NoteEntity> {
    return this.noteService.update(id, body);
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<void> {
    return this.noteService.delete(id);
  }
}