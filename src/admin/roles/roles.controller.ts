import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from 'src/shared/base-crud/base-crud.controller';

@Controller('admin/roles')
@ApiTags("Admin > Roles")
@ApiSecurity('api-key')
export class RolesController extends BaseCrudController<CreateRoleDto, UpdateRoleDto> {
  constructor(public readonly service: RolesService) {
    super(service);
  }

  // @Post()
  // create(createDTO: CreateRoleDto) {
  //   return this.create(createDTO);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDTO: UpdateRoleDto) {
  //   return this.service.update(+id, updateDTO);
  // }

  @Patch(':id/assign')
  async assignPermisssion(@Body('ids') permissionIds: string[], @Param('id') id: string) {
    
    await this.service.assignPermission(+id, permissionIds);

    return {
      status: true,
    }
  }

  @Get(':id/permissions')
  async getPermisssion(@Param('id') id: string) {
    
    return await this.service.getPermission(+id);
  }
}
