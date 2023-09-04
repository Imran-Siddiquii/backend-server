import Car from '../models/car.js';
const getCarList = async (req, res) => {
  const allCars = await Car.find();
  res.json(allCars);
};

export default  getCarList;
