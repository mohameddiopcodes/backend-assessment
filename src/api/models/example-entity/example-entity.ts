import {
  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("TableNameForExampleEntity")
export class ExampleEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    year: number;

  @Column()
    make: string;

  @Column()
    model: string;

  @Column()
    licensePlate: number;

  @Column()
    registration: number;

  @Column()
    registrationState: string;

  @Column()
    registrationExpiration: string;

  @Column()
    nameOnRegistration: string;

  @Column()
    vin: number;

  @Column()
    value: number;

  @Column()
    mileage: number;

  @Column()
    description: string;

  @Column()
    color: string;

  @CreateDateColumn()
    createdDate: Date;

  @UpdateDateColumn()
    updatedDate: Date;

  @DeleteDateColumn()
    deletedDate: Date;
}
