import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Adoption } from "./Adoption";
import { Pet } from "./Pet";
import { UserType } from "./UserType";

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

    @ManyToOne(type => UserType, type => type.user, {nullable: false, cascade: true})
    userType!: UserType;

    @OneToMany(type => Adoption, adoption => adoption.user)
    adoptions!: Adoption[]

    @OneToMany(type => Pet, pets => pets.user)
    pets!: Pet[]
}
