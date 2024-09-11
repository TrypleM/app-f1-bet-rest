import { Driver } from '../entities/driver.entity';
import { DriverResponseDto } from '../dto/driver-response.dto';

export class DriverMapper {
  static toResponseDto(driver: Driver): DriverResponseDto {
    return {
      ...driver,
      team: {
        id: driver.team.id,
        name: driver.team.name,
        img: driver.team.img,
      },
    };
  }
}
