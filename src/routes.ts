import express, { Request, Response, response } from 'express';
import AdoptionController from './controllers/AdoptionController';
import BreedController from './controllers/BreedController';
import PetController from './controllers/PetController';
import PetTypeController from './controllers/PetTypeController';
import UserController from './controllers/UserController';
import UserTypeController from './controllers/UserTypeController';

const routes = express.Router();

const adoptionController = new AdoptionController();
const breedController = new BreedController();
const petTypeController = new PetTypeController();
const userTypeController = new UserTypeController();
const userController = new UserController();
const petController = new PetController();

routes.get('/ping', (request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        ack: Date.now(),
    });
})

routes.post('/adoption', adoptionController.create);
routes.post('/breed', breedController.create);
routes.post('/petType', petTypeController.create);
routes.post('/userType', userTypeController.create);
routes.post('/pet', petController.create);
routes.post('/user', userController.create);

routes.get('/adoption', adoptionController.search);
routes.get('/breed', breedController.search);
routes.get('/petType', petTypeController.search);
routes.get('/userType', userTypeController.search);
routes.get('/pet', petController.search);
routes.get('/pet/avaliable', petController.avaliablePets);
routes.get('/user', userController.search);

routes.patch('/adoption/:id', adoptionController.update);
routes.patch('/breed/:id', breedController.update);
routes.patch('/petType/:id', petTypeController.update);
routes.patch('/userType/:id', userTypeController.update);
routes.patch('/pet/:id', petController.update);
routes.patch('/user/:id', userController.update);

routes.delete('/adoption/:id', adoptionController.delete);
routes.delete('/breed/:id', breedController.delete);
routes.delete('/petType/:id', petTypeController.delete);
routes.delete('/userType/:id', userTypeController.delete);
routes.delete('/pet/:id', petController.delete);
routes.delete('/user/:id', userController.delete);


export default routes;