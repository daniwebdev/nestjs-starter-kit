import { DataSource, DataSourceOptions } from "typeorm"
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const typeOrmDataSource = new DataSource({
    name: 'default',
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    migrations: [
        "migrations/*-*.{ts,js}"
    ],
    synchronize: false,
    migrationsTableName: "migrations",
})


export default typeOrmDataSource;