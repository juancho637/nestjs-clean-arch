import {
  FindAllFieldsDto,
  FindOneByFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { CityType } from './city.type';
// import { UpdateCityType } from './update-city.type';
import { CityFilterType } from './city-filter.type';
// import { CreateCityRepositoryType } from './create-city-repository.type';

export interface CityRepositoryInterface<Entity extends CityType = CityType> {
  findOneBy(
    findOneByFieldsDto: FindOneByFieldsDto<CityFilterType>,
  ): Promise<Entity>;
  findAll(
    findAllFieldsDto?: FindAllFieldsDto<CityFilterType>,
  ): Promise<PaginatedResourceType<Entity>>;
  // store(
  //   createCityFields: CreateCityRepositoryType | CreateCityRepositoryType[],
  // ): Promise<Entity | Entity[]>;
  // update(id: number, updateCityFields: UpdateCityType): Promise<Entity>;
  // delete(id: number): Promise<Entity>;
}
