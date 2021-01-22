import { Router } from 'express';

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import auth from './app/middlewares/auth';


const routes = new Router();


routes.post('/users', UserController.store);

routes.post('/login', SessionController.store);

routes.use(auth);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.destroy);
routes.put('/users/:id', UserController.update);



export default routes;