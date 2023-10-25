import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from 'src/i18n/base-crud/base-crud.controller';

@Controller('admin/roles')
@ApiTags("Admin > Role")
@ApiSecurity('api-key')
export class RolesController extends BaseCrudController<CreateRoleDto, UpdateRoleDto> {
  constructor(public readonly service: RolesService) {
    super(service);
  }
}
