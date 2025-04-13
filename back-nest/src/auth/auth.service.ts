import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: AuthDto) {
    const { email, password } = signupDto;
    try {
      const existUser = await this.userRepository.findOneBy({ email });
      if (existUser) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = this.userRepository.create({
        email,
        loginType: 'email',
        password: hashedPassword,
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

  async getTokens(payload: { id: number }) {
    try {
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXIPIRE'),
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXIPIRE'),
        }),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '토큰 발급 중 오류가 발생하였습니다.',
      );
    }
  }

  async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.userRepository.update(id, {
      hashedRefreshToken,
    });
  }

  async signin(signInDto: AuthDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: signInDto.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('이메일을 다시 확인해주세요.');
      }

      const isValidate = await bcrypt.compare(
        signInDto.password,
        user.password,
      );
      if (!isValidate) {
        throw new UnauthorizedException('비밀번호를 다시 확인해주세요.');
      }

      const payload = { id: user.id };

      const tokens = await this.getTokens(payload);
      await this.updateHashedRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '로그인 도중 오류가 발생하였습니다.',
      );
    }
  }

  async refreshToken(user: User) {
    try {
      const payload = { id: user.id, email: user.email };

      const tokens = await this.getTokens(payload);
      await this.updateHashedRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '토큰 재발급 중 오류가 발생하였습니다.',
      );
    }
  }

  async deleteAccont(user: User) {
    try {
      await this.userRepository.delete({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '회원 탈퇴 도중 오류가 발생하였습니다.',
      );
    }
  }

  async getProfile(user: User) {
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
