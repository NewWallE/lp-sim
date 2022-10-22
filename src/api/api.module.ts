import { Module } from '@nestjs/common';
import { RegisterModule } from './registration/register.module';
import { LPCacheModule } from './liquidity-pool/lp-cache.module';
import { UserModule } from './user/user.module';
import { LeaderBoardModule } from './leaderboard/lb.module';

@Module({
  imports: [RegisterModule, LPCacheModule, UserModule, LeaderBoardModule],
})
export class ApiModule {}
