import {  TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config'; // importacion para usar las variables de entorno

export const mysql_dbConnect: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.MYSQL_DATABASE_HOST,
    port: +process.env.MYSQL_DATABASE_PORT, 
    username: process.env.MYSQL_DATABASE_USERNAME,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadEntities: true,
    //entities: [],
    synchronize: true
}