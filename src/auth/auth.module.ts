import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SessionsService } from '@/games/session/session.service'; 
import { RolePermissionModule } from './role-permission/role-permission.module';
import {SessionModule} from '@/games/session/session.module';

@Module({
    imports: [UserModule, RoleModule, PermissionModule, RolePermissionModule, SessionModule],
})
export class AuthModule {}
