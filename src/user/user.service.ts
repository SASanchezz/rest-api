import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "./entity/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

  public async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async findOneBy(condition: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(condition);
  }

  public async create(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.error("Error during user creation:", error);
      throw new BadRequestException("User creation failed");
    }
  }
}
