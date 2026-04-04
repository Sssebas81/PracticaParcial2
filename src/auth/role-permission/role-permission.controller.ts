import { Body, Controller, Delete, Get, Param, Patch, Post, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionService) {}

    @Get()
    findAll() {
        return this.rolePermissionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.rolePermissionService.findById(+id);
    }

    @Post()
    create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
        return this.rolePermissionService.create(createRolePermissionDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
        return this.rolePermissionService.update(+id, updateRolePermissionDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.rolePermissionService.remove(id);
        if (result) {
            return res.status(200).json(`RolePermission with id ${id} deleted successfully`);
        }
        return res.status(404).json(`RolePermission with id ${id} not found`);
    }
}
