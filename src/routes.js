import { Router } from 'express';

import UserController from './controllers/UserController'

const routes = new Router();


routes.get('/users', UserController.index);

export default routes;