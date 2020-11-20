import express, { Request, Response, response } from 'express';

const routes = express.Router();

routes.get('/ping', (request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        ack: Date.now(),
    });
})

export default routes;