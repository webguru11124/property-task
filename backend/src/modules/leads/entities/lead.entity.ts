import { BrokerOffice } from '../../brokers/entities/broker-office.entity';
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

@Entity({ name: 'leads' })
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  full_name!: string;

  @Column({ type: 'varchar', length: 25 })
  phone!: string;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'uuid' })
  city_id!: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @Column({ type: 'text', nullable: true })
  comment!: string | null;

  @Column({ type: 'uuid', nullable: true })
  assigned_broker_id!: string | null;

  @ManyToOne(() => BrokerOffice)
  @JoinColumn({ name: 'assigned_broker_id' })
  assigned_broker!: BrokerOffice | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
