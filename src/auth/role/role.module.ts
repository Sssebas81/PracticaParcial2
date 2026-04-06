import { Module } from '@nestjs/common';
import {Role} from '../entities/role.entity';

import {TypeOrmModule} from '@nestjs/typeorm';  
import {RoleService} from './role.service';
import {RoleController} from './role.controller';


@Module({
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RolesModule {}
