import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCountriesTable1715004780701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'iso_code',
            type: 'varchar',
            length: '5',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone_code',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
          {
            name: 'flag',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('countries');
  }
}
