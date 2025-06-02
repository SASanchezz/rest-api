import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn({ type: "varchar", length: 255, unique: true })
  readonly email: string;

  @Column({ type: "varchar", length: 255 })
  readonly password: string;
}
