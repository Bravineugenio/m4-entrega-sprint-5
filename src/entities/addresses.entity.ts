import { Entity, Column, PrimaryColumn, DeleteDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Addresses {
  
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  zipCode: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
