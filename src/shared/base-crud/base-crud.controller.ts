import { Get, Post, Body, Patch, Param, Delete, Injectable } from '@nestjs/common';
import { IBaseService } from './base-service.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/admin/roles/dto/create-role.dto';

export abstract class BaseCrudController<CreateDTO, UpdateDTO> {
  constructor(public readonly service: IBaseService) {}

  @Post()
  create(@Body() createDTO: CreateDTO) {
    return this.service.create(createDTO);
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
  update(@Param('id') id: string, @Body() updateDTO: UpdateDTO) {
    return this.service.update(+id, updateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}


class CreateDTO {

}