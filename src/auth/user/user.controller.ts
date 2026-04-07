import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthGuard} from '@nestjs/passport';
import {PermissionsGuard} from '@/common/guards/permissions.guard';
import {Permissions} from '@/common/decorators/permissions.decorator';
import {PositiveIntPipe} from '@/common/pipes/positive-int.pipe';
import { type Response } from 'express';


@Controller('users')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    
    @Get()
    @HttpCode(201)
    @Permissions('read')
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(201)
    @Permissions('read')
    findOne(@Param('id') id: string) {
        return this.userService.findById(+id);
    }

    @Patch(':id')
    @Permissions('update')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', PositiveIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.userService.remove(id);
        if (result) {
            return res.status(200).json(`User with id ${id} deleted successfully`);
        }
        return res.status(404).json(`User with id ${id} not found`);
    }
}
