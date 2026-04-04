import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermission } from '@/auth/entities/role-permission.entity';
import { Role } from '@/auth/entities/role.entity';
import { Permission } from '@/auth/entities/permission.entity';

import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';

@Module({
    imports: [TypeOrmModule.forFeature([RolePermission, Role, Permission])],
    controllers: [RolePermissionController],
    providers: [RolePermissionService],
    exports: [RolePermissionService],
})
export class RolePermissionModule {}
