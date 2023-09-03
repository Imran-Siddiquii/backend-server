const Car = require('../models/car');
const getCarList = async (req, res) => {
  const allCars = await Car.find();
  res.json(allCars);
};

module.exports = getCarList;
