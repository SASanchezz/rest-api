import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { CryptService } from "src/crypt/crypt.service";

import { AuthDto } from "./dto/auth.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayload } from "../jwt/jwt-payload.type";
import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
		private readonly userService: UserService,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
	) {}

  public async signup(body: AuthDto): Promise<UserEntity> {
    const existingUser = await this.userService.findOneBy({ email: body.email });
    if (!!existingUser) {
      throw new BadRequestException("User with this email already exists");
    }

    const user: Partial<UserEntity> = {
      email: body.email,
      password: await this.cryptService.hashPassword(body.password),
    }

    return {... await this.trySaveUser(user), password: undefined};
  }

  public async login(body: AuthDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneBy({ email: body.email });
    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    const isPasswordValid = await this.cryptService.comparePassword(user.password, body.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email
    };
    const accessToken = this.jwtService.sign(payload);
    /**
     * @TODO Implement refresh token logic
     */

    return { accessToken };
  }

  private trySaveUser(body: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return this.userService.create(body);
    } catch (error) {
      console.error("Error during signup:", error);
      throw new BadRequestException("Signup failed");
    }
  }
}
