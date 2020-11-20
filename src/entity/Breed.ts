import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
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
}