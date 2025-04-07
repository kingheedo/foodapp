import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';
import { Image } from 'src/image/image.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  getPosts(page: number) {
    const perPage = 10;
    const offset = (page - 1) * perPage;

    try {
      return this.postRepository
        .createQueryBuilder('post')
        .orderBy('post.date', 'DESC')
        .take(perPage)
        .skip(offset)
        .getMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소들을 조회중 에러가 발생하였습니다.',
      );
    }
  }

  async getPostById(id: number) {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      return post;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소 조회 중 에러가 발생하였습니다.',
      );
    }
  }

  async getAllMarkers() {
    try {
      const markers = await this.postRepository
        .createQueryBuilder('post')
        .select([
          'post.id',
          'post.latitude',
          'post.longitude',
          'post.color',
          'post.score',
        ])
        .getMany();

      return markers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '마커 조회중 오류가 발생하였습니다.',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto) {
    const {
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
      imageUris,
    } = createPostDto;

    const post = this.postRepository.create({
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
    });

    const images = imageUris.map((uri) => this.imageRepository.create(uri));
    post.images = images;
    try {
      await this.postRepository.save(post);
      await this.imageRepository.save(images);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하는 도중 에러가 발생하였습니다.',
      );
    }

    return post;
  }

  async updatePost(
    id: number,
    updatePostDto: Omit<UpdatePostDto, 'latitude' | 'longitude' | 'address'>,
  ) {
    try {
      const existPost = await this.postRepository
        .createQueryBuilder('post')
        .where('post.id = :id', { id })
        .getOne();

      if (!existPost) {
        throw new NotFoundException('장소가 존재하지 않습니다.');
      }

      const { imageUris, ...rest } = updatePostDto;
      await this.postRepository
        .createQueryBuilder()
        .update(Post)
        .set({ ...rest })
        .where('id = :id', { id })
        .execute();

      const images = imageUris?.map((uri) => this.imageRepository.create(uri));
      if (images && images?.length > 0) {
        await this.imageRepository.save(images);
      }
      const updatedPost = await this.postRepository.findOne({
        where: {
          id,
        },
        relations: ['images'],
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 수정하는 도중 에러가 발생하였습니다.',
      );
    }
  }

  async deletePost(id: number) {
    try {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .delete()
        .where('post.id = :id', { id })
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      return id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 삭제하는 도중 에러가 발생하였습니다.',
      );
    }
  }
}
