import { Entity, Column, PrimaryColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Schedules } from "./schedules.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(()=>Schedules, (Schedules)=> Schedules.user)
  schedule: Schedules

  @DeleteDateColumn()
  Deleted: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
