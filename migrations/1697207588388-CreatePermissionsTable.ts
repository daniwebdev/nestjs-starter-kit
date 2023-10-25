import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePermissionsTable1697207588388 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "permissions",
            columns: [
                { name: "id", type: "int8", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "name", type: "varchar", isNullable: false },
                { name: "path", type: "varchar", isNullable: true },
                { name: "action", type: "varchar", isNullable: true },
                { name: "created_at", type: "timestamp", isNullable: true },
                { name: "updated_at", type: "timestamp", isNullable: true },
            ],
            indices: [
                { columnNames: ['id'] },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('permissions');
    }

}
