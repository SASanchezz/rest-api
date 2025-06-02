import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { CryptService } from "src/crypt/crypt.service";

import { UserEntity } from "./entity/user.entity";
import { AuthDto } from "./dto/auth.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
    
    @InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

  public async signup(body: AuthDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({ email: body.email });
    if (!!existingUser) {
      throw new BadRequestException("User with this email already exists");
    }

    const user: UserEntity = {
      email: body.email,
      password: await this.cryptService.hashPassword(body.password),
    }

    return {... await this.trySaveUser(user), password: undefined};
  }

  public async login(body: AuthDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    const isPasswordValid = await this.cryptService.comparePassword(user.password, body.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);
    /**
     * @TODO Implement refresh token logic
     */

    return { accessToken };
  }

  private trySaveUser(body: AuthDto): Promise<UserEntity> {
    try {
      return this.userRepository.save(body);
    } catch (error) {
      console.error("Error during signup:", error);
      throw new BadRequestException("Signup failed");
    }
  }
}
