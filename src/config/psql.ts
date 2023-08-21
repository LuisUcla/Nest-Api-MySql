import {  TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config'; // importacion para usar las variables de entorno

export const psql_dbConnect: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.PSQL_DATABASE_HOST,
    port: +process.env.PSQL_DATABASE_PORT, 
    username: process.env.PSQL_DATABASE_USERNAME,
    password: process.env.PSQL_DATABASE_PASSWORD,
    database: process.env.PSQL_DATABASE,
    autoLoadEntities: true,
    //entities: [],
    synchronize: true,
    ssl: process.env.SSL === 'true', // para prod
    extra: { ssl: process.env.SSL === 'true' ? { rejectUnauthorized: false } : null } // para prod
}