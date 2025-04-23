import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { StateEntity } from '@modules/states/infrastructure';
import { CityType } from '@modules/cities/domain';

@Entity('cities')
export class CityEntity implements CityType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;
}
