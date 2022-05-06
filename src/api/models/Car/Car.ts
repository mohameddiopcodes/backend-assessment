import {
  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("Car")
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
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

  @Column()
    value: number;

  @Column()
    mileage: number;

  @Column()
    fuel: string;

  @Column()
    doors: number;

  @Column()
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

  @DeleteDateColumn()
    deletedDate: Date;
}