import { DataSource } from 'typeorm';
import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { StateStatusesEnum } from '../../domain';
import { StateEntity } from '../persistence/state.entity';
import { CountryEntity } from '@modules/countries/infrastructure';

interface StateCsvRow {
  id: string;
  name: string;
  country_id: string;
}

type StateInsertInput = {
  id: number;
  name: string;
  status: StateStatusesEnum;
  country: Omit<
    CountryEntity,
    'name' | 'isoCode' | 'phoneCode' | 'flag' | 'states'
  >;
};

export class StatesSeeder {
  private readonly context = StatesSeeder.name;

  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: LoggerServiceInterface,
  ) {}

  async seed(): Promise<void> {
    const filePath = __dirname + '/states-data.csv';
    const batchSize = 500;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let batch: StateInsertInput[] = [];
      const stream = createReadStream(filePath).pipe(
        parse({ headers: true, ignoreEmpty: true }),
      );

      await new Promise<void>((resolve, reject) => {
        stream
          .on('error', (err) => reject(err))
          .on('data', async (row: StateCsvRow) => {
            batch.push({
              id: parseInt(row.id, 10),
              name: row.name,
              country: { id: parseInt(row.country_id, 10) },
              status: StateStatusesEnum.ACTIVE,
            });

            if (batch.length >= batchSize) {
              stream.pause();
              queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(StateEntity)
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
                .into(StateEntity)
                .values(batch)
                .execute();
            }
            resolve();
          });
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        message: 'States seeded',
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
