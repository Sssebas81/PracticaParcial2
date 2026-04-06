import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SessionService } from './session/session.service';

@Module({
    providers: [SessionService],
    imports: [UserModule, RoleModule, PermissionModule],
})
export class AuthModule {}
