import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {PermissionService} from './permission.service';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    findAll() {
        return this.permissionService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.permissionService.findById(+id)
    }

    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionService.update(+id, updatePermissionDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.permissionService.remove(+id)
    }
}
