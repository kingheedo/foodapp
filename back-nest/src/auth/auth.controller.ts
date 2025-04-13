import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { User } from 'src/user/user.entity';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) signupDto: AuthDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: AuthDto) {
    return this.authService.signin(signInDto);
  }
  @UseGuards(AuthGuard)
  @Get('/refresh')
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@GetUser() user: User) {
    return this.authService.getProfile(user);
  }

  @UseGuards(AuthGuard)
  @Delete('/me')
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccont(user);
  }
}
