import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/shared/base-crud/base-service.interface';
import { BaseCrudService } from 'src/shared/base-crud/base-crud.service';

@Injectable()
export class RolesService extends BaseCrudService<CreateRoleDto, UpdateRoleDto> {
  constructor(
    @InjectRepository(Role) 
    public roleRepository: Repository<Role>
  ) {
    super(roleRepository)
  }
}
