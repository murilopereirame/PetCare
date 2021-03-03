import { Request, Response } from "express";
import { Adoption } from "../entity/Adoption";
import Database from "../config/Database";

export default class AdoptionController {
    async index(request: Request, response: Response) {
        let connection = await Database.getInstance().getConnection();
        connection.manager.find(Adoption).then((entity: Adoption[]) => {
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

        connection.manager.find(Adoption, {
            where: conditions,
            relations: ['pet', 'user']      
        }).then((entity: Adoption[]) => {
            response.statusCode = 200;
            return response.json(entity);
        }).catch(err => {
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        })
    }

    async create(request: Request, response: Response) {
        let user = Object.assign(new Adoption(), request.body);
        let connection = await Database.getInstance().getConnection();
        
        connection.manager.save(user).then((entity: any) => {            
            response.statusCode = 201;
            return response.json(entity);
        }).catch(err => {
            console.log(err);
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        }); 
    }

    async update(request: Request, response: Response) {
        let user = Object.assign(new Adoption(), request.body);
        let connection = await Database.getInstance().getConnection();

        connection.manager.update(
            Adoption, 
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
    }

    async delete(request: Request, response: Response) {
        let connection = await Database.getInstance().getConnection();

        connection.manager.delete(Adoption, {
            idAdoption: request.params.id
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