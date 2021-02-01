import { Request, Response } from "express";
import { User } from "../entity/User";
import Database from "../config/Database";
import { Pet } from '../entity/Pet';

export const getUsers = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();
    connection.manager.find(User, { relations: ["pets", "likedPets"] }).then((entity: User[]) => {
        response.statusCode = 200;
        return response.json(entity);
    }).catch((err) => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    });
};

export const getUser = async (request: Request, response: Response) => {
    let conditions = request.query;
    let connection = await Database.getInstance().getConnection();

    connection.manager.find(User, {
        relations: ["pets", "likedPets"],
        where: conditions            
    }).then((entity: User[]) => {
        response.statusCode = 200;
        return response.json(entity);
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    })
};

export const createUser = async (request: Request, response: Response) => {
    let user = Object.assign(new User(), request.body);
    let connection = await Database.getInstance().getConnection();
    
    connection.manager.save(user).then((entity: any) => {
        response.statusCode = 201;
        return response.json(entity);
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    });
};

export const updateUser = async (request: Request, response: Response) => {
    let user = Object.assign(new User(), request.body);
    let connection = await Database.getInstance().getConnection();

    connection.manager.update(
        User, 
        request.params.id, 
        user
    ).then((result: any) => {
        response.statusCode = 200;
        return response.json({
            "changedRows":result.raw.changedRows
        });
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    });
};

export const deleteUser = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();

    connection.manager.delete(User, {
        id: request.params.id
    }).then((result: any) => {
        response.statusCode = 200;
        return response.json({
            "affectedRows": result.raw.affectedRows
        });
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    });
};

export const likePet = async (request: Request, response: Response) => {

    let connection = await Database.getInstance().getConnection();
    const pet: any = await connection.manager.findOne(Pet, request.body.id);
    const user = await connection.manager.findOne(User, request.params.id, { relations: ["pets", "likedPets"] });
    const pets = user!.likedPets;
    if(!pets.find(element => element === pet)){
        user!.likedPets = [ ...pets, pet ];
        await connection.manager.save(user);
        return response.status(200).json({
            data: user
        });
    } else {
        return response.status(400).json({
            auth: false,
            message: 'User already liked this pet.'
        });
    }

}