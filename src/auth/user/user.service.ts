import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RoleService } from '../role/role.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
    ) {}

    findAll() {
        return this.userRepository.find();
    }

    async findById(id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: {id}})

        if (!user) {
            throw new NotFoundException('User not found')
        }

        if (updateUserDto.roleName) {
            const role = await this.roleService.findByName(updateUserDto.roleName)

            if (!role) {
                throw new NotFoundException('Role not found')
            } 
        }

        if (updateUserDto.email) {
            const exists = await this.userRepository.findOne({ where: { email: updateUserDto.email}})

            if (exists) {
                throw new BadRequestException('User with this email already exists')
            }
        }

        Object.assign(user, updateUserDto)

        return await this.userRepository.save(user)
    }

    async remove(id: number) {
        const user = await this.findById(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        await this.userRepository.delete(user)

        return {id}
    }

    async create(createUserDto: CreateUserDto) {
        const role = await this.roleService.findByName(createUserDto.roleName)

        if (!role) {
            throw new NotFoundException("Role not found")
        }

        const exists = await this.userRepository.findOne({
            where: { email: createUserDto.email}
        })

        if (exists) {
            throw new BadRequestException('User with this email already exists')
        }

        const newUser = this.userRepository.create ({
            ...createUserDto,
            role
        })

        return await this.userRepository.save(newUser)
    }


}
