import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Image]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
