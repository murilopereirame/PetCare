import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Breed } from "./Breed";
import { User } from "./User";

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

    @ManyToOne(type => Breed, {nullable: false, cascade: true})
    @JoinColumn()
    breed!: Breed;

    @ManyToOne(type => User, user => user.pets, {nullable: false, cascade: true})
    user!: User;
}