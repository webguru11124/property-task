import { City } from '../../cities/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'broker_offices' })
export class BrokerOffice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'uuid' })
  city_id!: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @Column({ type: 'varchar', length: 300 })
  address!: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  postal_code!: string | null;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  website!: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude!: string | null;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude!: string | null;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
