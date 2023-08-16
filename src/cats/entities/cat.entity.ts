import { User } from '../../users/entities/user.entity';
import { Breed } from '../../breeds/entities/breed.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

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

    @ManyToOne(() => Breed, (breed) => breed.id, { // relacion con la tabla 'breed'
        eager: true // para que se traiga la raza en el findOne
    }) 
    breed: Breed;

    @ManyToOne(() => User) // relacion con usuario para cuando se crea un nuevo gato
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column() // columna para hacer la referencia a la tabla 'user'
    userEmail: string;
}
