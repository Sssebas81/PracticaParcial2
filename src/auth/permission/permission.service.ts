import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Permission} from '../entities/permission.entity';
import {Repository} from 'typeorm';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {CreatePermissionDto} from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) {}

    findAll() {
        return this.permissionRepository.find()
    }

    findById(id: number) {
        const permission = this.permissionRepository.findOneBy({id})

        if (!permission) {
            throw new NotFoundException('Permission not found')
        }

        return permission
    }

    async update (id: number, updatePermissionDto: UpdatePermissionDto) {
        await this.permissionRepository.update(id,updatePermissionDto)
        return this.permissionRepository.findOneBy({id})
    }

    async remove (id: number) {
        const permission = await this.findById(id)

        if (!permission) {
            throw new NotFoundException('Permission not found')
        }
    }

    async create(createPermissionDto: CreatePermissionDto) {

    }
}
