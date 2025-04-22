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
  CountryRepositoryInterface,
  CountryFilterType,
  countryErrorsCodes,
} from '../../domain';
import { CountryEntity } from './country.entity';

export class CountryTypeOrmRepository
  implements CountryRepositoryInterface<CountryEntity>
{
  private readonly context = CountryTypeOrmRepository.name;

  constructor(
    @InjectRepository(CountryEntity)
    readonly countriesRepository: Repository<CountryEntity>,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    readonly exception: ExceptionServiceInterface,
  ) {}

  async findOneBy({
    filter,
    relations,
  }: FindOneByFieldsDto<CountryFilterType>): Promise<CountryEntity> {
    try {
      const where = getWhereTypeOrmHelper<CountryFilterType>(filter);

      const country = await this.countriesRepository.findOne({
        where,
        relations: relations || [],
      });

      return country;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: countryErrorsCodes.CUT010,
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
  }: FindAllFieldsDto<CountryFilterType> = {}): Promise<
    PaginatedResourceType<CountryEntity>
  > {
    try {
      const where = getWhereTypeOrmHelper<CountryFilterType>(filters);
      const order = getOrderTypeOrmHelper<CountryFilterType>(sort);

      const { page = 1, size } = pagination || {};

      const skip = size && (page - 1) * size;

      const [countries, count] = await this.countriesRepository.findAndCount({
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
        items: countries,
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: countryErrorsCodes.CUT020,
        context: this.context,
        error,
      });
    }
  }

  // async store(
  //   createCountryFields: CreateCountryRepositoryType | CreateCountryRepositoryType[],
  // ): Promise<CountryEntity | CountryEntity[]> {
  //   try {
  //     if (Array.isArray(createCountryFields)) {
  //       return await this.countriesRepository.save(createCountryFields);
  //     }

  //     return await this.countriesRepository.save(createCountryFields);
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: countryErrorsCodes.CUT030,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }

  // async update(
  //   id: number,
  //   updateCountryFields: UpdateCountryType,
  // ): Promise<CountryEntity> {
  //   try {
  //     const country = await this.findOneBy({
  //       filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
  //     });

  //     return await this.countriesRepository.save({ ...country, ...updateCountryFields });
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: countryErrorsCodes.CUT040,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }

  // async delete(id: number): Promise<CountryEntity> {
  //   try {
  //     const country = await this.findOneBy({
  //       filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
  //     });

  //     await this.countriesRepository.softRemove(country);

  //     return { ...country, id };
  //   } catch (error) {
  //     throw this.exception.internalServerErrorException({
  //       message: countryErrorsCodes.CUT050,
  //       context: this.context,
  //       error,
  //     });
  //   }
  // }
}
