import { Module } from '@nestjs/common';
import { ShortUrlModule } from './short-url/short-url.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [ShortUrlModule, StatisticModule],
  providers: [],
})
export class ShortApiModule {}
