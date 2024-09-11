import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const hasedPassword = await hash(password, 10);
    const role = 'player';

    const user = await this.userRepository.save({
      ...userObject,
      password: hasedPassword,
      role,
    });
    return user;
  }

  async login(userObject: RegisterAuthDto) {
    const user = await this.userRepository.findOne(userObject.email);
    return user;
  }
}
