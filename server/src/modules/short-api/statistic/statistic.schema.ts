import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { ShortUrl } from '../short-url/short-url.schema';

@Entity('statistic')
export class Statistic {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ShortUrl, shortUrl => shortUrl.statistics, {
    onDelete: 'CASCADE',
  })
  @Index()
  shortUrl: ShortUrl;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
