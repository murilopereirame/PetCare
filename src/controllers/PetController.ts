import { Request, Response } from "express";
import { Pet } from "../entity/Pet";
import Database from "../config/Database";
import fs from "fs";
import { PetImage } from "../entity/PetImage";

export default class PetController {
  getPets = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();
    let options: any = { relations: ["images", "user", 'breed', 'breed.animalType'] };

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
        relations: ['breed', 'breed.animalType']
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

    for (let img of images) {
      let base64Image = img.split(";base64,").pop();
      let timestamp = +new Date();
      let petName = request.body.name;
      var array = new Uint8Array(1);

      let getRandomValues = require("get-random-values");
      let md5 = require("md5");

      getRandomValues(array);

      let fullString = `${timestamp}&${petName}&${array[0]}`;

      let hash = md5(fullString);
      if (!fs.existsSync("images")) fs.mkdirSync("images");
      fs.writeFile(
        `images/${hash}.jpg`,
        base64Image,
        { encoding: "base64" },
        function (err: any) {
          if (err) console.log(err);
        }
      );

      imagesURI.push({ uri: `${hash}.jpg` });
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
    let connection = await Database.getInstance().getConnection();

    let images = request.body.images;
    delete request.body.images;

    let imagesObj = Array();

    for (let img of images) {
      let base64Image = img.split(";base64,").pop();
      let timestamp = +new Date();
      let petName = request.body.name;
      var array = new Uint8Array(1);

      let getRandomValues = require("get-random-values");
      let md5 = require("md5");

      getRandomValues(array);

      let fullString = `${timestamp}&${petName}&${array[0]}`;

      let hash = md5(fullString);
      if (!fs.existsSync("images")) fs.mkdirSync("images");
      fs.writeFile(
        `images/${hash}.jpg`,
        base64Image,
        { encoding: "base64" },
        function (err: any) {
          if (err) console.log(err);
        }
      );

      imagesObj.push({uri: `${hash}.jpg`, pet: {idPet: Number.parseInt(request.params.id)}});
    }
    
    let pet = Object.assign(new Pet(), request.body);
    
    connection.manager.transaction(async trx => {
      try {
        await trx.delete(PetImage, {
          pet: Number.parseInt(request.params.id)          
        })

        await trx.save(PetImage, imagesObj);

        let result = await trx.update(Pet, request.params.id, pet);
        response.statusCode = 200;
        return response.json({
          changedRows: result.raw.changedRows,
        });
      }catch(err){
        console.log(err);
        response.statusCode = 500;
        return response.json({
          auth: false,
          error: "There was an error on our servers",
        });
      }
    });    
  };

  likes = async (request: Request, response: Response) => {
    let idPet = request.params.id;
    Database.getInstance()
      .getConnection()
      .then((conn) => {
        conn.query(
          `SELECT 
            idUser,
            firstName,
            surName,
            street,
            placeNumber,
            complement,
            neighborhood,
            zipCode,
            city,
            uf,
            ddd,
            phone,
            username 
          FROM 
            user 
          INNER JOIN user_liked_pets_pet AS ULP 
          WHERE 
            ULP.userIdUser = user.idUser 
          AND 
            ULP.petIdPet = ${parseInt(idPet)}`
        ).then(result => {
          return response.status(200).json(result);
        }).catch(err => {
          console.log(err);
          return response.status(500).json({
            auth: "false",
            message: "There is an error on our servers",
            error: err
          })
        })
      });
  };

  avaliablePets = async (request: Request, response: Response) => {
    Database.getInstance()
      .getConnection()
      .then((conn) => {
        conn.query(`
          SELECT * FROM pet
          LEFT OUTER JOIN adoption ON pet.idPet = adoption.petIdPet;
        `).then((result) => {
          return response.status(200).json(result);
        }).catch(err => {
          console.log(err);
          return response.status(500).json({
            auth: "false",
            message: "There is an error on our servers",
            error: err
          })
        })
      });
  };

  deletePet = async (request: Request, response: Response) => {
    let connection = await Database.getInstance().getConnection();

    let images = await connection.manager.find(PetImage, {
      where: { pet: request.params.id },
    });

    for (let img of images) {
      fs.unlinkSync(`images/${img.uri}`);
    }

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
          error: err,
        });
      });
  };
}
