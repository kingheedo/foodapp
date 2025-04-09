import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@User() user: Pick<UserEntity, 'id' | 'email'>) {
    return this.authService.getProfile(user);
  }

  @UseGuards(AuthGuard)
  @Delete('/me')
  deleteAccount(@User() user: Pick<UserEntity, 'id' | 'email'>) {
    return this.authService.deleteAccont(user);
  }
}
