import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrlDto } from './short-url.dto';
import { ShortUrl } from './short-url.schema';
import { nanoid } from 'nanoid';
import { ShortUrlMessages } from './constants/short-url-messages';

@Injectable()
export class ShortUrlService {
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

  private generateAlias(): string {
    return nanoid(8);
  }

  async create(shortUrlDto: ShortUrlDto): Promise<ShortUrl> {
    const alias = shortUrlDto.alias ?? this.generateAlias();

    const shortUrl = await this.shortUrlRepository.findOne({ alias });
    if (shortUrl) {
      throw new ConflictException(ShortUrlMessages.ALIAS_ALREADY_EXISTS);
    }

    const entity: Partial<ShortUrl> = {
      originalUrl: shortUrlDto.originalUrl,
      alias,
      expiresAt: shortUrlDto.expiresAt ? new Date(shortUrlDto.expiresAt) : undefined,
    };

    return this.shortUrlRepository.create(entity);
  }

  async findOne(filter: Partial<ShortUrl>): Promise<ShortUrl> {
    const result = await this.shortUrlRepository.findOne(filter);
    if (!result) {
      throw new NotFoundException(ShortUrlMessages.SHORT_URL_NOT_FOUND);
    }
    return result;
  }

  async find(filter?: Partial<ShortUrl>): Promise<ShortUrl[]> {
    return this.shortUrlRepository.find(filter);
  }

  async delete(filter: Partial<ShortUrl>): Promise<void> {
    const shortUrl = await this.shortUrlRepository.findOne(filter);
    if (!shortUrl) {
      throw new NotFoundException(ShortUrlMessages.SHORT_URL_NOT_FOUND);
    }
    await this.shortUrlRepository.deleteOne(filter);
  }
}
