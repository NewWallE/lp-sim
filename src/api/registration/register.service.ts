import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register.dto';
import { Registration } from './register.entity';
import { createHash } from 'crypto';

@Injectable()
export class RegisterService {
  
  @InjectRepository(Registration)
  private readonly registerRepo: Repository<Registration>;

  public getUserId(email: string): Promise<Registration> {
    return this.registerRepo.findOne(this.hashedKey(email));
  }

  public registerUser(body: RegisterUserDto): Promise<Registration> {
    const register: Registration = new Registration();
    register.hashedEmail =this.hashedKey(body.email);
    
    return this.registerRepo.save(register);
  }

  public  hashedKey(data: string) {
    return createHash('sha256').update(data).digest('hex');
  }
}
