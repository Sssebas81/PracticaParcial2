import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from '../entities/role.entity';
import {Repository} from 'typeorm/browser/repository/Repository.js';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        const newRole = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(newRole);
    }

    async findAll(){
        return await this.roleRepository.find();
    }

    async findById(id:number){
        return await this.roleRepository.findOneBy({id});
    }

    async remove(id: number){
           const result = await this.roleRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
    
    async update(id: number, updateRoleDto: UpdateRoleDto) {
        await this.roleRepository.update(id, updateRoleDto);
        return await this.roleRepository.findOneBy({ id });
    }

    async findByName(name: string) {
        return await this.roleRepository.findOneBy({ name });
    }
}
