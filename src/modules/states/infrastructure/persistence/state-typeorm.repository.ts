import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  getOrderTypeOrmHelper,
  getWhereTypeOrmHelper,
} from '@common/helpers/infrastructure';
import {
  FilterRuleEnum,
  FindAllFieldsDto,
  FindOneByFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import {
  LoggerProvidersEnum,
  LoggerServiceInterface,
} from '@common/adapters/logger/domain';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
import {
  StateRepositoryInterface,
  StateFilterType,
  stateErrorsCodes,
} from '../../domain';
import { StateEntity } from './state.entity';

export class StateTypeOrmRepository
  implements StateRepositoryInterface<StateEntity>
{
  private readonly context = StateTypeOrmRepository.name;

  constructor(
    @InjectRepository(StateEntity)
    readonly statesRepository: Repository<StateEntity>,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    readonly exception: ExceptionServiceInterface,
  ) {}

  async findOneBy({
    filter,
    relations,
  }: FindOneByFieldsDto<StateFilterType>): Promise<StateEntity> {
    try {
      const where = getWhereTypeOrmHelper<StateFilterType>(filter);

      const state = await this.statesRepository.findOne({
        where,
        relations: relations || [],
      });

      return state;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: stateErrorsCodes.STE010,
        context: this.context,
        error,
      });
    }
  }

  async findAll({
    pagination,
    sort,
    filters,
    relations,
  }: FindAllFieldsDto<StateFilterType> = {}): Promise<
    PaginatedResourceType<StateEntity>
  > {
    try {
      const where = getWhereTypeOrmHelper<StateFilterType>(filters);
      const order = getOrderTypeOrmHelper<StateFilterType>(sort);

      const { page = 1, size } = pagination || {};

      const skip = size && (page - 1) * size;

      const [states, count] = await this.statesRepository.findAndCount({
        where,
        order,
        relations,
        skip,
        take: size,
      });

      const lastPage = size ? Math.ceil(count / size) : 1;

      return {
        total: count,
        currentPage: page,
        lastPage,
        size: size || count,
        items: states,
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: stateErrorsCodes.STE020,
        context: this.context,
        error,
      });
    }
  }

  // async store(
  //   createStateFields: CreateStateRepositoryType | CreateStateRepositoryType[],
  // ): Promise<StateEntity | StateEntity[]> {
  //   try {
  //     if (Array.isArray(createStateFields)) {
  //       return await this.statesRepository.save(createStateFields);
  //     }

  //     return await this.statesRepository.save(createStateFields);
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: stateErrorsCodes.STE030,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }

  // async update(
  //   id: number,
  //   updateStateFields: UpdateStateType,
  // ): Promise<StateEntity> {
  //   try {
  //     const state = await this.findOneBy({
  //       filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
  //     });

  //     return await this.statesRepository.save({ ...state, ...updateStateFields });
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: stateErrorsCodes.STE040,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }

  // async delete(id: number): Promise<StateEntity> {
  //   try {
  //     const state = await this.findOneBy({
  //       filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
  //     });

  //     await this.statesRepository.softRemove(state);

  //     return { ...state, id };
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: stateErrorsCodes.STE050,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }
}
