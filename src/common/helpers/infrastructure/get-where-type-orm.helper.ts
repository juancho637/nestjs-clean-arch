import {
  IsNull,
  MoreThan,
  MoreThanOrEqual,
  Not,
  LessThan,
  LessThanOrEqual,
  ILike,
  In,
} from 'typeorm';
import { FilterRuleEnum, FilteringType } from '../domain';

export const getWhereTypeOrmHelper = (filters: FilteringType[]) => {
  if (!filters) return {};

  return filters.map((filter) => {
    if (filter.rule == FilterRuleEnum.IS_NULL)
      return { [filter.property]: IsNull() };

    if (filter.rule == FilterRuleEnum.IS_NOT_NULL)
      return { [filter.property]: Not(IsNull()) };

    if (filter.rule == FilterRuleEnum.EQUALS)
      return { [filter.property]: filter.value };

    if (filter.rule == FilterRuleEnum.NOT_EQUALS)
      return { [filter.property]: Not(filter.value) };

    if (filter.rule == FilterRuleEnum.GREATER_THAN)
      return { [filter.property]: MoreThan(filter.value) };

    if (filter.rule == FilterRuleEnum.GREATER_THAN_OR_EQUALS)
      return { [filter.property]: MoreThanOrEqual(filter.value) };

    if (filter.rule == FilterRuleEnum.LESS_THAN)
      return { [filter.property]: LessThan(filter.value) };

    if (filter.rule == FilterRuleEnum.LESS_THAN_OR_EQUALS)
      return { [filter.property]: LessThanOrEqual(filter.value) };

    if (filter.rule == FilterRuleEnum.LIKE)
      return { [filter.property]: ILike(`%${filter.value}%`) };

    if (filter.rule == FilterRuleEnum.NOT_LIKE)
      return { [filter.property]: Not(ILike(`%${filter.value}%`)) };

    if (filter.rule == FilterRuleEnum.IN)
      return { [filter.property]: In(filter.value.split(',')) };

    if (filter.rule == FilterRuleEnum.NOT_IN)
      return { [filter.property]: Not(In(filter.value.split(','))) };
  });
};
