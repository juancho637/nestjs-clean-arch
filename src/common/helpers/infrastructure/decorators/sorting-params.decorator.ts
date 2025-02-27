import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
// import { SortingType } from '../../domain';

export const SortingParams = <T>(
  ...validParams: (keyof T)[]
): ParameterDecorator => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    // if (typeof validParams != 'object')
    //   throw new BadRequestException('Invalid sort parameter');

    const sortPattern = /^([a-zA-Z0-9]+)\|(asc|desc)$/;

    if (!sort.match(sortPattern))
      throw new BadRequestException('Invalid sort parameter');

    const [property, direction] = sort.split('|');

    if (!validParams.find((key) => key === property))
      throw new BadRequestException(`Invalid sort property: ${property}`);

    return { property, direction };
  })();
};

// export const SortingParams = createParamDecorator(
//   <T>(validParams: (keyof T)[], ctx: ExecutionContext): SortingType => {
//     const req: Request = ctx.switchToHttp().getRequest();
//     const sort = req.query.sort as string;
//     if (!sort) return null;

//     // if (typeof validParams != 'object')
//     //   throw new BadRequestException('Invalid sort parameter');

//     const sortPattern = /^([a-zA-Z0-9]+)\|(asc|desc)$/;

//     if (!sort.match(sortPattern))
//       throw new BadRequestException('Invalid sort parameter');

//     const [property, direction] = sort.split('|');

//     if (!validParams.find((key) => key === property))
//       throw new BadRequestException(`Invalid sort property: ${property}`);

//     return { property, direction };
//   },
// );
