import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        length: 20,
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
}