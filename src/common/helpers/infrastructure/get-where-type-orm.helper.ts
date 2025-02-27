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

export const getWhereTypeOrmHelper = <T>(
  filters: FilteringType<T>[] | FilteringType<T>,
) => {
  if (!filters) return {};

  return Array.isArray(filters)
    ? filters.map((filter) => {
        return getValidFilter<T>(filter);
      })
    : getValidFilter<T>(filters);
};

const getValidFilter = <T>(filter: FilteringType<T>) => {
  const { property, rule, value } = filter;
  const propertyString = property as string;
  const ruleString = rule.toString();

  const filterFunction = filterMap[ruleString];
  if (filterFunction) {
    return filterFunction(propertyString, value);
  }
};

const filterMap = {
  [FilterRuleEnum.IS_NULL]: (property: string) => ({ [property]: IsNull() }),
  [FilterRuleEnum.IS_NOT_NULL]: (property: string) => ({
    [property]: Not(IsNull()),
  }),
  [FilterRuleEnum.EQUALS]: (property: string, value: unknown) => ({
    [property]: value,
  }),
  [FilterRuleEnum.NOT_EQUALS]: (property: string, value: unknown) => ({
    [property]: Not(value),
  }),
  [FilterRuleEnum.GREATER_THAN]: (property: string, value: unknown) => ({
    [property]: MoreThan(value),
  }),
  [FilterRuleEnum.GREATER_THAN_OR_EQUALS]: (
    property: string,
    value: unknown,
  ) => ({
    [property]: MoreThanOrEqual(value),
  }),
  [FilterRuleEnum.LESS_THAN]: (property: string, value: unknown) => ({
    [property]: LessThan(value),
  }),
  [FilterRuleEnum.LESS_THAN_OR_EQUALS]: (property: string, value: unknown) => ({
    [property]: LessThanOrEqual(value),
  }),
  [FilterRuleEnum.LIKE]: (property: string, value: unknown) => ({
    [property]: ILike(`%${value}%`),
  }),
  [FilterRuleEnum.NOT_LIKE]: (property: string, value: unknown) => ({
    [property]: Not(ILike(`%${value}%`)),
  }),
  [FilterRuleEnum.IN]: (property: string, value: unknown) => ({
    [property]: In((value as string).split(',')),
  }),
  [FilterRuleEnum.NOT_IN]: (property: string, value: unknown) => ({
    [property]: Not(In((value as string).split(','))),
  }),
};
