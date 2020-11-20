import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Pet } from "./Pet";
import { User } from "./User";

@Entity()
export class Adoption {
    @OneToOne(type => User, {nullable: false, cascade: true})
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