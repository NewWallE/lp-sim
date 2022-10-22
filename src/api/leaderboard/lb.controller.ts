import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { LPCacheService } from '../liquidity-pool/lp-cache.service';
import { RegisterService } from '../registration/register.service';
import { UserPortfolioDto } from './portfolio.dto';
import { UserService } from '../user/user.service';

@Controller('leaderboard')
export class LBController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(LPCacheService)
  private readonly lpCache: LPCacheService;

  @Inject(RegisterService)
  private readonly registerService: RegisterService;

  @Post('user')
  public async getUserPortfolio(@Body() body: UserPortfolioDto): Promise<any> {
    //get the current investments from portfolio
    const userData = await this.registerService.getUserId(body.email);
    if (!userData) {
      throw new HttpException('No user exists with this email!!!', HttpStatus.BAD_REQUEST);
    }

    // get the current LP price
    const currentInvestment = await this.userService.getPortfolio(userData.userid);
  
    if(!currentInvestment) {
      throw new HttpException("User doesn't have any portfolio!!!", HttpStatus.BAD_REQUEST);
    }
    // calculate new LP tokens
    const lpData = await this.lpCache.getLP(currentInvestment.poolAddress);
    
    return {
      Email: body.email,
      PoolName: lpData.name,
      LPTokens: currentInvestment.tokens,
      CurrentValue: currentInvestment.tokens*lpData.price,
      InvestedValue: currentInvestment.investedAmount
    };
  }
}
