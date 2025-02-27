import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '@modules/roles/infrastructure';
import { UserEntity } from '@modules/users/infrastructure';
import { PermissionType } from '../../domain';

@Entity({ name: 'permissions' })
export class PermissionEntity implements PermissionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  module: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserEntity[];
}
