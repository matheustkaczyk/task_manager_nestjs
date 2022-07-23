import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(email: string, password: string) {
    const foundUser = await this.usersService.findOneByEmail(email);
    
    
  }
}
