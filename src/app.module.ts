import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { TeamsModule } from './teams/teams.module';
import { RacesModule } from './races/races.module';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './drivers/entities/driver.entity';
import { Team } from './teams/entities/team.entity';
import { User } from './users/entities/user.entity';
import { Race } from './races/entities/race.entity';
import { GameModule } from './game/game.module';
import { Game } from './game/entities/game.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    DriversModule,
    TeamsModule,
    RacesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: 'f1-bet',
      password: 'D11235813B.',
      database: 'postgres-f1-db',
      entities: [Driver, Team, User, Race, Game],
      synchronize: process.env.ENV === 'DES' ? true : false,
    }),
    GameModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
