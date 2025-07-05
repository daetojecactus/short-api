import { Injectable, NotFoundException } from '@nestjs/common';
import { StatisticRepository } from './statistic.repository';
import { ShortUrlService } from '../short-url/short-url.service';
import { StatisticDto } from './statistic.dto';
import { Statistic } from './statistic.schema';
import { StatisticConstants } from './constants/statistic-constants';

@Injectable()
export class StatisticService {
  constructor(
    private readonly statisticRepository: StatisticRepository,
    private readonly shortUrlService: ShortUrlService,
  ) {}

  async create(statisticDto: StatisticDto): Promise<Statistic> {
    const shortUrl = await this.shortUrlService.findOne({ alias: statisticDto.alias });

    const entity: Partial<Statistic> = {
      shortUrl,
      ipAddress: statisticDto.ipAddress,
    };

    return this.statisticRepository.create(entity);
  }

  async getAnalytics(alias: string): Promise<{
    count: number;
    ips: string[];
  }> {
    await this.shortUrlService.findOne({ alias });

    const [count, latestStatistic] = await Promise.all([
      this.statisticRepository.countByAlias(alias),
      this.statisticRepository.findLatestByAlias(alias, StatisticConstants.STATISTIC_LIMIT),
    ]);
    const ips = latestStatistic.map(stat => stat.ipAddress);

    return { count, ips };
  }
}
