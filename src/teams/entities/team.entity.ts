import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  img?: string;

  @OneToMany(() => Driver, (driver) => driver.team, { eager: true })
  drivers: Driver[];

  @BeforeInsert()
  beforeInsertActions() {
    this.name = this.name.toLowerCase().trim();
  }

  @BeforeUpdate()
  beforeUpdateActions() {
    this.name = this.name.toLowerCase().trim();
  }
}
