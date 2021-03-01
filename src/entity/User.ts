import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Adoption } from "./Adoption";
import { Pet } from "./Pet";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    idUser!: number;

    @Column({
        length: 80,
        nullable: false
    })
    username!: string;

    @Column({
        length: 255,
        nullable: false,
        select: false
    })
    password!:string;

    @Column({
        length: 80
    })
    firstName!: string;

    @Column({
        length: 80
    })
    surName!: string;

    @Column({
        length: 120
    })
    street!: string;

    @Column({
        length: 10
    })
    placeNumber!: string;

    @Column({
        length: 80
    })
    complement!: string;

    @Column({
        length!: 120
    })
    neighborhood!: string

    @Column({
        length: 8,
        type: "char"
    })
    zipCode!: string

    @Column({
        length: 29
    })
    city!: string;

    @Column({
        length: 2,
        type: "char"
    })
    uf!: string;

    @Column({
        type: "char",
        length: 3
    })
    ddd!: string;

    @Column({
        length: 11
    })
    phone!: string

    @OneToMany(type => Adoption, adoption => adoption.user)
    adoptions!: Adoption[]

    @OneToMany(() => Pet, pet => pet.user, {
        cascade: true,
        eager: true
    })
    pets!: Pet[];

    @ManyToMany(() => Pet, {eager: true})
    @JoinTable()
    likedPets!: Pet[];

}
