import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleToPermission } from 'src/entities/role-to-permission.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MiscService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}


    async getUserPermission(userId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                role: {
                    permissions: {
                        permission: true
                    },
                }
            }
        })

        const permissions = user.role.permissions;
        let buildPermissionCasbin = '';
        permissions.forEach((item: RoleToPermission) => {
            console.log(item.permission);
            let actions = item.permission.actions.map((x: string) => `(${x})`).join('|');
            buildPermissionCasbin += `p, ${user.role.key}, ${item.permission.path}, ${actions}${"\n"}`
        })

        console.log(buildPermissionCasbin.trim());
        return {
            role: user.role.key,
            permissions,
            casbin_permission_adapter: buildPermissionCasbin.trim()
        }

    }
}
