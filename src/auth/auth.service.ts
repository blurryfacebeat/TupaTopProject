import { ConflictException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { getEntityAlreadyExistsError } from '../utils/get-errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: AuthDto) {
    const { email, password } = dto;

    const existingUser = await this.findUser(email);

    if (existingUser) {
      throw new ConflictException(getEntityAlreadyExistsError('User', 'email'));
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const newUser = new UserEntity({
      email,
      passwordHash: hashedPassword,
    });

    return await newUser.save();
  }

  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
