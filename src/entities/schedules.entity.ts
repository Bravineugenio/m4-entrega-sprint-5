import {
  Entity,
  Column,
  PrimaryColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedules {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ type: "timestamp", nullable: false })
  hour: Date;

  @ManyToOne((type) => Properties, {
    eager:true
  })
  @JoinColumn()
  property: Properties;

  @ManyToOne((type) => User, {
    eager:true
  })
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
