import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Pet } from "./Pet";
import { User } from "./User";

@Entity()
export class Adoption {
    @PrimaryGeneratedColumn()
    idAdoption!: number;

    @ManyToOne(type => User, user => user.adoptions, {nullable: true, cascade: true})
    @JoinColumn()
    user!: User;

    @OneToOne(type => Pet, {nullable: false, cascade: true})
    @JoinColumn()
    pet!: Pet;

    @Column({
        type: "date"
    })
    date!: Date
}