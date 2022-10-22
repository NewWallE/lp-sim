import { Module } from '@nestjs/common';
import { LBController } from './lb.controller';

import { LPCacheModule } from '../liquidity-pool/lp-cache.module';
import { RegisterModule } from '../registration/register.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ LPCacheModule,  RegisterModule, UserModule],
  controllers: [LBController],
})
export class LeaderBoardModule {}
