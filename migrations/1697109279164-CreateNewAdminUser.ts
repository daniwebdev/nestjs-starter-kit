import { hash } from 'bcrypt';
import { getRandomValues } from 'crypto';
import { MigrationInterface, QueryRunner } from "typeorm"
import { v4 } from 'uuid';

export class CreateNewAdminUser1697109279164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminPassword = await hash(process.env.ADMIN_PASSWORD ?? 'secret', 10)
        // queryRunner.query(`
        //     INSERT INTO users (name, email, password)
        //     VALUES ('Admin', 'admin@mail.com', '${adminPassword}')
        //  `)

        await queryRunner.connect();

        const query = queryRunner.manager.createQueryBuilder();
        await query.insert().into('users').values([{
            "code": "ABCDEF",
            "uuid": v4(),
            "username": "admin",
            "name": "Admin",
            "email": "admin@mail.com",
            "password": adminPassword
        }]).execute()

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connect();

        const query = queryRunner.manager.createQueryBuilder();
        await query.delete().from('users').where({email: "admin@mail.com"}).execute()
    }

}
