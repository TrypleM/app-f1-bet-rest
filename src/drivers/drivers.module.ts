import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TeamsModule } from '../teams/teams.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [TypeOrmModule.forFeature([Driver]), TeamsModule],
})
export class DriversModule {}
