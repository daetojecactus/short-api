import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './statistic.schema';
import { StatisticService } from './statistic.service';
import { StatisticRepository } from './statistic.repository';
import { StatisticController } from './statistic.controller';
import { ShortUrlModule } from '../short-url/short-url.module';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic]), forwardRef(() => ShortUrlModule)],
  providers: [StatisticRepository, StatisticService],
  controllers: [StatisticController],
  exports: [StatisticService],
})
export class StatisticModule {}
