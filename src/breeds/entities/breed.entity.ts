import { Cat } from '../../cats/entities/cat.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity()
export class Breed {
    @Column({ primary: true, generated: true })
    id: number;
    
    @Column({ length: 30, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Cat, (cat) => cat.breed)
    cats: Cat[];
}
