import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SessionService } from './session/session.service';
import { RolePermissionModule } from './role-permission/role-permission.module';

@Module({
    providers: [SessionService],
    imports: [UserModule, RoleModule, PermissionModule, RolePermissionModule],
})
export class AuthModule {}
