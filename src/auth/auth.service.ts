import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async checkUserCredentials(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email, true);
    if (user?.password !== pass) {
      throw new UnprocessableEntityException();
    }
    const payload = { sub: user._id };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
