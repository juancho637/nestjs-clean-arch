import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStatesTable1715004780714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'states',
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
            name: 'status',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'country_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'states',
      new TableForeignKey({
        columnNames: ['country_id'],
        referencedTableName: 'countries',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('states');
    const fk = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('country_id') !== -1,
    );

    if (fk) {
      await queryRunner.dropForeignKey('states', fk);
    }

    await queryRunner.dropTable('states');
  }
}
