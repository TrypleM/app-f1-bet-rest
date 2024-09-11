import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    this.logger.log('Creating a new team');
    const team = this.teamRepository.create(createTeamDto);
    const savedTeam = await this.teamRepository.save(team);
    this.logger.log(`Created a new team with id ${savedTeam.id}`);
    return savedTeam;
  }

  async findAll(): Promise<Team[]> {
    this.logger.log('Finding all teams');
    const teams = await this.teamRepository.find();
    this.logger.log(`Found ${teams.length} teams`);
    return teams;
  }

  async findOne(id: string): Promise<Team> {
    this.logger.log(`Finding team with id ${id}`);
    const team = await this.teamRepository.findOneBy({ id });
    if (!team) {
      this.logger.error(`Team with id ${id} not found`);
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    this.logger.log(`Found team with id ${id}`);
    return team;
  }

  async findOneByName(name: string): Promise<Team> {
    this.logger.log(`Finding team with name ${name}`);
    const team = await this.teamRepository.findOneBy({
      name: name.toLowerCase().trim(),
    });
    if (!team) {
      this.logger.error(`Team with name ${name} not found`);
      throw new NotFoundException(`Team with name ${name} not found`);
    }
    this.logger.log(`Found team with name ${name}`);
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    this.logger.log(`Updating team with id ${id}`);
    let team = await this.findOne(id);
    if (!team) {
      this.logger.error(`Team with id ${id} not found`);
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    team = Object.assign(team, updateTeamDto);
    await this.teamRepository.save(team);
    this.logger.log(`Updated team with id ${id}`);
    return team;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing team with id ${id}`);
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      this.logger.error(`Team with id ${id} not found`);
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    this.logger.log(`Removed team with id ${id}`);
  }
}
