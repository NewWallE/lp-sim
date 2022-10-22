import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LPCacheModule } from '../liquidity-pool/lp-cache.module';
import { RegistrationController } from './register.controller';
import { Registration } from './register.entity';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([Registration])],
  controllers: [RegistrationController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
