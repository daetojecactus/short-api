import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Statistic } from '../statistic/statistic.schema';

@Entity('short_url')
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'original_url' })
  originalUrl: string;

  @Column({ name: 'alias', unique: true, length: 20 })
  alias: string;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Statistic, stat => stat.shortUrl)
  statistics: Statistic[];
}
