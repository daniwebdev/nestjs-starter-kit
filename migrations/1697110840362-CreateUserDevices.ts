import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserDevices1697110840362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_devices',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'user_id', type: 'integer' },
                { name: 'unique_id', type: 'varchar' },
                { name: 'name', type: 'varchar' },
                { name: 'brand', type: 'varchar' },
                { name: 'os', type: 'varchar' },
                { name: 'platform', type: 'varchar' },
                { name: 'last_login', type: 'json', isNullable: true },
                { name: 'current_login', type: 'json', isNullable: true },
                { name: 'access_token', type: 'varchar', isNullable: true },
                { name: 'refresh_token', type: 'varchar', isNullable: true },
                { name: 'fcm_token', type: 'varchar', isNullable: true },
                { name: 'preference', type: 'json', isNullable: true },
                { name: 'status', type: 'varchar', isNullable: true },
                { name: 'status_reason', type: 'varchar', isNullable: true },
                { name: 'updated_at', type: 'timestamp', default: 'now()' },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
            ],
            uniques: [
                {
                    columnNames: ['user_id', 'unique_id'],
                }
            ],
            indices: [
                {columnNames: ['id']},
                {columnNames: ['user_id']},
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_devices');
    }

}
