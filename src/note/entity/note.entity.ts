import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "notes" })
export class NoteEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  
  @Column("uuid")
  readonly userId: string;

  @Column({ type: "varchar", length: 255 })
  readonly title: string;

  @Column({ type: "text" })
  readonly content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  readonly createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  readonly updatedAt: Date;
}
