import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../../domain';

@Entity({ name: 'users' })
@ObjectType()
export class UserEntity implements UserType {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Field(() => String)
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Field(() => String)
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
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'now()',
  })
  @Field(() => String)
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'now()',
  })
  @Field(() => String)
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  @Field(() => String)
  deletedAt?: Date;
}
