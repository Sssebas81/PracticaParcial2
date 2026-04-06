import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';  
import {User} from '../entities/user.entity';
import { UserController } from './user.controller';
import {UserService} from './user.service';
import {RolesModule} from '../role/role.module';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
