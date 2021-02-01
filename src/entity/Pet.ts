import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from '../entity/User';
import { PetImage } from '../entity/PetImage';

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

    @Column({
        length: 100
    })
    info!: string;

    @ManyToOne(() => User, user => user.pets, {
        nullable: false
    })
    user!: User

}