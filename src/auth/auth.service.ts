import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = this.userService.findOneByEmail(email, true);
    if (!user) {
      throw new NotFoundException("Não foi encontrado um funcionário com o email " + email);
    }

    const password_test = bcrypt.compare(
      password,
      user.hashed_password
    );

    if (password_test) {
      const { hashed_password, ...result}
    }
  }
}
