import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const foundUser = await this.userService.findOneByEmail(email);

    if (foundUser && foundUser.password === password) {
      const { password, ...result } = foundUser;
      return result;
    }

    return null;
  }
}
