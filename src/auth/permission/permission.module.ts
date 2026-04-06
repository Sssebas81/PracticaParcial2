import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Permission} from '../entities/permission.entity';
import { PermissionController } from './permission.controller';

@Module({
  providers: [PermissionService],
  imports: [TypeOrmModule.forFeature([Permission])],
  exports: [PermissionService],
  controllers: [PermissionController]
  
})
export class PermissionModule {}
