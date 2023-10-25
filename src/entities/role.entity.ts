import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from "typeorm";
import { RoleToPermission } from "./role-to-permission.entity";

@Entity({ name: "roles" })
@Unique(["name", "key"])
export class Role {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    key: string;

    @Column({ type: "varchar", nullable: true })
    description: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(type => RoleToPermission, roleToPermission => roleToPermission.role)
    permissions: RoleToPermission[];
}
