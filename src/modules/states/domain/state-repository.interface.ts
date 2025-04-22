import {
  FindAllFieldsDto,
  FindOneByFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { StateType } from './state.type';
// import { UpdateStateType } from './update-state.type';
import { StateFilterType } from './state-filter.type';
// import { CreateStateRepositoryType } from './create-state-repository.type';

export interface StateRepositoryInterface<
  Entity extends StateType = StateType,
> {
  findOneBy(
    findOneByFieldsDto: FindOneByFieldsDto<StateFilterType>,
  ): Promise<Entity>;
  findAll(
    findAllFieldsDto?: FindAllFieldsDto<StateFilterType>,
  ): Promise<PaginatedResourceType<Entity>>;
  // store(
  //   createStateFields: CreateStateRepositoryType | CreateStateRepositoryType[],
  // ): Promise<Entity | Entity[]>;
  // update(id: number, updateStateFields: UpdateStateType): Promise<Entity>;
  // delete(id: number): Promise<Entity>;
}
