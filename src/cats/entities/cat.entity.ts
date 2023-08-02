import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity() // decorador para dar los poderes a la clase
export class Cat { // DB Relacional con MySql Tabla: Cat = Gato
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string; // nombre del gato
  
    @Column()
    age: number; // edad del gato

    @Column()
    breed: string // raza del gato
  
    @Column({ default: true })
    isActive: boolean;

    @DeleteDateColumn()
    deletedAt: Date
}
