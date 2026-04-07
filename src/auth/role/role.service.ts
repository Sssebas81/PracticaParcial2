import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';

import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    findAll() {
        return this.roleRepository.find()
    }

    async findById(id: number) {
        const role = await this.roleRepository.findOneBy({id})

        if (!role) {
            throw new NotFoundException('Role not found')
        }
        return role
    }

    async update (id: number, updateRoleDto: UpdateRoleDto) {
        const role = await this.roleRepository.findOne({ where: {id} })

        if (!role) {
            throw new NotFoundException('Role not found')
        }

        if (updateRoleDto.name) {
            const exists = await this.roleRepository.findOne({where: {name: updateRoleDto.name}})

            if (exists) {
                throw new BadRequestException('Role with this name already exists')
            }
        }

        await this.roleRepository.update(id, updateRoleDto)

        return await this.roleRepository.findOneBy({id})
    }

    async remove (id: number) {
        const role = await this.findById(id)

        if (!role) {
            throw new NotFoundException('Role not found')
        }

        await this.roleRepository.delete(id)

        return {id}
    }

    async create(createRoleDto: CreateRoleDto) {
        const exists = await this.roleRepository.findOne({
            where: {name: createRoleDto.name}
        })

        if (exists) {
            throw new BadRequestException('Role already exists')
        }

        const newRole = this.roleRepository.create({
            ...createRoleDto,
        })

        return await this.roleRepository.save(newRole)
    }

    async findByName(name: string): Promise<Role | null> {
        return await this.roleRepository.findOneBy({ name });
    }
}