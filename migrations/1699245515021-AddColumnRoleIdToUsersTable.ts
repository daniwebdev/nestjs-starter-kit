import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnRoleIdToUsersTable1699245515021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: "role_id",
            type: "int8",
            default: 1, //admin
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role_id');
    }

}
