import { Router } from 'express';
import { userSignUpController, userLoginController, changePasswordController } from '../controllers/user.controller.js';
const userRouter = Router();

// routes

userRouter.post('/signup', userSignUpController);
userRouter.post('/login', userLoginController);
userRouter.post('/change-password', changePasswordController);

export default userRouter;
