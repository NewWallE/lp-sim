import { IsNotEmpty } from 'class-validator';

export class InvestmentDto {
  @IsNotEmpty()
  public userId: string;

  @IsNotEmpty()
  public poolAddress: string;
  
}
