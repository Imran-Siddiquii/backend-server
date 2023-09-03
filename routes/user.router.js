const express = require('express');
const {
  userSignUpController,
  userLoginController,
  changePasswordController,
    } = require('../controllers/user.controller');
const userRouter = express.Router();

// routes

userRouter.post('/signup', userSignUpController);
userRouter.post('/login',userLoginController)
userRouter.post('/change-password',changePasswordController)

module.exports = userRouter;
