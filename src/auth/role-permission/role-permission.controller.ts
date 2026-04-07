import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-rolepermission.dto';
import { UpdateRolePermissionDto } from './dto/update-rolepermission.dto';

@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionService) {}

    @Get()
    findAll() {
        return this.rolePermissionService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.rolePermissionService.findById(+id)
    }

    @Post()
    create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
        return this.rolePermissionService.create(createRolePermissionDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
        return this.rolePermissionService.update(+id, updateRolePermissionDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolePermissionService.remove(+id)
    }
}
