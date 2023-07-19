import { Column, PrimaryGeneratedColumn } from "typeorm";

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
