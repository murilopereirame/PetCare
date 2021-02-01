import { Router } from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    likePet
} from '../controllers/UserController';

const router = Router();

router
    .route('/')
    .get(getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
    .post(likePet)

export = router;