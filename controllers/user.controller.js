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

export {
  userSignUpController,
  userLoginController,
  changePasswordController,
  updateProfilePictureController,
};
