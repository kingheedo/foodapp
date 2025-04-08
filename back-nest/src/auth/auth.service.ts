import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException('비밀번호를 다시 확인해주세요.');
    }

    const payload = { userId: user.userId, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
