import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RolePermission} from '../entities/role-permission.entity';
import {Repository} from 'typeorm';
import {RoleService} from '../role/role.service';
import {PermissionService} from '../permission/permission.service';
import { UpdateRolePermissionDto } from './dto/update-rolepermission.dto';
import { CreateRolePermissionDto } from './dto/create-rolepermission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,

    ) {}

    findAll() {
        return this.rolePermissionRepository.find()
    }

    async findById(id: number) {
        const rolePermission = await this.rolePermissionRepository.findOneBy({id})

        if (!rolePermission) {
            throw new NotFoundException('Role-Permission relation not found')
        }

        return rolePermission
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
        const updateData: Partial<RolePermission> = {};

        if (updateRolePermissionDto.roleId) {
            const role = await this.roleService.findById(updateRolePermissionDto.roleId);

            if (!role) {
                throw new NotFoundException('Role not found');
            }

            updateData.role = role;
        }

        if (updateRolePermissionDto.permissionId) {
            const permission = await this.permissionService.findById(updateRolePermissionDto.permissionId);

            if (!permission) {
                throw new NotFoundException('Permission not found');
            }

            updateData.permission = permission;
        }

        await this.rolePermissionRepository.update(id, updateData);

        return this.findById(id);
    }

    async remove (id: number) {
        const rolePermission = await this.findById(id)

        if (!rolePermission) {
            throw new NotFoundException('Role Permission relation not found')
        }

        await this.rolePermissionRepository.delete(rolePermission)

        return {id}
    }

    async create(createRolePermissionDto: CreateRolePermissionDto) {
        const role = await this.roleService.findById(createRolePermissionDto.roleId);
        if (!role) {
            throw new Error('Role not found')
        }
        
        const permission = await this.permissionService.findById(createRolePermissionDto.permissionId);
        if (!permission) {
            throw new Error('Permission not found')
        }
        const newRolePermission = this.rolePermissionRepository.create({
            role,
            permission,
        })
        return this.rolePermissionRepository.save(newRolePermission)
    }
}
