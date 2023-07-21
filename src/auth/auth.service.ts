import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  
  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email, true);
    if (!user) {
      throw new NotFoundException("Não foi encontrado um funcionário com o email " + email);
    }

    const password_test = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (password_test) {
      const { hashed_password, ...result } = user;
      return result;
    }
    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
