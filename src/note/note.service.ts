import { BadRequestException, Injectable } from "@nestjs/common";
import { NoteEntity } from "./entity/note.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NoteDto } from "./dto/note.dto";

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  public async findAll(): Promise<NoteEntity[]> {
    return this.noteRepository.find();
  }

  public async create(userId: string, body: NoteDto): Promise<NoteEntity> {
    const note: Partial<NoteEntity> = {
      ...body,
      userId: userId
    };
    return this.noteRepository.save(note);
  }

  public async update(id: string, body: Partial<NoteDto>): Promise<NoteEntity> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new BadRequestException(`Note with id ${id} not found`);
    }

    Object.assign(note, body);
    return this.noteRepository.save(note);
  }

  public async delete(id: string): Promise<void> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new BadRequestException(`Note with id ${id} not found`);
    }

    await this.noteRepository.remove(note);
  }
}
