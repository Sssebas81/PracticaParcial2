import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionService } from './permission/permission.service';
import { PermissionController } from './permission/permission.controller';
import { RolePermissionController } from './role-permission/role-permission.controller';
import { RolePermissionService } from './role-permission/role-permission.service';

@Module({
    providers: [PermissionService, RolePermissionService],
    imports: [UserModule, RoleModule],
    controllers: [PermissionController, RolePermissionController],
})
export class AuthModule {}
