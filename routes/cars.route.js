import { Router } from 'express';
const carRouter = Router();

import getCarList from '../controllers/cars.controller.js';

carRouter.get('/', getCarList);
// carRouter.get

export default carRouter;
