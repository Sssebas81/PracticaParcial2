import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";

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
        private readonly configService: ConfigService,

    ) {}

    findAll() {
        return this.userRepository.find();
    }

    findById(id: number, relations = false) {
    return this.userRepository.findOne({
      where: { id },
      relations: relations ? ['role', 'role.rolePermissions', 'role.rolePermissions.permission'] : undefined,
    });
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

            if (exists && exists.id !== id) {
                throw new BadRequestException('User with this email already exists')
            }
        }

        await this.userRepository.update(id, updateUserDto)

        return await this.userRepository.findOneBy({id})
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

        if (!createUserDto.passwordHash) {
        throw new BadRequestException('Password is required');
    }

    const saltRounds = parseInt(this.configService.get<string>('SALT_ROUNDS') ?? '10');
    const passwordHash = await bcrypt.hash(createUserDto.passwordHash, saltRounds);

        const newUser = this.userRepository.create ({
            ...createUserDto,
            passwordHash,
            role
        })

        return await this.userRepository.save(newUser)
    }

    async findByEmail(email: string){
        return this.userRepository.findOne({
            where: { email },
            relations: ['role', 'role.rolePermissions', 'role.rolePermissions.permission'],
        });
    }


}
