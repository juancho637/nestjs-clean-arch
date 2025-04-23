import { StateType } from '@modules/states/domain';

export type CityType = {
  id: number;
  name: string;
  state: StateType;
  status: string;
};
