import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true, nullable: false }) // nullable es que no puede ser vacio
    email: string
    
    @Column({ nullable: false }) // nullable es que no puede ser vacio
    password: string

    @Column({ default: 'user' })
    role: string

    @DeleteDateColumn()
    deletedAt: Date
}
