import express, { Request, Response, response } from 'express';
import AdoptionController from './controllers/AdoptionController';
import BreedController from './controllers/BreedController';
import PetController from './controllers/PetController';
import PetShopController from './controllers/PetShopController';
import PetTypeController from './controllers/PetTypeController';
import UserController from './controllers/UserController';

const routes = express.Router();

const adoptionController = new AdoptionController();
const breedController = new BreedController();
const petTypeController = new PetTypeController();
const userController = new UserController();
const petController = new PetController();
const petShopController = new PetShopController();

routes.get('/ping', (request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        ack: Date.now(),
    });
})

routes.post('/adoption', adoptionController.create);
routes.post('/breed', breedController.create);
routes.post('/petType', petTypeController.create);
routes.post('/pets', petController.createPet);
routes.post('/users', userController.createUser);
routes.post('/login', userController.login);
routes.post('/petshop', petShopController.create);
routes.post('/like/:id', userController.likePet);
routes.post('/unlike/:id', userController.unlikePet);

routes.get('/adoption', adoptionController.search);
routes.get('/breed', breedController.search);
routes.get('/petType', petTypeController.search);
routes.get('/pets', petController.getPets);
routes.get('/pets/:id/likes', petController.likes);
routes.get('/pets/avaliable', petController.avaliablePets);
routes.get('/users', userController.getUsers);
routes.get('/petshop', petShopController.search);
routes.get('/likes/:id', userController.likedPets);

routes.patch('/adoption/:id', adoptionController.update);
routes.patch('/breed/:id', breedController.update);
routes.patch('/petType/:id', petTypeController.update);
routes.patch('/pets/:id', petController.updatePet);
routes.patch('/users/:id', userController.updateUser);
routes.patch('/petshop/:id', petShopController.update);

routes.delete('/adoption/:id', adoptionController.delete);
routes.delete('/breed/:id', breedController.delete);
routes.delete('/petType/:id', petTypeController.delete);
routes.delete('/pets/:id', petController.deletePet);
routes.delete('/users/:id', userController.deleteUser);
routes.delete('/petshop/:id', petShopController.delete);

export default routes;