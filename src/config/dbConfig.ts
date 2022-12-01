import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';


const dotenv_path = path.resolve(process.cwd(),`.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { throw Error("File not found "); }

export const DatabaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT) || 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: true,
    autoLoadEntities: true
    // keepConnectionAlive: true,
    //migrationsRun: (process.env.TYPEORM_MIGRATION === 'true'),
    // entities: entities_pattern,
    //migrations: ["dist/migrations/**/*{.ts,.js}"],
    //logging: 'all',
    //dropSchema: (process.env.TYPEORM_DROP_SCHEMA === 'true'),

}