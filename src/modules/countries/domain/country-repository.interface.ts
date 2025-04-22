import {
  FindAllFieldsDto,
  FindOneByFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { CountryType } from './country.type';
// import { UpdateCountryType } from './update-country.type';
import { CountryFilterType } from './country-filter.type';
// import { CreateCountryRepositoryType } from './create-country-repository.type';

export interface CountryRepositoryInterface<
  Entity extends CountryType = CountryType,
> {
  findOneBy(
    findOneByFieldsDto: FindOneByFieldsDto<CountryFilterType>,
  ): Promise<Entity>;
  findAll(
    findAllFieldsDto?: FindAllFieldsDto<CountryFilterType>,
  ): Promise<PaginatedResourceType<Entity>>;
  // store(
  //   createCountryFields: CreateCountryRepositoryType | CreateCountryRepositoryType[],
  // ): Promise<Entity | Entity[]>;
  // update(id: number, updateCountryFields: UpdateCountryType): Promise<Entity>;
  // delete(id: number): Promise<Entity>;
}
