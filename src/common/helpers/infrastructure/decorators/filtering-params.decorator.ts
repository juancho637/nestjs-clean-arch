import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { FilterRuleEnum, FilteringType } from '../../domain';

export const FilteringParams = createParamDecorator(
  (data, ctx: ExecutionContext): FilteringType[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query;

    if (typeof data != 'object')
      throw new BadRequestException('Invalid filter parameter');

    const properties = data.reduce((acc, property) => {
      if (!filter[property]) return acc;
      const val = filter[property] as string;

      if (
        !val.match(
          /^(eq|neq|gt|gte|lt|lte|like|nlike|in|nin)\|[a-zA-Z0-9_,]+$/,
        ) &&
        !val.match(/^(isnull|isnotnull)$/)
      ) {
        throw new BadRequestException('Invalid filter parameter');
      }

      const [rule, value] = val.split('|');

      if (!Object.values(FilterRuleEnum).includes(rule as FilterRuleEnum))
        throw new BadRequestException(
          `Invalid filter rule: ${rule} for ${property}`,
        );

      return [...acc, { property, value, rule }];
    }, []);

    return properties;
  },
);
