import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  create(createUserDto: CreateUserDto) {
    const hashed_password = this.hashp(createUserDto.password);
    delete createUserDto.password;

    const newUser = this.userRepository.create({
      hashed_password: hashed_password,
      ...createUserDto
    });
    return this.userRepository.save(newUser)
  }

  findOneByEmail(email: string, showPassword = false): Promise<User> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (showPassword) {
      query.addSelect('user.hashed_password');
    }

    return query.getOne()
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update({id}, {...updateUserDto});
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async hashp(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
