import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Pet } from "./Pet";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    idUser!: number;

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

    @OneToMany(() => Pet, pet => pet.user, {
        cascade: true
    })
    pets!: Pet[];

    @ManyToMany(() => Pet)
    @JoinTable()
    likedPets!: Pet[];

}
