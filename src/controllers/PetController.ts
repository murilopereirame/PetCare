import { Request, Response } from "express";
import { Pet } from "../entity/Pet";
import Database from "../config/Database";

export const getPets = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();
    let options: any = { relations: ['images', 'user'] };

    if(request.query){
        options.where = request.query;
    }

    connection.manager.find(Pet, options).then((entity: Pet[]) => {
        response.statusCode = 200; 
        return response.json(entity);
    }).catch((err) => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    });
}

export const getPet = async (request: Request, response: Response) => {
    let conditions = request.query;
    let connection = await Database.getInstance().getConnection();

    connection.manager.find(Pet, {
        where: conditions            
    }).then((entity: Pet[]) => {
        response.statusCode = 200;
        return response.json(entity);
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    })
}

export const createPet = async (request: Request, response: Response) => {
    let user = Object.assign(new Pet(), request.body);
    let connection = await Database.getInstance().getConnection();
    
    connection.manager.save(user).then((entity: any) => {            
        response.statusCode = 201;
        return response.json(entity);
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: err});
    }); 
}

export const updatePet = async (request: Request, response: Response) => {
    let user = Object.assign(new Pet(), request.body);
    let connection = await Database.getInstance().getConnection();

    connection.manager.update(
        Pet, 
        request.params.id, 
        user
    ).then((result: any) => {
        response.statusCode = 200;
        return response.json({
            "changedRows": result.raw.changedRows
        });
    }).catch(err => {
        response.statusCode = 500;
        return response.json({auth: false, error: "There was an error on our servers"});
    });
}

export const deletePet = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();

    connection.manager.delete(Pet, {
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
}
