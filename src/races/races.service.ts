import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './entities/race.entity';

@Injectable()
export class RacesService {
  private readonly logger = new Logger(RacesService.name);

  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {}

  async create(createRaceDto: CreateRaceDto): Promise<Race> {
    this.logger.log('Creating a new race');
    const race = this.raceRepository.create(createRaceDto);
    const savedRace = await this.raceRepository.save(race);
    this.logger.log(`Created a new race with id ${savedRace.id}`);
    return savedRace;
  }

  async findAll(): Promise<Race[]> {
    this.logger.log('Finding all races');
    const races = await this.raceRepository.find();
    this.logger.log(`Found ${races.length} races`);
    return races;
  }

  async findOne(id: string): Promise<Race> {
    this.logger.log(`Finding race with id ${id}`);
    const race = await this.raceRepository.findOneBy({ id });
    if (!race) {
      this.logger.error(`Race with id ${id} not found`);
      throw new NotFoundException(`Race with id ${id} not found`);
    }
    this.logger.log(`Found race with id ${id}`);
    return race;
  }

  async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    this.logger.log(`Updating race with id ${id}`);
    const race = await this.raceRepository.preload({
      id,
      ...updateRaceDto,
    });
    if (!race) {
      this.logger.error(`Race with id ${id} not found`);
      throw new NotFoundException(`Race with id ${id} not found`);
    }
    const updatedRace = await this.raceRepository.save(race);
    this.logger.log(`Updated race with id ${id}`);
    return updatedRace;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing race with id ${id}`);
    const race = await this.raceRepository.findOneBy({ id });
    if (!race) {
      this.logger.error(`Race with id ${id} not found`);
      throw new NotFoundException(`Race with id ${id} not found`);
    }
    await this.raceRepository.remove(race);
    this.logger.log(`Removed race with id ${id}`);
  }
}
