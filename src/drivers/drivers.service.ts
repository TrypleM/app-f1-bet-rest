import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { DriverResponseDto } from './dto/driver-response.dto';
import { DriverMapper } from './mapper/driver.mapper';

@Injectable()
export class DriversService {
  private readonly logger = new Logger(DriversService.name);

  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly teamsService: TeamsService,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<DriverResponseDto> {
    this.logger.log('Creating a new driver');
    try {
      const team = await this.teamsService.findOneByName(
        createDriverDto.team.toLowerCase().trim(),
      );
      const driver = this.driverRepository.create({
        ...createDriverDto,
        team,
      });
      await this.driverRepository.save(driver);
      const driverResponse = DriverMapper.toResponseDto(driver);
      return driverResponse;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<DriverResponseDto[]> {
    this.logger.log('Find all drivers');
    const drivers = await this.driverRepository.find({ relations: ['team'] });
    const driversResponse = drivers.map((driver) =>
      DriverMapper.toResponseDto(driver),
    );
    return driversResponse;
  }

  async findOne(id: string): Promise<DriverResponseDto> {
    this.logger.log('Find one driver');
    try {
      const driver = await this.driverRepository.findOne({
        where: { id },
        relations: ['team'],
      });
      if (!driver) {
        throw new NotFoundException(`Driver with id ${id} not found`);
      }
      const driverResponse = DriverMapper.toResponseDto(driver);
      return driverResponse;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(
    id: string,
    updateDriverDto: UpdateDriverDto,
  ): Promise<DriverResponseDto> {
    const driverDto = this.removeUndefinedProperties(updateDriverDto);
    if (updateDriverDto.team) {
      driverDto.team = await this.teamsService.findOneByName(
        updateDriverDto.team,
      );
    }
    const driver = await this.driverRepository.preload({
      id,
      ...driverDto,
    });
    if (!driver) {
      const message = `Driver with id ${id} not found`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    await this.driverRepository.save(driver);
    const driverResponse = this.findOne(driver.id);
    return driverResponse;
  }

  async remove(id: string): Promise<void> {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      const message = `Driver with id ${id} not found`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    await this.driverRepository.remove(driver);
  }

  private removeUndefinedProperties(obj: any): any {
    return Object.entries(obj).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {},
    );
  }
}
