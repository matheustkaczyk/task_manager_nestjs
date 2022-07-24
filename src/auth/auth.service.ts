import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const foundUser = await this.userService.findOneByEmail(email);

    if (foundUser && foundUser.password === password) {
      const { password, ...result } = foundUser;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const { _doc } = user;
    const payload = { name: _doc.name, email: _doc.email, id: _doc._id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
