import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { StateEntity } from '@modules/states/infrastructure';

@Entity('countries')
export class CountryEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 5, name: 'iso_code' })
  isoCode: string;

  @Column({ type: 'varchar', length: 5, name: 'phone_code' })
  phoneCode: string;

  @Column({ type: 'varchar', length: 5, name: 'flag' })
  flag: string;

  @OneToMany(() => StateEntity, (state) => state.country)
  states: StateEntity[];
}
