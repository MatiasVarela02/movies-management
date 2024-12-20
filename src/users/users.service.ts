import { Injectable } from '@nestjs/common';
import { User } from './entities/user';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './entities/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  findByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        userName,
      },
    });
  }

  async create(user: UserDto): Promise<void> {
    await this.userModel.create(user);
  }
}
