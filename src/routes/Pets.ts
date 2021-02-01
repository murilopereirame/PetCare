import { Router } from 'express';
import {
    getPets,
    getPet,
    createPet,
    updatePet,
    deletePet
} from '../controllers/PetController';

const router = Router();


router
    .route('/')
    .get(getPets)
    .post(createPet)

router
    .route('/:id')
    .get(getPet)
    .put(updatePet)
    .delete(deletePet)

export = router;