import {  TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConnect: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nest-luis',
    password: '12345678',
    database: 'curso-nest',
    autoLoadEntities: true,
    //entities: [],
    synchronize: true
}