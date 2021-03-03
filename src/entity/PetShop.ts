import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class PetShop {
    @PrimaryGeneratedColumn()
    idPetShop !: number;
    @Column({
        type: 'varchar',
        length: '120',
        nullable: false
    })
    name!: string;
    @Column({
        type: 'varchar',
        length: 150,
        nullable: false
    })
    street!: string;
    @Column({
        type: 'varchar',
        length: 120,
        nullable: false
    })
    streetNumber!: string
    @Column({
        type: 'varchar',
        length: 120,
        nullable: true
    })
    complement!: string
    @Column({
        type: 'varchar',
        length: '80',
        nullable: false
    })
    neighborhood!: string
    @Column({
        type: 'char',
        length: 8,
        nullable: false
    })
    zip!: string;
    @Column({
        type: 'varchar',
        length: 120,
        nullable: false
    })
    city!: string;
    @Column({
        type: 'char',
        length: 2,
        nullable: false
    })
    state!: string;
    @Column({
        type: 'char',
        length: 2,
        nullable: false
    })
    ddd!: string
    @Column({
        type: 'varchar',
        length: 9,
        nullable: false
    })
    phone!: string
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    description!: string
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    imageURI!: string
    @ManyToOne(type => User, user => user.petshops, {nullable: false})
    user!: User;
}