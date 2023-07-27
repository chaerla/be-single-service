import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../core/entitites/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async comparePassword(password: string, user: User): Promise<boolean> {
    const isMatch = await compare(password, user.password);
    return isMatch;
  }
}
