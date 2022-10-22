import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LPCacheDto } from './lp-cache.dto';
import { LPCache } from './lp-cache.entity';

@Injectable()
export class LPCacheService {
  
  @InjectRepository(LPCache)
  private readonly lpCacheRepo: Repository<LPCache>;

  public getAllLPs(): Promise<LPCache> {
    return this.lpCacheRepo.query('select * from lpcache');
  }

  public getLP(lpid: string): Promise<LPCache> {
    return this.lpCacheRepo.findOne(lpid);
  }

  public updateLP(body: LPCacheDto): Promise<LPCache> {
    const lp: LPCache = new LPCache();
    lp.pollAddress = body.pollAddress;
    lp.name = body.name;
    lp.age = body.age;
    lp.price = body.price;

    return this.lpCacheRepo.save(lp);
  }

}
