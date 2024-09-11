import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  birthday: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(() => Team, (team) => team.drivers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  team: Team;

  @BeforeInsert()
  beforeInsertActions() {
    this.name = this.name.toLowerCase().trim();
  }

  @BeforeUpdate()
  beforeUpdateActions() {
    this.name = this.name.toLowerCase().trim();
  }
}
