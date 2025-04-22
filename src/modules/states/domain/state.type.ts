import { CountryType } from '@modules/countries/domain';

export type StateType = {
  id: number;
  name: string;
  country: CountryType;
  status: string;
};
