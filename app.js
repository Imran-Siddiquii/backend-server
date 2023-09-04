// app.js
import initializeDatabase from './db/index.js';
import express, { json } from 'express';
const app = express();
import carRouter from './routes/cars.route.js';
import movieRouter from './routes/movies.route.js';
import userRouter from './routes/user.router.js';

app.use(json());

initializeDatabase();

app.listen(3000, () => {
  console.log('server started');
});

app.use('/cars', carRouter);
app.use('/movies', movieRouter);
app.use('/users', userRouter);
