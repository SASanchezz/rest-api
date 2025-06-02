import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, NotContains } from "class-validator";


export class AuthDto {
  @ApiProperty({
    description: "The email address of the user",
    example: "example@gmail.com",
    required: true,
    maxLength: 255,
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password-example",
    required: true,
    maxLength: 32,
  })
  @IsNotEmpty()
  @MaxLength(32)
  @NotContains(" ")
  readonly password: string;
}
