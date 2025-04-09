import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @UseGuards(AuthGuard)
  @Get()
  getFavoritePosts(@User('id') id: number) {
    return this.favoriteService.getFavoritePosts(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateFavoritePost(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.favoriteService.updateFavoritePost({ userId, id });
  }
}
