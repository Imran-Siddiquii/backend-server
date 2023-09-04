import User from '../models/users.js';
// user signup
const userSignUpController = async (req, res) => {
  const data = req.body;
  try {
    const findEmail = await User.findOne({ email: data.email });
    if (!data.email && !data.password) {
      res.status(400).json({ message: 'email and password are required' });
    } else if (findEmail) {
      res.status(400).json({ message: 'already a user, please login' });
    } else {
      const newUser = new User(data);
      const saveUser = await newUser.save();
      res.status(201).json({ success: 'User created successfully' });
    }
  } catch (error) {
    res.status(400).json({ error: 'email and password are required' });
  }
};

// login user
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!email && !password) {
      res.status(400).json({ error: 'email and password are required' });
    } else if (checkUser) {
      if (
        checkUser.email.toLowerCase() === email.toLowerCase() &&
        checkUser.password.toLowerCase() === password.toLowerCase()
      ) {
        res.json({ message: 'User login successfully' });
      } else {
        res.status(400).json({ error: 'password is wrong' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// change password
const changePassword = async (email) => {
  const findUser = await User.findOne({ email });
  return findUser;
};

const changePasswordController = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    if (!email && !oldPassword && !newPassword) {
      res.status(400).json({ error: 'Please fill all the fields' });
    } else {
      const updatePassword = await changePassword(email);
      if (updatePassword) {
        if (
          updatePassword.password.toLowerCase() == oldPassword.toLowerCase()
        ) {
          Object.assign(updatePassword, { password: newPassword });
          const updatedUser = await updatePassword.save();
          res.json({ message: 'Password has changed successfully' });
        } else {
          res.status(400).json({ error: 'Old password in wrong' });
        }
      } else {
        res.status(400).json({ error: 'user not found' });
      }
    }
  } catch (error) {}
};

// updating profile picture

const findUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const updateProfilePictureController = async (req, res) => {
  const { email, profilePictureUrl } = req.body;

  if (email && profilePictureUrl) {
    try {
      const findData = await findUser(email);

      if (findData) {
        const updateProfile = Object.assign(findData, { profilePictureUrl });
        const savedData = await updateProfile.save();
        res.json({ savedData });
      } else {
        res.status(400).json({ message: 'Wrong email id' });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: 'email and profile picture are mandatory' });
    }
  } else {
    res.status(400).json({ error: 'email and profile picture are mandatory' });
  }
};

// update contact details by email id
const updateContactDetails = async (email, body) => {
  const userFound = await User.findOne({ email });
  return userFound;
};

const updateContactDetailsController = async (req, res) => {
  const body = req.body;
  const { email } = req.params;

  try {
    const updatedUser = await updateContactDetails(email, body);
    if (updatedUser) {
      const updateContact = Object.assign(updatedUser, body);
      const saveContact = await updateContact.save();
      res.json(saveContact);
    } else {
      res.status(400).json({ erorr: 'user not found' });
    }
  } catch (error) {
    res.status.jso({ error: 'Bad request' });
  }
};

// find user by phone number
const findUserByPhoneNumberController = async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const findUser = await User.findOne({ phoneNumber });
    if (findUser) {
      res.json(findUser);
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export {
  userSignUpController,
  userLoginController,
  changePasswordController,
  updateProfilePictureController,
  updateContactDetailsController,
  findUserByPhoneNumberController,
};
