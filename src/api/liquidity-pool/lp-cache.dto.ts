import { IsEmail, IsNotEmpty } from 'class-validator';

export class LPCacheDto {
  @IsNotEmpty()
  public pollAddress: string;

  @IsNotEmpty()
  public name: string;

  public price: number;
  public age: number;
}
