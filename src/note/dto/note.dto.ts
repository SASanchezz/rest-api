import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";


export class NoteDto {
  @ApiProperty({
    description: "The title of the note",
    example: "My day",
    required: true,
    maxLength: 255,
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: "The content of the note",
    example: "Today was a good day.",
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(10000)
  readonly content: string;
}
