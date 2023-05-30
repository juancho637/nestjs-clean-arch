import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '@ecommerce/modules/users';

// @Index('user_email_password_index', ['email', 'password', 'deletedAt'])
// @Index('user_email_index', ['email', 'deletedAt'], { unique: true })
// @Index('user_status_index', ['status', 'deletedAt'])
// @Index('user_pk', ['userId'], { unique: true })
@Entity({ name: 'users' })
export class UserTypeOrmEntity implements UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  status: boolean;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  updateAt?: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  // @ManyToOne(() => RolePostgresEntity, (role) => role.users)
  // role: RolePostgresEntity;
}
