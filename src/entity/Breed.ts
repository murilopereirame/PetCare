import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Pet } from "./Pet";
import { PetType } from "./PetType";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    idBreed!: number;

    @Column({
        length: 100
    })
    name!: string;

    @ManyToOne(type => PetType, type => type.breeds, {nullable: false, cascade: true})
    animalType!: PetType;

    @OneToMany(type => Pet, pet => pet.breed)
    pets!: Pet[]
}