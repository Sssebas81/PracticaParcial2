import {PartialType} from '@nestjs/mapped-types'
import {CreateRolePermissionDto} from "./create-rolepermission.dto";

export class UpdateRolePermissionDto extends PartialType(CreateRolePermissionDto) {}