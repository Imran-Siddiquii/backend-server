// app.js

const mongoose = require('mongoose');
const { initializeDatabase } = require('./db/index');
const express = require('express');
const app = express();
const carRouter = require('./routes/cars.route');
const movieRouter = require('./routes/movies.route');
const userRouter = require('./routes/user.router');

app.use(express.json());

initializeDatabase();

app.listen(3000, () => {
  console.log('server started');
});

app.use('/cars', carRouter);
app.use('/movies', movieRouter);
app.use('/users', userRouter);

