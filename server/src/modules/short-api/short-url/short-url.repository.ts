import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from './short-url.schema';

@Injectable()
export class ShortUrlRepository {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly repository: Repository<ShortUrl>,
  ) {}

  async create(shortUrl: Partial<ShortUrl>) {
    const entity = this.repository.create(shortUrl);
    return this.repository.save(entity);
  }

  async findOne(filter: Partial<ShortUrl>) {
    return this.repository.findOne({ where: filter });
  }

  async find(filter?: Partial<ShortUrl>) {
    return this.repository.find({ where: filter ?? {} });
  }

  async deleteOne(filter: Partial<ShortUrl>) {
    await this.repository.delete(filter);
  }
}
