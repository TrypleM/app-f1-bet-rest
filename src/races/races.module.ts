import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { Race } from './entities/race.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RacesController],
  providers: [RacesService],
  imports: [TypeOrmModule.forFeature([Race])],
})
export class RacesModule {}
