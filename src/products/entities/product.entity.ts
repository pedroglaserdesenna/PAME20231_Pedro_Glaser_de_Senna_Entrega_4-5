import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity({name:'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    price: number

    @Column()
    amount: number
}
