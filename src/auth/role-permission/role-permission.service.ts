import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolePermission } from '@/auth/entities/role-permission.entity';
import { Role } from '@/auth/entities/role.entity';
import { Permission } from '@/auth/entities/permission.entity';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    async create(dto: CreateRolePermissionDto) {
        const role = await this.roleRepository.findOne({ where: { id: dto.roleId } });
        if (!role) {
            throw new NotFoundException(`Role with id ${dto.roleId} not found`);
        }

        const permission = await this.permissionRepository.findOne({ where: { id: dto.permissionId } });
        if (!permission) {
            throw new NotFoundException(`Permission with id ${dto.permissionId} not found`);
        }

        const item = this.rolePermissionRepository.create({ role, permission });
        return this.rolePermissionRepository.save(item);
    }

    findAll() {
        return this.rolePermissionRepository.find({ relations: ['role', 'permission'] });
    }

    async findById(id: number) {
        const item = await this.rolePermissionRepository.findOne({
            where: { id },
            relations: ['role', 'permission'],
        });
        if (!item) {
            throw new NotFoundException(`RolePermission with id ${id} not found`);
        }
        return item;
    }

    async update(id: number, dto: UpdateRolePermissionDto) {
        const item = await this.findById(id);

        if (dto.roleId) {
            const role = await this.roleRepository.findOne({ where: { id: dto.roleId } });
            if (!role) {
                throw new NotFoundException(`Role with id ${dto.roleId} not found`);
            }
            item.role = role;
        }

        if (dto.permissionId) {
            const permission = await this.permissionRepository.findOne({ where: { id: dto.permissionId } });
            if (!permission) {
                throw new NotFoundException(`Permission with id ${dto.permissionId} not found`);
            }
            item.permission = permission;
        }

        return this.rolePermissionRepository.save(item);
    }

    async remove(id: number) {
        await this.findById(id);
        return this.rolePermissionRepository.delete(id);
    }
}
