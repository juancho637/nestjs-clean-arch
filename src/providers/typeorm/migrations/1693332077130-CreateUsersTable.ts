import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1693332077130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
