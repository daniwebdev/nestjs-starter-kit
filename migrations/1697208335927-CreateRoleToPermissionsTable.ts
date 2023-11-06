import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRoleToPermissionsTable1697208335927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "role_to_permissions",
            columns: [
                { name: "role_id", type: "int8" },
                { name: "permission_id", type: "int8" },
            ],
            uniques: [
                { columnNames: ['role_id', 'permission_id'] },
            ],
            indices: [
                { columnNames: ['role_id'] },
                { columnNames: ['role_id', 'permission_id'] },
            ],
            foreignKeys: [
                {
                    columnNames: ['role_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'roles',
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['permission_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'permissions',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role_to_permissions');
    }

}
