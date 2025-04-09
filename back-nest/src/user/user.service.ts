import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new NotFoundException('유저가 존재하지 않습니다.');
      }
      return user;
    } catch {
      throw new InternalServerErrorException(
        '유저 정보를 찾는중 에러가 발생하였습니다.',
      );
    }
  }
}
