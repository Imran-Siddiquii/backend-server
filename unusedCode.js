// const createCardata = async () => {
//   try {
//     for (const car of cars) {
//       const carlist = new Car({
//         model: car.model,
//         year: car.year,
//         maker: '64f4b9adfe3b18aa550475e3',
//       });
//       const saveData = await carlist.save();
//       console.log(saveData, 'ajdvbdhvbhsb');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// createCardata();

// const addMaker = async (makerData) => {
//   const addData = new Maker(makerData);
//   const showData = await addData.save();
//   console.log(showData);
// };

// 64f4b9adfe3b18aa550475e3 maker id
//  addMaker({name:"Toyota",log:"andjvd",tagline:"check"})

// async function addCarData() {
//   const newCar = new Car({
//     make: 'land cruiser',
//     model: 'Corolla',
//     year: 2114,
//   });

//   try {
//     const savedCar = await newCar.save();
//     console.log('Car data saved successfully:', savedCar);
//   } catch (error) {
//     console.error('Error saving car data:', error);
//   }
// }

// addCarData();

// async function addAnotherCarData() {
//   const anotherCar = new Car({
//     make: 'Honda',
//     model: 'Civic',
//     year: 2023,
//   });

//   try {
//     const savedAnotherCar = await anotherCar.save();
//     console.log('Another car data saved successfully:', savedAnotherCar);
//   } catch (error) {
//     console.error('Error saving another car data:', error);
//   }
// }

// async function findAllCars() {
//   try {
//     const allCars = await Car.find();
//     console.log('All cars in the database:', allCars);
//   } catch (error) {
//     console.error('Error fetching all cars:', error);
//   }
// }

// findAllCars();
// addAnotherCarData();
