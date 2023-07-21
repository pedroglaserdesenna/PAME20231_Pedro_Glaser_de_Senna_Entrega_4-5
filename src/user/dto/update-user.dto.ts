import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    hashed_password: string
}
