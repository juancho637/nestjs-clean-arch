import { FilterRuleEnum } from '../enums';

export type FilteringType<T> = {
  property: keyof T;
  rule: FilterRuleEnum;
  value?: unknown;
};
