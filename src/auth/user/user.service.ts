import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';
import { Role } from '@/auth/entities/role.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async create(dto: CreateUserDto) {
        const role = await this.roleRepository.findOne({ where: { name: dto.roleName } });
        if (!role) {
            throw new NotFoundException(`Role ${dto.roleName} not found`);
        }

        const user = this.userRepository.create({
            username: dto.username,
            email: dto.email,
            passwordHash: dto.passwordHash,
            bio: dto.bio,
            role,
        });

        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find({ relations: ['role'] });
    }

    async findById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['role'],
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findById(id);

        if (dto.roleName) {
            const role = await this.roleRepository.findOne({ where: { name: dto.roleName } });
            if (!role) {
                throw new NotFoundException(`Role ${dto.roleName} not found`);
            }
            user.role = role;
        }

        const updated = Object.assign(user, dto);
        return this.userRepository.save(updated);
    }

    async remove(id: number) {
        await this.findById(id);
        return this.userRepository.delete(id);
    }
}
