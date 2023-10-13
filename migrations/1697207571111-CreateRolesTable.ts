import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRolesTable1697207571111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                { name: "id", type: "int8",  isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "name", type: "varchar", isUnique: true, isNullable: false },
                { name: "key", type: "varchar", isUnique: true, isNullable: false },
                { name: "description", type: "varchar", isNullable: true },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
            ],
            indices: [
                { columnNames: ['id'] },
                { columnNames: ['key'] },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('roles')
    }

}
