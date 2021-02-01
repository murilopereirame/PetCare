import { Request, Response } from "express";
import { PetShop } from "../entity/PetShop";
import Database from "../config/Database";

export default class PetShopController {
    async index(request: Request, response: Response) {
        let connection = await Database.getInstance().getConnection();
        connection.manager.find(PetShop).then((entity: PetShop[]) => {
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

        connection.manager.find(PetShop, {
            where: conditions            
        }).then((entity: PetShop[]) => {
            response.statusCode = 200;
            return response.json(entity);
        }).catch(err => {
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        })
    }

    async create(request: Request, response: Response) {
        let petshop = Object.assign(new PetShop(), request.body);
        let connection = await Database.getInstance().getConnection();
        
        connection.manager.save(petshop).then((entity: any) => {            
            response.statusCode = 201;
            return response.json(entity);
        }).catch(err => {
            response.statusCode = 500;
            return response.json({auth: false, error: "There was an error on our servers"});
        }); 
    }

    async update(request: Request, response: Response) {
        let petshop = Object.assign(new PetShop(), request.body);
        let connection = await Database.getInstance().getConnection();

        connection.manager.update(
            PetShop, 
            request.params.id, 
            petshop
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

        connection.manager.delete(PetShop, {
            idPetShop: request.params.id
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