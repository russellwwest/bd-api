import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userModelName } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(userModelName) private userModel: Model<User>) {}

  async findOneByEmail(
    email: string,
    getPassword?: boolean,
  ): Promise<User | undefined> {
    return await this.userModel
      .findOne({ email })
      .select(getPassword && '+password');
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userModel.findById(id);
  }
}
