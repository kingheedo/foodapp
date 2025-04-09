import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async getFavoritePosts(id: number) {
    try {
      if (!id) {
        throw new NotFoundException('아이디가 존재하지 않습니다.');
      }
      return await this.favoriteRepository
        .createQueryBuilder('favorite')
        .where('favorite.userId = :userId', { userId: id })
        .getMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'favorite posts를 가져오는 중 오류가 발생하였습니다.',
      );
    }
  }

  async updateFavoritePost({ userId, id }: { userId: number; id: number }) {
    try {
      const existFavorite = await this.favoriteRepository.findOne({
        where: {
          postId: id,
        },
      });
      if (existFavorite) {
        await this.favoriteRepository.delete({
          postId: id,
        });
      } else {
        const craeteFavorite = this.favoriteRepository.create({
          postId: id,
          userId,
        });
        await this.favoriteRepository.save(craeteFavorite);
        return craeteFavorite;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '즐겨찾기 추가 중 오류가 발생하였습니다.',
      );
    }
  }
}
