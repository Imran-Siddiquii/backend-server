const express = require('express');
const carRouter = express.Router();

const getCarList = require('../controllers/cars.controller');

carRouter.get('/', getCarList);
// carRouter.get

module.exports = carRouter;
