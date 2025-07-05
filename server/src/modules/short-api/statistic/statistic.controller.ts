import { Controller, Get, Post, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticMessages } from './constants/statistic-messages';
import { UserIp } from 'src/helpers/decorators/user-ip.decorator';

@Controller('analytics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post(':alias')
  async create(@Param('alias') alias: string, @UserIp() ip: string) {
    const result = await this.statisticService.create({ alias, ipAddress: ip });
    return {
      message: StatisticMessages.STATISTIC_RECORD_CREATED,
      id: result.id,
    };
  }

  @Get(':alias')
  async getAnalytics(@Param('alias') alias: string) {
    return this.statisticService.getAnalytics(alias);
  }
}
