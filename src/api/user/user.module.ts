import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Portfolio } from './porfolio.entity';
import { UserService } from './user.service';
import { LPCacheModule } from '../liquidity-pool/lp-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio]), LPCacheModule ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
