import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
