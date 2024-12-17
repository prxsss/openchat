import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import User from '../models/user.model.js';

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, password, confirmPassword } =
      req.body;

    // Check if passwords do not match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePicture = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    const newUser = new User({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      profilePicture,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signUp controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorret = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorret) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      friends: user.friends,
    });
  } catch (error) {
    console.log('Error in login controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};
