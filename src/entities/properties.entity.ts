import {
  Entity,
  Column,
  PrimaryColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./addresses.entity";
import { Categories } from "./category.entity";
import { Schedules } from "./schedules.entity";

@Entity()
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({
    nullable: false,
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  value: number;

  @Column({ nullable: false })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedules, (Schedules) => Schedules.id)
  schedule: Schedules;

  @ManyToOne((type) => Categories, (Categories) => Categories.id)
  @JoinColumn()
  category: Categories;

  @OneToOne((type) => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
