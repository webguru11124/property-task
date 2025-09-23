import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('IDX_CITIES_NAME')
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  county!: string;

  @Column({ type: 'char', length: 4, unique: true })
  municipality_code!: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude!: string;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude!: string;

  @Column({ type: 'integer', nullable: true })
  population!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
