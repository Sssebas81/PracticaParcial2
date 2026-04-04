import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '@/auth/entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    create(dto: CreateRoleDto) {
        return this.roleRepository.save(this.roleRepository.create(dto));
    }

    findAll() {
        return this.roleRepository.find();
    }

    async findById(id: number) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException(`Role with id ${id} not found`);
        }
        return role;
    }

    async update(id: number, dto: UpdateRoleDto) {
        await this.findById(id);
        await this.roleRepository.update(id, dto);
        return this.findById(id);
    }

    async remove(id: number) {
        await this.findById(id);
        return this.roleRepository.delete(id);
    }
}
