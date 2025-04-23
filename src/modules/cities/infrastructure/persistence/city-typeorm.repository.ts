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
  CityRepositoryInterface,
  CityFilterType,
  cityErrorsCodes,
} from '../../domain';
import { CityEntity } from './city.entity';

export class CityTypeOrmRepository
  implements CityRepositoryInterface<CityEntity>
{
  private readonly context = CityTypeOrmRepository.name;

  constructor(
    @InjectRepository(CityEntity)
    readonly citiesRepository: Repository<CityEntity>,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    readonly exception: ExceptionServiceInterface,
  ) {}

  async findOneBy({
    filter,
    relations,
  }: FindOneByFieldsDto<CityFilterType>): Promise<CityEntity> {
    try {
      const where = getWhereTypeOrmHelper<CityFilterType>(filter);

      const city = await this.citiesRepository.findOne({
        where,
        relations: relations || [],
      });

      return city;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: cityErrorsCodes.CIT010,
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
  }: FindAllFieldsDto<CityFilterType> = {}): Promise<
    PaginatedResourceType<CityEntity>
  > {
    try {
      const where = getWhereTypeOrmHelper<CityFilterType>(filters);
      const order = getOrderTypeOrmHelper<CityFilterType>(sort);

      const { page = 1, size } = pagination || {};

      const skip = size && (page - 1) * size;

      const [cities, count] = await this.citiesRepository.findAndCount({
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
        items: cities,
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: cityErrorsCodes.CIT020,
        context: this.context,
        error,
      });
    }
  }

  // async store(
  //   createCityFields: CreateCityRepositoryType | CreateCityRepositoryType[],
  // ): Promise<CityEntity | CityEntity[]> {
  //   try {
  //     if (Array.isArray(createCityFields)) {
  //       return await this.citiesRepository.save(createCityFields);
  //     }

  //     return await this.citiesRepository.save(createCityFields);
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: cityErrorsCodes.CIT030,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }

  // async update(
  //   id: number,
  //   updateCityFields: UpdateCityType,
  // ): Promise<CityEntity> {
  //   try {
  //     const city = await this.findOneBy({
  //       filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
  //     });

  //     return await this.citiesRepository.save({ ...city, ...updateCityFields });
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: cityErrorsCodes.CIT040,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }

  // async delete(id: number): Promise<CityEntity> {
  //   try {
  //     const city = await this.findOneBy({
  //       filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
  //     });

  //     await this.citiesRepository.softRemove(city);

  //     return { ...city, id };
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: cityErrorsCodes.CIT050,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }
}
