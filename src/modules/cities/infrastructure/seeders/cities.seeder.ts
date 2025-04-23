// src/modules/cities/infrastructure/seeders/cities.seeder.ts

import { DataSource } from 'typeorm';
import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { StateEntity } from '@modules/states/infrastructure';
import { CityStatusesEnum } from '@modules/cities/domain';
import { CityEntity } from '../persistence/city.entity';

interface CityCsvRow {
  id: string;
  name: string;
  state_id: string;
}

type CityInsertInput = {
  id: number;
  name: string;
  status: CityStatusesEnum;
  state: Omit<StateEntity, 'name' | 'status' | 'country' | 'cities'>;
};

export class CitiesSeeder {
  private readonly context = CitiesSeeder.name;

  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: LoggerServiceInterface,
  ) {}

  async seed(): Promise<void> {
    const filePath = __dirname + '/cities-data.csv';
    const batchSize = 500;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let batch: CityInsertInput[] = [];
      // Creamos el stream una sola vez y lo referenciamos
      const stream = createReadStream(filePath).pipe(
        parse({ headers: true, ignoreEmpty: true }),
      );

      await new Promise<void>((resolve, reject) => {
        stream
          .on('error', (err) => reject(err))
          .on('data', async (row: CityCsvRow) => {
            batch.push({
              id: parseInt(row.id, 10),
              name: row.name,
              state: { id: parseInt(row.state_id, 10) },
              status: CityStatusesEnum.ACTIVE,
            });

            if (batch.length >= batchSize) {
              stream.pause();
              queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(CityEntity)
                .values(batch)
                .execute()
                .then(() => {
                  batch = [];
                  stream.resume();
                })
                .catch((err) => reject(err));
            }
          })
          .on('end', async () => {
            if (batch.length) {
              await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(CityEntity)
                .values(batch)
                .execute();
            }
            resolve();
          });
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        message: 'Cities seeded',
        context: this.context,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      this.logger.error({
        message: 'Error seeding cities, rollback',
        context: this.context,
        trace: err,
      });

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
