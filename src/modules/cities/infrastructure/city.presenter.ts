import { CityType } from '../domain';

export class CityPresenter {
  id: number;
  name: string;
  status: string;

  constructor(city: CityType) {
    this.id = city.id;
    this.name = city.name;
    this.status = city.status;
  }
}
