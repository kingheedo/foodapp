import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto) {
    const { email, loginType, password } = signupDto;
    try {
      const existUser = await this.userRepository.findOneBy({ email });
      if (existUser) {
        throw new NotFoundException('이미 존재하는 이메일입니다.');
      }
      const createdUser = this.userRepository.create({
        email,
        loginType,
        password,
      });

      await this.userRepository.save(createdUser);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...rest } = createdUser;

      return rest;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '회원가입 도중 오류가 발생하였습니다.',
      );
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: signInDto.email,
        },
      });
      if (!user) {
        throw new NotFoundException('유저가 존재하지 않습니다.');
      }
      if (user?.password !== signInDto.password) {
        throw new NotFoundException('비밀번호를 다시 확인해주세요.');
      }

      const payload = { id: user.id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '로그인 도중 오류가 발생하였습니다.',
      );
    }
  }

  async deleteAccont(user: Pick<User, 'id' | 'email'>) {
    try {
      await this.userRepository.delete({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '회원 탈퇴 도중 오류가 발생하였습니다.',
      );
    }
  }

  async getProfile(user: Pick<User, 'id' | 'email'>) {
    try {
      if (!user.id || !user.email) {
        throw new NotFoundException('유저 정보를 찾을 수 없습니다.');
      }
      const profile = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: user.id })
        .getOne();

      if (profile) {
        const { password, ...rest } = profile;
        return { ...rest };
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '프로필 정보를 가져오는 도중 에러가 발생하였습니다.',
      );
    }
  }
}
