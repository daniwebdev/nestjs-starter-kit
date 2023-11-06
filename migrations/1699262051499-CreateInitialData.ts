import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateInitialData1699262051499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        /* Create Permission */
        await queryRunner.connect();

        const query = queryRunner.manager.createQueryBuilder();

        await query.insert().into('roles', ['name', 'key', 'description']).values([
            {
                name: 'Admin',
                key: 'admin',
                description: 'Super User',
            }
        ]).execute()

        await query.insert().into('permissions', ['name', 'path', 'actions']).values([
            {
                name: "User",
                path: "users",
                actions: `["list", "create"]`,
            },
            {
                name: "User {*}",
                path: "users/*",
                actions: `["update", "show", "delete"]`,
            },
            {
                name: "access_control",
                path: "access_control",
                actions: "[]",
            },
            {
                name: "Roles",
                path: "roles",
                actions: `["list", "create"]`,
            },
            {
                name: "Roles {*}",
                path: "roles/*",
                actions: `["update", "show", "delete"]`,
            },
            {
                name: "Permissions",
                path: "permissions",
                actions: `["list", "create"]`,
            },
            {
                name: "Permissions",
                path: "permissions/*",
                actions: `["update", "show", "delete"]`,
            },
        ]).execute()

        /* get admin role ID */
        const adminRole = await query
            .select('role.id')
            .from("roles", 'role')
            .where({ key: 'admin' })
            .getRawOne();

        /* get all permissions ids */
        const permissionIds = await query
            .select('permission.id')
            .from("permissions", 'permission')
            .getRawMany();
        

        /* assign all permissions to admin */
        await query
            .insert()
            .into('role_to_permissions')
            .values(permissionIds.map((permission) => ({ role_id: adminRole.id, permission_id: permission.id })))
            .execute();

        /* update superadmin role */
        await query
            .update('users')
            .set({ role_id: adminRole.id })
            .where({ email: 'admin@mail.com' })
            .execute()
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
