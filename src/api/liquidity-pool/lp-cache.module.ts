import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LPController } from './lp.controller';
import { LPCache } from './lp-cache.entity';
import { LPCacheService } from './lp-cache.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([LPCache]), HttpModule],
  controllers: [LPController],
  providers: [LPCacheService],
  exports: [LPCacheService],
})
export class LPCacheModule {}
