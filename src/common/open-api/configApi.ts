import { DocumentBuilder } from '@nestjs/swagger';


export const config = new DocumentBuilder() // para documentar en swagger
    .setTitle('Nest Crud exaple')
    .setDescription('Api Rest de NestJS para crud (Para practicas)')
    .setVersion('1.0')
    .setContact('Dev_L', 'http://localhost:3000', 'caluigi7@gmail.com')
    .setLicense('Mysql', 'https://www.apache.org/licenses/LICENSE-2.0.html')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .addTag('Cats', 'Everything about your Cats', { description: 'More', url: 'http://localhost:3000/docs' })
    .addTag('Auth', 'Operations about Auth', { description: 'More', url: 'http://localhost:3000/docs' })
    .build();

