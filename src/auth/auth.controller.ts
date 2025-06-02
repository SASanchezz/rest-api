import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/auth.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post("signup")
  signup(@Body() body: AuthDto): Promise<AuthDto> {
    return this.authService.signup(body);
  }

  @Post("login")
  login(@Body() body: AuthDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }
}
