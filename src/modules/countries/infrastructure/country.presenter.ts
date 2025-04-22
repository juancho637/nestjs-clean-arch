import { CountryType } from '../domain';

export class CountryPresenter {
  id: number;
  name: string;
  iso_code: string;
  phone_code: string;
  flag: string;

  constructor(country: CountryType) {
    this.id = country.id;
    this.name = country.name;
    this.iso_code = country.isoCode;
    this.phone_code = country.phoneCode;
    this.flag = country.flag;
  }
}
