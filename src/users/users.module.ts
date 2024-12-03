import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
