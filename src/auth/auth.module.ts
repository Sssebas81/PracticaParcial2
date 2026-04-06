import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';

import {RolesModule} from './role/role.module';
import {RolePermissionModule} from './role-permission/role-permission.module';

@Module({
  
  imports: [UsersModule, RolesModule, RolePermissionModule, PermissionModule],
  
})
export class AuthModule {}
