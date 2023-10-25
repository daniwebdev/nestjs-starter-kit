import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IBaseService } from './base-service.interface';


export abstract class BaseCrudController<CreateDTO, UpdateDTO> {
  constructor(public readonly service: IBaseService<CreateDTO, UpdateDTO>) {}

  @Post()
  create(@Body() createRoleDto: CreateDTO) {
    return this.service.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateDTO) {
    return this.service.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
