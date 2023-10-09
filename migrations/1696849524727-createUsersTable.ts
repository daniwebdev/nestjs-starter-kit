import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1696849524727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "uuid",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "phone",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "created_at",
                    type: "datetime",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    default: "now()",
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}