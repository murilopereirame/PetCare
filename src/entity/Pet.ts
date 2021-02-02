import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { Breed } from "./Breed";
import { User } from "./User";
import { PetImage } from './PetImage';

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
    
    @OneToMany(() => PetImage, petImage => petImage.pet, {
        cascade: true
    })
    images!: PetImage[];

    @Column({
        length: 160
    })
    description!: string;

    @ManyToOne(type => Breed, {nullable: false, cascade: true})
    @JoinColumn()
    breed!: Breed;

    @ManyToOne(type => User, user => user.pets, {nullable: false})
    user!: User;
    @Column({
        length: 100
    })
    info!: string;
}