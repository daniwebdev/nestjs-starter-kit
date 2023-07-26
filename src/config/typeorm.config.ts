import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
export const defaultTypeOrmConfig: TypeOrmModuleAsyncOptions = {
    useFactory: () => {
        return {
            name: 'default',
            type: "postgres",
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            entities: [
                join(__dirname, '..', '**', '*.entity{.ts,.js}')
            ],
            synchronize: false,
            poolSize: 10,
            poolErrorHandler: (err) => {
                console.log('db pooling error:', err)
            }
        }
    }
}
