import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from './short-url.schema';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { StatisticModule } from '../statistic/statistic.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrl]), forwardRef(() => StatisticModule)],
  providers: [ShortUrlRepository, ShortUrlService],
  controllers: [ShortUrlController],
  exports: [ShortUrlService],
})
export class ShortUrlModule {}
