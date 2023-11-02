import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/shared/base-crud/base-service.interface';
import { BaseCrudService } from 'src/shared/base-crud/base-crud.service';
import { RoleToPermission } from 'src/entities/role-to-permission.entity';

@Injectable()
export class RolesService extends BaseCrudService<CreateRoleDto, UpdateRoleDto> {
  constructor(
    @InjectRepository(Role) 
    public roleRepository: Repository<Role>,

    @InjectRepository(RoleToPermission) 
    public roleToPermission: Repository<RoleToPermission>,
  ) {
    super(roleRepository)
  }


  async assignPermission(roleId: number, permissionIds: string[]) {
    await this.roleToPermission.delete({role_id: roleId});
    console.log(permissionIds);
    await this.roleToPermission.createQueryBuilder().insert().into('role_to_permissions').values(permissionIds.map(id => ({ role_id: roleId, permission_id: id }))).execute();
  }

  async getPermission(roleId: number) {
    return await this.roleToPermission.find({
      where: {
        role_id: roleId
      },
      relations: {
        permission: true,
        role: true
      }
    });
  }
}
