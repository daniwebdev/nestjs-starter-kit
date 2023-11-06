import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddColumnRoleIdToUsersTable1699245515021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: "role_id",
            type: "int8",
            isNullable: true,
            foreignKeyConstraintName: "fk_users_role_id",
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'SET NULL',
            name: "fk_users_role_id",
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role_id');

        await queryRunner.dropForeignKey('users', 'fk_users_role_id');
    }

}
