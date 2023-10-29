import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs';
import {
  getEntityAlreadyExistsError,
  getEntityNotFoundError,
} from '../utils/get-errors';
import { JwtService } from '@nestjs/jwt';

// TODO Вынести User в отдельный модуль

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto): Promise<UserEntity> {
    const existingUser = await this.findUser(dto.email);

    if (existingUser) {
      throw new ConflictException(getEntityAlreadyExistsError('User', 'email'));
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);

    const newUser = new UserEntity({
      email: dto.email,
      passwordHash: hashedPassword,
    });

    return newUser.save();
  }

  async login(dto: AuthDto): Promise<{
    access_token: string;
  }> {
    const validUser = await this.validateUser(dto);

    const payload = {
      email: validUser.email,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  async findUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async validateUser(dto: AuthDto): Promise<Pick<UserEntity, 'email'>> {
    const user = await this.findUser(dto.email);

    if (!user) {
      throw new UnauthorizedException(
        getEntityNotFoundError('User', 'email or password'),
      );
    }

    const isCorrectPassword = await compare(dto.password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(
        getEntityNotFoundError('User', 'email or password'),
      );
    }

    return { email: user.email };
  }
}
