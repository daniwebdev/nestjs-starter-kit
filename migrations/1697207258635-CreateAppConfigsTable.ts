import { MigrationInterface, QueryRunner, Table, DatabaseType } from "typeorm"

export class CreateAppConfigsTable1697207258635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "app_configs",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "key", type: "varchar" },
                { name: "value", type: "text" },
                { name: "group", type: "varchar", isNullable: true }
            ],
            indices: [
                { columnNames: ['key', 'group'] },
                { columnNames: ['key'] },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("app_configs");
    }

}
