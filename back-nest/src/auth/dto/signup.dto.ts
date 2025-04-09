import { IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  email: string;

  @IsString()
  loginType: 'email' | 'kakao';

  @IsString()
  password: string;
}
