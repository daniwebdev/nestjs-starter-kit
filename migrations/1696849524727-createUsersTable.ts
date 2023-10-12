import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1696849524727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {name: "id",type: "int",isPrimary: true,isGenerated: true},
                {name: "uuid",type: "varchar",isUnique: true},
                {name: "name", type: "varchar"},
                {name: "username",type: "varchar",isUnique: true},
                {name: "password",type: "varchar",isUnique: true},
                {name: "email",type: "varchar",isUnique: true},
                {name: "phone",type: "varchar",isUnique: true,isNullable: true},
                {name: "avatar",type: "varchar",isNullable: true},
                {name: "email_verified_at",type: "timestamp",isNullable: true},
                {name: "phone_verified_at",type: "timestamp",isNullable: true},
                {name: "created_at",type: "timestamp",default: "now()"},
                {name: "updated_at",type: "timestamp",default: "now()"}
            ],
            indices: [
                {columnNames: ['id']},
                {columnNames: ['email']},
                {columnNames: ['username']},
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
