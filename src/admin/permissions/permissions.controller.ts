import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseCrudController } from 'src/shared/base-crud/base-crud.controller';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('admin/permissions')
@ApiTags("Admin > Permissions")
@ApiSecurity('api-key')
export class PermissionsController extends BaseCrudController<CreatePermissionDto, UpdatePermissionDto> {

  constructor(public readonly permissionsService: PermissionsService) {
    super(permissionsService);
  }

  // @Post()
  // create(createDTO: CreatePermissionDto) {
  //   return this.create(createDTO);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDTO: UpdatePermissionDto) {
  //   return this.service.update(+id, updateDTO);
  // }
}
