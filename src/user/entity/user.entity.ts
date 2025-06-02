import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "users" })
@Unique(["email"])
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 255, unique: true })
  readonly email: string;

  @Column({ type: "varchar", length: 255 })
  readonly password: string;
}
