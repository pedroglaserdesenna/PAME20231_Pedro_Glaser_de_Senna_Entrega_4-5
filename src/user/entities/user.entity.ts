import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    username: string

    @Column()
    email: string

    @Column()
    hashed_password: string
}
