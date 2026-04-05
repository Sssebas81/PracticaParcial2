import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {Repository} from 'typeorm/browser/repository/Repository.js';
import {RoleService} from '../role/role.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private roleService: RoleService
    ){}

    async findAll(){
        return await this.userRepository.find();
    }

    async findById(id: number){
        return await this.userRepository.findOneBy({id});
    }

    async remove(id:number){
        const result = await this.userRepository.delete({id})

        if (result.affected) {
            return {id}
        }

        return null
    }

    async update(id: number, updateUserDto: UpdateUserDto){
        return await this.userRepository.update(id, updateUserDto);
    }

    async create(createUserDto: CreateUserDto){
        const role = await this.roleService.findByName(createUserDto.roleName);

        if (!role) {
            throw new Error('Role not found');
        }

        const newUser = this.userRepository.create({
            ...createUserDto,
            role
        });

        return await this.userRepository.save(newUser);
    }


}

