import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true, nullable: false }) // nullable es que no puede ser vacio
    email: string
    
    // nullable es que no puede ser vacio
    // select: false es para que no traiga la password en las peticiones
    @Column({ nullable: false, select: false }) 
    password: string

    // valida que se no se ingrese cualquier cosa en el campo role
    @Column({ type: 'enum', default: Role.USER, enum: Role }) 
    role: Role

    @DeleteDateColumn()
    deletedAt: Date
}
