import {  Controller, Get, Inject } from '@nestjs/common';
import { LPCacheService } from './lp-cache.service';
import { LPCache } from './lp-cache.entity';
import { LPCacheDto } from './lp-cache.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';


@Controller('lps')
export class LPController {
  @Inject(LPCacheService)
  private readonly service: LPCacheService;

  constructor(private readonly httpService: HttpService) {}

  @Get()
  public getAllLPs(): Promise<LPCache> {
    return this.service.getAllLPs();
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async refreshLPCache() {
    const request = this.httpService
     .get('https://stats.apy.vision/api/v1/pool_search/advanced_search?avg_period_daily_volume_usd=250000&avg_period_reserve_usd=1000000&min_pool_age_days=7&vr=0&exchanges=uniswap_eth&access_token=b55b52c3-3d81-47c5-8d47-91925ce6a6a9')
     .pipe(map((res) => res.data?.results));

    const response = await lastValueFrom(request);
    for (var lpdata of response) {
      console.log(lpdata['pool_address']);
      const lpCacheData: LPCacheDto = new LPCacheDto();
      lpCacheData.age = lpdata['pool_age_days'];
      lpCacheData.pollAddress = lpdata['pool_address'];
      lpCacheData.price = lpdata['avg_lp_price'];
      lpCacheData.name = lpdata['name'];
      this.service.updateLP(lpCacheData);
    }
  }
}
