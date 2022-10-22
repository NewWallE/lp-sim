import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { INVESTMENT_AMOUNT } from 'src/shared/constants';
import { LPCacheService } from '../liquidity-pool/lp-cache.service';
import { InvestmentDto } from './investment.dto';
import { Portfolio } from './porfolio.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(LPCacheService)
  private readonly lpCache: LPCacheService;

  @Post('invest')
  public async invest(@Body() body: InvestmentDto): Promise<Portfolio> {
    //get the current investments from portfolio
    const currentInvestment = await this.userService.getPortfolio(body.userId);
    if (currentInvestment && currentInvestment.userId) {
      throw new HttpException('You have already invested your entire amount!!!', HttpStatus.BAD_REQUEST);
    }

    // get the current LP price
    const lpData = await this.lpCache.getLP(body.poolAddress);
    if (!lpData) {
      throw new HttpException('No liquidity pool found with this address', HttpStatus.BAD_REQUEST);
    }
    // calculate new LP tokens
    const newTokens = INVESTMENT_AMOUNT/lpData.price;
    console.log(newTokens);

    const newPortfolio = new Portfolio();
    newPortfolio.investedAmount = INVESTMENT_AMOUNT;
    newPortfolio.poolAddress = body.poolAddress;
    newPortfolio.tokens = newTokens;
    newPortfolio.userId = body.userId;
    
    return this.userService.submitPortfolio(newPortfolio);
  }
}
