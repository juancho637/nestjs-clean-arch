import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CountryEntity } from '@modules/countries/infrastructure';
import { StateType } from '../../../states/domain';

@Entity('states')
export class StateEntity implements StateType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => CountryEntity, (country) => country.states, {
    nullable: false,
  })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
