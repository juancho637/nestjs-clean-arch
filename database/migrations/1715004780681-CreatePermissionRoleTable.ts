import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePermissionRoleTable1715004780681
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permission_role',
        columns: [
          {
            name: 'permission_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'permission_role',
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
      }),
    );

    await queryRunner.createForeignKey(
      'permission_role',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('permission_role');

    const permissionForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('permission_id') !== -1,
    );
    const roleForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('role_id') !== -1,
    );

    await queryRunner.dropForeignKey('permission_role', permissionForeignKey);
    await queryRunner.dropForeignKey('permission_role', roleForeignKey);

    await queryRunner.dropTable('permission_role');
  }
}
