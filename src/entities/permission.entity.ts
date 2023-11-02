import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleToPermission } from "./role-to-permission.entity";

@Entity({ name: "permissions" })
export class Permission {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: true })
    path: string;

    @Column({ type: "json", nullable: true })
    actions: string[];

    @OneToMany(type => RoleToPermission, roleToPermission => roleToPermission.permission)
    roles: RoleToPermission[];
}
