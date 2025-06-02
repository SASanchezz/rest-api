import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthDto } from "./dto/auth.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post("signup")
  signup(@Body() body: AuthDto): Promise<AuthDto> {
    return this.userService.signup(body);
  }

  @Post("login")
  login(@Body() body: AuthDto): Promise<LoginResponseDto> {
    return this.userService.login(body);
  }
}
