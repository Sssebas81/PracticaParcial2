import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolePermission} from '../entities/role-permission.entity';
import {RoleModule} from '../role/role.module';
import {PermissionModule} from '../permission/permission.module';

@Module({
  providers: [RolePermissionService],
  imports: [TypeOrmModule.forFeature([RolePermission]), RoleModule, PermissionModule], 
  controllers: [RolePermissionController]
})
export class RolePermissionModule {}
