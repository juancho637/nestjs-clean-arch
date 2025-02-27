import { AuthUserType } from '@modules/auth/domain';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetAuthUser = createParamDecorator(
  (data, ctx: ExecutionContext): AuthUserType => {
    const request = ctx.switchToHttp().getRequest();
    const userInfo = request.user;

    if (!userInfo) {
      throw new Error('User not found');
    }

    return userInfo;
  },
);
