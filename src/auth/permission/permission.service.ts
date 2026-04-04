import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from '@/auth/entities/permission.entity';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    create(dto: CreatePermissionDto) {
        return this.permissionRepository.save(this.permissionRepository.create(dto));
    }

    findAll() {
        return this.permissionRepository.find();
    }

    async findById(id: number) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            throw new NotFoundException(`Permission with id ${id} not found`);
        }
        return permission;
    }

    async update(id: number, dto: UpdatePermissionDto) {
        await this.findById(id);
        await this.permissionRepository.update(id, dto);
        return this.findById(id);
    }

    async remove(id: number) {
        await this.findById(id);
        return this.permissionRepository.delete(id);
    }
}
