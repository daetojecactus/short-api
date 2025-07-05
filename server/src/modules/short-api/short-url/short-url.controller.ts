import { Controller, Post, Body, Get, Param, Delete, NotFoundException, Res } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlDto } from './short-url.dto';
import { Response } from 'express';
import { ShortUrlMessages } from './constants/short-url-messages';
import { StatisticService } from '../statistic/statistic.service';
import { UserIp } from 'src/helpers/decorators/user-ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class ShortUrlController {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly statisticService: StatisticService,
    private readonly configService: ConfigService,
  ) {}

  @Post('shorten')
  async createShortUrl(@Body() shortUrlDto: ShortUrlDto) {
    const result = await this.shortUrlService.create(shortUrlDto);
    const baseUrl = this.configService.get<string>('BASE_URL');

    return {
      shortUrl: `${baseUrl}/${result.alias}`,
    };
  }

  @Get(':alias')
  async redirect(@Param('alias') alias: string, @Res() res: Response, @UserIp() ip: string) {
    const shortUrl = await this.shortUrlService.findOne({ alias });

    await this.statisticService.create({ alias, ipAddress: ip });

    return res.redirect(shortUrl.originalUrl);
  }

  @Get('info/:alias')
  async getInfo(@Param('alias') alias: string) {
    return this.shortUrlService.findOne({ alias });
  }

  @Delete('delete/:alias')
  async delete(@Param('alias') alias: string) {
    await this.shortUrlService.delete({ alias });
    return { message: ShortUrlMessages.SHORT_URL_DELTED };
  }
}
