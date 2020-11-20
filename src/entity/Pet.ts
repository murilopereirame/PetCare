import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Breed } from "./Breed";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    idPet!: number;

    @Column()
    age!: number;

    @Column({
        length: 80
    })
    name!: string;

    @Column({
        length: 160
    })
    description!: string;

    @OneToOne(type => Breed, {nullable: false, cascade: true})
    @JoinColumn()
    breed!: Breed;
}