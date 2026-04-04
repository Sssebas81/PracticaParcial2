import { Body, Controller, Delete, Get, Param, Patch, Post, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}
    
        @Get()
        findAll() {
            return this.permissionService.findAll();
        }
    
        @Get(':id')
        findById(@Param('id') id: string) {
            return this.permissionService.findById(+id);
        }

        @Post()
        create(@Body() createPermissionDto: CreatePermissionDto) {
            return this.permissionService.create(createPermissionDto)
        }

        @Patch(':id')
        update(@Param('id') id: string, @Body() updatePermissionDto:UpdatePermissionDto) {
            return this.permissionService.update(+id,updatePermissionDto)
        }

   @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.permissionService.remove(id);
        if (result) {
            return res.status(200).json(`Permission with id ${id} deleted successfully`);
        }
        return res.status(404).json(`Permission with id ${id} not found`);
    }
}
