import { Breed } from '../../breeds/entities/breed.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity() // decorador para dar los poderes a la clase
export class Cat { // DB Relacional con MySql Tabla: Cat = Gato
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string; // nombre del gato
  
    @Column()
    age: number; // edad del gato

  
    @Column({ default: true })
    isActive: boolean;

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true // para que se traiga la raza en el findOne
    }) // relacion con la tabla breed
    breed: Breed;
}
