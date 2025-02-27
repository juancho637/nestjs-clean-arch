import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { FilterRuleEnum } from '../../domain';

export const FilteringParams = <T>(
  ...validParams: (keyof T)[]
): ParameterDecorator => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query;
    const properties = validParams.reduce((acc, property) => {
      if (!(filter[property] as string)) return acc;

      const val = filter[property] as string;
      const [rule, value] = val.split('|');

      if (!Object.values(FilterRuleEnum).includes(rule as FilterRuleEnum))
        throw new BadRequestException(
          `Invalid filter rule: ${rule} for ${val}`,
        );

      return [...acc, { property, rule, value }];
    }, []);

    return properties;
  })();
};
