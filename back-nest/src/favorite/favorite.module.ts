import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Post } from 'src/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Post])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
