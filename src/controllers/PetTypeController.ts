import { Request, Response } from "express";
import { PetType } from "../entity/PetType";
import Database from "../utils/Database";

export default class PetTypeController {
    async index(request: Request, response: Response) {
        let connection = await Database.getInstance().getConnection();
        connection.manager.find(PetType).then((entity: PetType[]) => {
            response.statusCode = 200;
            return response.json(entity);
        }).catch((err) => {
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        });
    }

    async search(request: Request, response: Response) {
        let conditions = request.query;
        let connection = await Database.getInstance().getConnection();

        connection.manager.find(PetType, {
            where: conditions            
        }).then((entity: PetType[]) => {
            response.statusCode = 200;
            return response.json(entity);
        }).catch(err => {
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        })
    }

    async create(request: Request, response: Response) {
        let petType = Object.assign(new PetType(), request.body);
        let connection = await Database.getInstance().getConnection();
        
        connection.manager.save(petType).then((entity: any) => {            
            response.statusCode = 201;
            return response.json(entity);
        }).catch(err => {
            console.log(err);
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        }); 
    }

    async update(request: Request, response: Response) {
        let petType = Object.assign(new PetType(), request.body);
        let connection = await Database.getInstance().getConnection();

        connection.manager.update(
            PetType, 
            request.params.id, 
            petType
        ).then((result: any) => {
            response.statusCode = 200;
            return response.json({
                "changedRows":result.raw.changedRows
            });
        }).catch(err => {
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        });
    }

    async delete(request: Request, response: Response) {
        let connection = await Database.getInstance().getConnection();

        connection.manager.delete(PetType, {
            idType: request.params.id
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
}