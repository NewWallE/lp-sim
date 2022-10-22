import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller()
export class RegistrationController {
  @Inject(RegisterService)
  private readonly service: RegisterService;

  @Post('register')
  public async registerOrLogin(@Body() body: RegisterUserDto): Promise<string> {
    const existingUser = await this.service.getUserId(body.email);
    if (!existingUser) {
      const newUser = await this.service.registerUser(body);
      return newUser.userid
    } 
    return existingUser.userid
  }
}
