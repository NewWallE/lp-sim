import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserPortfolioDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
