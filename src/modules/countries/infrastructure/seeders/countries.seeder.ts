// src/modules/countries/infrastructure/seeders/countries.seeder.ts

import { DataSource } from 'typeorm';
import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { CountryEntity } from '../persistence/country.entity';

export class CountriesSeeder {
  private readonly context = CountriesSeeder.name;

  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: LoggerServiceInterface,
  ) {}

  async seed(): Promise<void> {
    const filePath = __dirname + '/data/countries.csv';
    const batchSize = 500;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let batch: Partial<CountryEntity>[] = [];
      // Creamos el stream una sola vez y lo referenciamos
      const stream = createReadStream(filePath).pipe(
        parse({ headers: true, ignoreEmpty: true }),
      );

      await new Promise<void>((resolve, reject) => {
        stream
          .on('error', (err) => reject(err))
          .on('data', async (row: any) => {
            batch.push({
              id: parseInt(row.id, 10),
              name: row.name,
              isoCode: row.iso2,
              phoneCode: row.phonecode,
              flag: row.emoji,
            });

            if (batch.length >= batchSize) {
              stream.pause();
              queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(CountryEntity)
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
                .into(CountryEntity)
                .values(batch)
                .execute();
            }
            resolve();
          });
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        message: 'Countries seeded',
        context: this.context,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      this.logger.error({
        message: 'Error seeding countries, rollback',
        context: this.context,
        trace: err,
      });

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
