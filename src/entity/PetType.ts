import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { Breed } from "./Breed";

@Entity()
export class PetType {
    @PrimaryGeneratedColumn()
    idType!: number;

    @Column({
        length: 100
    })
    description!: string;

    @OneToMany(type => Breed, breed => breed.animalType, {nullable: false})
    @JoinColumn()
    breeds!: Breed[];
}