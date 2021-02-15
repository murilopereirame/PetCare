import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from '../entity/Pet';

@Entity()
export class PetImage {
    
    @PrimaryColumn()
    uri!: string;

    @ManyToOne(() => Pet, pet => pet.images, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    pet!: Pet;

}
