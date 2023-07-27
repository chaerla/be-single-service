import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../core/dtos/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginInfo: LoginDTO): Promise<any> {
    const user = await this.userService.findOne(loginInfo.username);
    if (!user) {
      throw new NotFoundException(
        `No user with username ${loginInfo.username} was found`,
      );
    }
    const isMatch = await this.userService.comparePassword(
      loginInfo.password,
      user,
    );
    delete user.password;
    delete user.id;
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, name: user.name };
    return {
      user: user,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
