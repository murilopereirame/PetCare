import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { User } from "./User";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    idType!: number;

    @Column({
        length: 100
    })
    description!: string;

    @OneToMany(user => User, user => user.userType, {nullable: false})
    user!: User[];
}