import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(@Query('username') username?: string) {
    return this.permissionService.findAll(username);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.permissionService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.permissionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
