import { Entity, Index, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity({ name: "role_to_permissions" })
@Index("role_permission_unique", ["role_id", "permission_id"], { unique: true })
export class RoleToPermission {

    @PrimaryColumn({ type: "bigint" })
    role_id: number;

    @PrimaryColumn({ type: "bigint" })
    permission_id: number;

    @ManyToOne(type => Role, role => role.permissions)
    @JoinColumn({ name: "role_id" })
    role: Role;

    @ManyToOne(type => Permission, permission => permission.roles)
    @JoinColumn({ name: "permission_id" })
    permission: Permission;
}
