import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginDTO) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      return {
        status: 400,
        response: { message: 'Invalid email or password' },
      };
    }

    const match = compareSync(dto.password, user.password);

    if (!match) {
      return {
        status: 400,
        response: { message: 'Invalid email or password' },
      };
    }

    const token = this.jwtService.sign({ id: user.id }, { expiresIn: '1d' });

    return {
      status: 200,
      response: { message: 'Login successful', token, user },
    };
  }
}
