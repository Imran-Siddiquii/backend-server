import { Router } from 'express';
import {
  userSignUpController,
  userLoginController,
  changePasswordController,
  updateProfilePictureController,
  updateContactDetailsController,
  findUserByPhoneNumberController,
} from '../controllers/user.controller.js';
const userRouter = Router();

// routes

userRouter.post('/signup', userSignUpController);
userRouter.post('/login', userLoginController);
userRouter.post('/change-password', changePasswordController);
userRouter.post('/update-profile-picture', updateProfilePictureController);
userRouter.post('/update-contact/:email', updateContactDetailsController);
userRouter.post('/phone/:phoneNumber',findUserByPhoneNumberController)
export default userRouter;
