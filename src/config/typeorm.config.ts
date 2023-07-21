import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    useFactory: () => {
        return {
            name: 'main',
            type: "postgres",
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            entities: [
                join(__dirname, '..', '**', '*.entity{.ts,.js}')
            ],
            // extra: {
            //     idleTimeoutMillis: 4.32e+7,
            //     connectionTimeoutMillis: 240000,
            //     keepAlive: true,
            //     minConnection: 5,
            //     maxConnection: 20,
            //     connectionLimit: 10
            // },
            // entities: [
            //     User, 
            //     Customer, 
            //     Information,
            //     Deposit,
            //     Config,
            //     PairListed
            // ],
            synchronize: false,
            poolSize: 10,
            poolErrorHandler: (err) => {
                console.log('db pooling error:', err)
            }
        }
    }
}
