import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RolePermission} from '../entities/role-permission.entity';
import {Repository} from 'typeorm';
import {PermissionService} from '../permission/permission.service';
import {Permission} from '../entities/permission.entity';
import {Role} from '../entities/role.entity';
import {RoleService} from '../role/role.service';
import {UpdateRolePermissionDto} from './dto/update-role-permission.dto';
import {CreateRolePermissionDto} from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService
    ) {}

    findRoleName(name:string){
        return this.roleService.findByName(name)
    }
    
    findById(id:number){
        return this.rolePermissionRepository.findOne({ where: {id}, relations: ['role', 'permission'] })
    }

    findAll(){
        return this.rolePermissionRepository.find();
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {

        const rolePermission = await this.rolePermissionRepository.findOneBy({ id });
        if (!rolePermission) {
            throw new Error('RolePermission not found');
        }

        if (updateRolePermissionDto.roleId) {
            
            rolePermission.role = { id: updateRolePermissionDto.roleId } as Role;
        }

        if (updateRolePermissionDto.permissionId) {
            rolePermission.permission = { id: updateRolePermissionDto.permissionId } as Permission;
        }

        return this.rolePermissionRepository.save(rolePermission);
    }

    async remove(id:number){
         const result = await this.rolePermissionRepository.delete(id);
         if(result.affected){
              return { id }
         }
            return null;

    }

    async create (createRolePermissionDto: CreateRolePermissionDto){
        const role = await this.roleService.findById(+createRolePermissionDto.roleId)
        if (!role) {
            throw new Error('Role not found')
        }
        const permission = await this.permissionService.findById(createRolePermissionDto.permissionId)
        if (!permission) {
            throw new Error('Permission not found')
        }

        
        const newRolePermission = this.rolePermissionRepository.create({
            role,
            permission
        })

        return this.rolePermissionRepository.save(newRolePermission)
    }
}