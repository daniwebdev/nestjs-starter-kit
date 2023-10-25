import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseCrudService } from 'src/shared/base-crud/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/shared/base-crud/base-service.interface';

@Injectable()
export class PermissionsService extends BaseCrudService<CreatePermissionDto, UpdatePermissionDto> {
  constructor(
    @InjectRepository(Permission)
    repo: Repository<Permission>
  ) {
    super(repo);
  }
}
