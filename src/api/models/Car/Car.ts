import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Length, Max, Min } from "class-validator";

@Entity("Car")
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
  @Length(4)
    year: string;

  @Column()
    make: string;

  @Column()
    model: string;

  @Column()
    licensePlate: string;

  @Column()
    registration: string;

  @Column()
    registrationState: string;

  @Column({
    type: "timestamp"
  })
    registrationExpiration: Date;

  @Column()
    nameOnRegistration: string;

  @Column()
    vin: string;

  @Min(0)
  @Max(1000000)
  @Column()
    value: number;

  @Min(0)
  @Max(1000000)@Column()
    mileage: number;

  @Column()
    fuel: string;

  @Min(0)
  @Max(5)
  @Column({
    nullable: true
  })
    doors: number;

  @Min(0)
  @Max(11)
  @Column({
    nullable: true
  })
    seats: number;

  @Column()
    description: string;

  @Column()
    color: string;

  @Column()
    type: string;

  @CreateDateColumn()
    createdDate: Date;

  @UpdateDateColumn()
    updatedDate: Date;
}