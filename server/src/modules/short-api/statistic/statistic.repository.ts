import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from './statistic.schema';

@Injectable()
export class StatisticRepository {
  constructor(
    @InjectRepository(Statistic)
    private readonly repository: Repository<Statistic>,
  ) {}

  async create(statistic: Partial<Statistic>) {
    const entity = this.repository.create(statistic);
    return this.repository.save(entity);
  }

  async findOne(filter: Partial<Statistic>) {
    return this.repository.findOne({ where: filter });
  }

  async findLatestByAlias(alias: string, limit: number) {
    return this.repository
      .createQueryBuilder('stat')
      .leftJoinAndSelect('stat.shortUrl', 'shortUrl')
      .where('shortUrl.alias = :alias', { alias })
      .orderBy('stat.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  async countByAlias(alias: string) {
    return this.repository
      .createQueryBuilder('stat')
      .leftJoin('stat.shortUrl', 'shortUrl')
      .where('shortUrl.alias = :alias', { alias })
      .getCount();
  }
}
