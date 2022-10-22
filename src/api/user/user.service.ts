import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './porfolio.entity';

@Injectable()
export class UserService {
  @InjectRepository(Portfolio)
  private readonly portforlioRepo: Repository<Portfolio>;

  public submitPortfolio(updatedPortfolio: Portfolio): Promise<Portfolio> {
    return this.portforlioRepo.save(updatedPortfolio);
  }

  public getPortfolio(userId: string): Promise<Portfolio> {
    return this.portforlioRepo.findOne(userId);
  }

}
