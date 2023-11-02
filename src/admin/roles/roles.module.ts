import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RoleToPermission } from 'src/entities/role-to-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleToPermission])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
