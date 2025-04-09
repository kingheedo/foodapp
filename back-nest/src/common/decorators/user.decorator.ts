import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User as UserEntity } from 'src/user/user.entity';

interface AuthRequest extends Request {
  user: Pick<UserEntity, 'id' | 'email'>;
}

export const User = createParamDecorator(
  (data: keyof Pick<UserEntity, 'id' | 'email'>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
