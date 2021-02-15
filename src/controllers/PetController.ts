import { Request, Response } from "express";
import { Pet } from "../entity/Pet";
import Database from "../config/Database";
import fs from 'fs';

export default class PetController {    
  getPets = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();
    let options: any = { relations: ["images", "user"] };

    if (request.query) {
      options.where = request.query;
    }

    connection.manager
      .find(Pet, options)
      .then((entity: Pet[]) => {
        response.statusCode = 200;
        return response.json(entity);
      })
      .catch((err) => {
        response.statusCode = 500;
        return response.json({
          auth: false,
          error: "There was an error on our servers",
        });
      });
  };

  getPet = async (request: Request, response: Response) => {
    let conditions = request.query;
    let connection = await Database.getInstance().getConnection();

    connection.manager
      .find(Pet, {
        where: conditions,
      })
      .then((entity: Pet[]) => {
        response.statusCode = 200;
        return response.json(entity);
      })
      .catch((err) => {
        response.statusCode = 500;
        return response.json({
          auth: false,
          error: "There was an error on our servers",
        });
      });
  };

  createPet = async (request: Request, response: Response) => {    
    let connection = await Database.getInstance().getConnection();
    let images = request.body.images;
    delete request.body.images;

    let imagesURI = [];

    for(let img of images) {
        let base64Image = img.split(';base64,').pop();
        let timestamp = +new Date();
        let petName = request.body.name;
        var array = new Uint32Array(1);       
        
        let getRandomValues = require('get-random-values'); 
        let md5 = require('md5');
        
        getRandomValues(array);        

        let fullString = `${timestamp}&${petName}&${array[0]}`;

        let hash = md5(fullString);
        
        fs.writeFile(`images/${hash}.jpg`, base64Image, {encoding: 'base64'}, function(err: any) {            
            if(err)
                console.log(err);
        });

        imagesURI.push({uri: `images/${hash}.jpg`});
    }

    let user = Object.assign(new Pet(), request.body);
    
    user.images = imagesURI;

    connection.manager
      .save(user)
      .then((entity: any) => {
        response.statusCode = 201;
        return response.json(entity);
      })
      .catch((err) => {
        response.statusCode = 500;
        return response.json({ auth: false, error: err });
      });
  };

  updatePet = async (request: Request, response: Response) => {
    let user = Object.assign(new Pet(), request.body);
    let connection = await Database.getInstance().getConnection();

    connection.manager
      .update(Pet, request.params.id, user)
      .then((result: any) => {
        response.statusCode = 200;
        return response.json({
          changedRows: result.raw.changedRows,
        });
      })
      .catch((err) => {
        response.statusCode = 500;
        return response.json({
          auth: false,
          error: "There was an error on our servers",
        });
      });
  };

  avaliablePets = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();
    let result = connection.query(
      "SELECT * FROM pet LEFT OUTER JOIN adoption ON pet.idPet = adoption.petIdPet;"
    );
    console.log(result);
  }

  deletePet = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();

    connection.manager
      .delete(Pet, {
        idPet: request.params.id,
      })
      .then((result: any) => {
        response.statusCode = 200;
        return response.json({
          affectedRows: result.raw.affectedRows,
        });
      })
      .catch((err) => {
        response.statusCode = 500;
        return response.json({
          auth: false,
          error: "There was an error on our servers",
        });
      });
  };
}
