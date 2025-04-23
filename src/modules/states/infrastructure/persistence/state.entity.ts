import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CountryEntity } from '@modules/countries/infrastructure';
import { CityEntity } from '@modules/cities/infrastructure';
import { StateType } from '../../../states/domain';

@Entity('states')
export class StateEntity implements StateType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => CountryEntity, (country) => country.states)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @OneToMany(() => CityEntity, (city) => city.state)
  cities: CityEntity[];
}
